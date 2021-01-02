import {extendType, objectType} from '@nexus/schema'

import {crypto, difference, isEmail, isPassword, ObjectModule, prismaHelpers, rules} from '@h/api-core/src/graphql/lib'

const isSelf = rules.rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    return parent.id === ctx.user.id || ctx.user.roles.includes('admin')
  },
)

const shieldMutateInput = rules.rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    const allowArgs = ['email', 'password', 'name']
    if (difference(Object.keys(args.data), allowArgs).length && !rules.isAdminCtx(ctx)) {
      return 'You lack permission to set one of the fields you specified.'
    }

    const validationErrors = []
    if ('email' in args.data && !isEmail(args.data.email)) validationErrors.push('Email is invalid')
    if ('password' in args.data && !isPassword(args.data.password) && !rules.isAdminCtx(ctx)) validationErrors.push('Password is invalid')
    if (validationErrors.length) return validationErrors.join('; ')

    if ('password' in args.data) args.data.password = await crypto.hash(args.data.password)

    return true
  },
)

const User: ObjectModule = {
  ObjectType: objectType({
    name: 'User',
    definition(t) {
      prismaHelpers.includeFields(t)
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      prismaHelpers.includeQueries(t)
    },
  }),
  Mutations: extendType({
    type: 'Mutation',
    definition(t) {
      prismaHelpers.includeMutations(t, ['createOneUser', 'updateOneUser'])
      t.crud.createOneUser({
        computedInputs: {
          createdBy: ({ctx}) => ctx.user.id ? ({connect: {id: ctx.user.id}}): ({}),
          updatedBy: ({ctx}) => ctx.user.id ? ({connect: {id: ctx.user.id}}): ({}),
        },
      })
      t.crud.updateOneUser({
        computedInputs: {
          updatedBy: ({ctx}) => ({connect: {id: ctx.user.id}}),
        },
      })
    },
  }),
  Rules: {
    Query: {
      user: rules.isAuthenticated,
      users: rules.isAuthenticated,
    },
    Mutation: {
      createOneUser: shieldMutateInput,
      updateOneUser: rules.and(isSelf, shieldMutateInput),
    },
    User: {
      id: rules.allow,
      createdAt: isSelf,
      updatedAt: isSelf,
      name: rules.isAuthenticated,
      email: isSelf,
      postsAuthoredJ: rules.isAuthenticated,
    }
  }
}
export default User