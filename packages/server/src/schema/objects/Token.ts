import {extendType, objectType, stringArg} from '@nexus/schema'

import { crypto, prisma } from '../lib'

export const Token = objectType({
  name: 'Token',
  definition(t) {
    t.string('accessToken')
    t.string('userId')
    t.list.string('roles')
  },
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.field('token', {
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
          throw new Error('Username or Password is invalid')
        }
        return {
          // Return token + user info, so that clients dont need to decode it
          accessToken: crypto.tokenize({id: user.id, roles: user.roles}),
          userId: user.id,
          roles: user.roles,
        }
      },
    })
  },
})
