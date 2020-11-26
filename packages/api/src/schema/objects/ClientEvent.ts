import {extendType, objectType} from '@nexus/schema'
import {allow} from 'graphql-shield'

import {isAdmin, RuleSet} from '../lib'

export const ClientEvent = objectType({
  name: 'ClientEvent',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.ip()
    t.model.reqUserById()
    t.model.reqUser()
    t.model.userAgent()
    t.model.name()
  },
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clientEvent()
    t.crud.clientEvents({filtering: true, ordering: true, pagination: true})
  },
})

export const ClientEventMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClientEvent({
      computedInputs: {
        createdBy: ({ctx}) => ({
          connect: {id: ctx.user.id},
        }),
      },
    })
    // t.crud.updateOneApiError()
  },
})

export const Rules: RuleSet = {
  Query: {},
  Mutation: {
    createOneClientEvent: allow,
  },
  ClientEvent: isAdmin,
}