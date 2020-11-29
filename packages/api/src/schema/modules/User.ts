import {extendType, objectType} from '@nexus/schema'

import {crypto, difference, isEmail, isPassword, rules} from '../lib'

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
  User: objectType({
    name: 'User',
    definition(t) {
      t.model.id()
      t.model.createdAt()
      t.model.createdBy()
      t.model.createdById()
      t.model.updatedAt()
      t.model.updatedBy()
      t.model.updatedById()
      t.model.password()

      t.model.name()
      t.model.email()
      t.model.roles()

      t.model.usersCreated({filtering: true, ordering: true, pagination: true})
      t.model.postsAuthored({filtering: true, ordering: true, pagination: true})
      t.model.postsCreated({filtering: true, ordering: true, pagination: true})
      t.model.postsUpdated({filtering: true, ordering: true, pagination: true})
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      t.crud.user()
      t.crud.users({filtering: true, ordering: true, pagination: true})
    },
  }),
  Mutations: extendType({
    type: 'Mutation',
    definition(t) {
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
      t.crud.deleteOneUser()
    },
  }),
  Rules: {
    Query: {
      users: rules.isAuthenticated,
    },
    Mutation: {
      createOneUser: shieldMutateInput,
      updateOneUser: rules.and(isSelf, shieldMutateInput),
    },
    User: {
      id: rules.allow,
      name: rules.isAuthenticated,
      email: isSelf,
      postsAuthored: rules.isAuthenticated,
    }
  }
}
export default User