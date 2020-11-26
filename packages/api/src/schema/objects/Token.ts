import {extendType, objectType, stringArg} from '@nexus/schema'
import {AuthenticationError, ForbiddenError} from 'apollo-server-express'
import {allow} from 'graphql-shield'

import {crypto, prisma, RuleSet} from '../lib'

export const Token = objectType({
  name: 'Token',
  definition(t) {
    t.string('accessToken')
    t.string('refreshToken')
    t.string('userId')
    t.list.string('roles')
  },
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.field('auth', {
      type: 'Token',
      args: {
        email: stringArg({required: true}),
        password: stringArg({required: true}),
      },
      resolve: async (_root, args, ctx) => {
        const user = await prisma.user.findOne({where: {email: args.email}})
        if (!(
          // Check crypto regardless if user d.n.e or doesn't have a password,
          // to avoid timing attacks
          await crypto.verify(args.password, user?.password ?? '')
          && user
        )) {
          throw new AuthenticationError('Username or Password is invalid')
        }
        ctx.req.user = { id: user.id, roles: user.roles }
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
      args: {
        refreshToken: stringArg({required: true}),
      },
      resolve: async (_root, args, ctx) => {
        let userId: string
        try {
          userId = crypto.untokenize(args.refreshToken).id
        } catch (e) {
          throw new AuthenticationError('refreshToken is invalid')
        }
        const user = await prisma.user.findOne({where: {id: userId}})
        ctx.req.user = { id: user?.id, roles: user?.roles ?? [] }
        if (!user?.roles.length) {
          throw new ForbiddenError('refreshToken is declined')
        }
        return {
          // Return token + user info, so that clients dont need to decode it
          accessToken: crypto.tokenize({id: user.id, roles: user.roles}, '15m'),
          refreshToken: crypto.tokenize({type:'refresh', id: user.id}, '30d'),
          userId: user.id,
          roles: user.roles,
        }
      },
    })
  },
})

export const Rules: RuleSet = {
  Query: {
    auth: allow,
    authRefresh: allow,
  },
  Mutation: {},
  Token: allow,
}