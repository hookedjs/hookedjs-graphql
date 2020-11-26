import {extendType, inputObjectType, objectType} from '@nexus/schema'
import {UserRole} from '@prisma/client'
import {ValidationError} from 'apollo-server-express'

import {crypto, prisma} from '../lib'

export const User = objectType({
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
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user()
    t.crud.users({filtering: true, ordering: true, pagination: true})
  },
})

export const Mutations = extendType({
  type: 'Mutation',
  definition(t) {
    // t.crud.createOneUser()
    t.field('createOneUser', {
      type: 'User',
      args: {data: CreateOneUserType.asArg({required: true})},
      resolve: async (_root, args, ctx) => {
        const passwordHash = await crypto.hash(args.data.password!)
        const user = await prisma.user.create({
          data: {
            ...args.data,
            ...ctx.user.id && {
              createdBy: {connect: {id: ctx.user.id}},
              updatedBy: {connect: {id: ctx.user.id}}
            },
            roles: ['AUTHOR'],
            password: passwordHash,
          },
        }).catch((e: Error) => {
          if (e.message.includes('Unique constraint failed on the fields'))
            throw new ValidationError('Email is already registered')
          throw e
        })
        ctx.req.user = { id: user.id, roles: user.roles }
        return user
      },
    })
    t.crud.updateOneUser({
      computedInputs: {
        updatedBy: ({ctx}) => ({connect: {id: ctx.user.id}}),
      },
    })
    t.crud.deleteOneUser()
  },
})

export const CreateOneUserType = inputObjectType({
  name: 'RegisterInputType',
  definition(t) {
    t.string('name', {required: true})
    t.email('email', {required: true})
    t.password('password', {required: true})
  },
})
