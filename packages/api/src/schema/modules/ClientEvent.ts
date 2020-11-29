import {extendType, objectType} from '@nexus/schema'

import {rules} from '../lib'

const ClientEvent: ObjectModule = {
  ClientEvent: objectType({
    name: 'ClientEvent',
    definition(t) {
      t.model.id()
      t.model.createdAt()
      t.model.ip()
      t.model.reqUserId()
      t.model.reqUser()
      t.model.userAgent()
      t.model.name()
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      t.crud.clientEvent()
      t.crud.clientEvents({filtering: true, ordering: true, pagination: true})
    },
  }),
  Mutations: extendType({
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
  }),
  Rules: {
    Query: {},
    Mutation: {
      createOneClientEvent: rules.allow,
    },
    ClientEvent: rules.isAdmin,
  }
}
export default ClientEvent