import {extendType, inputObjectType, objectType, stringArg} from '@nexus/schema'
import {AuthenticationError, ForbiddenError} from 'apollo-server-express'

import {crypto, ObjectModule, prisma, rules} from '../../lib'

const AuthInputType = inputObjectType({
  name: 'AuthInputType',
  definition(t) {
    t.string('email', {required: true})
    t.string('password', {required: true})
  },
})

const AuthRefreshInputType = inputObjectType({
  name: 'AuthRefreshInputType',
  definition(t) {
    t.string('refreshToken', {required: true})
  },
})

const Token: ObjectModule = {
  ObjectType: objectType({
    name: 'Token',
    definition(t) {
      t.string('accessToken')
      t.string('refreshToken')
      t.string('userId')
      t.list.string('roles')
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      t.field('auth', {
        type: 'Token',
        args: {data: AuthInputType.asArg({required: true})},
        resolve: async (_root, args, ctx) => {
          const user = await prisma.user.findOne({where: {email: args.data.email}})
          if (!(
            // Check crypto regardless if user d.n.e or doesn't have a password,
            // to avoid timing attacks
            await crypto.verify(args.data.password, user?.password ?? '')
            && user
          )) {
            throw new AuthenticationError('Username or Password is invalid')
          }
          ctx.req.user = {id: user.id, roles: user.roles}
          return {
            // Return token + user info, so that clients dont need to decode it
            accessToken: crypto.tokenize({id: user.id, roles: user.roles}),
            refreshToken: crypto.tokenize({id: user.id}, '30d'),
            userId: user.id,
            roles: user.roles,
          }
        },
      })
      t.field('authRefresh', {
        type: 'Token',
        args: {data: AuthRefreshInputType.asArg({required: true})},
        resolve: async (_root, args, ctx) => {
          let userId: string
          try {
            userId = crypto.untokenize(args.data.refreshToken).id
          } catch (e) {
            throw new AuthenticationError('refreshToken is invalid')
          }
          const user = await prisma.user.findOne({where: {id: userId}})
          ctx.req.user = {id: user?.id, roles: user?.roles ?? []}
          if (!user?.roles.length) {
            throw new ForbiddenError('refreshToken is declined')
          }
          return {
            // Return token + user info, so that clients dont need to decode it
            accessToken: crypto.tokenize({id: user.id, roles: user.roles}, '15m'),
            refreshToken: crypto.tokenize({type: 'refresh', id: user.id}, '30d'),
            userId: user.id,
            roles: user.roles,
          }
        },
      })
    },
  }),
  Mutations: extendType({
    type: 'Mutation',
    definition(t) {},
  }),
  Rules: {
    Query: {
      auth: rules.allow,
      authRefresh: rules.allow,
    },
    Mutation: {},
    Token: rules.allow,
  },
}
export default Token