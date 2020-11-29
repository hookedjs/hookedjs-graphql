import {extendType, objectType} from '@nexus/schema'

import {rules} from '../lib'

const ApiAccess: ObjectModule = {
  ApiAccess: objectType({
    name: 'ApiAccess',
    definition(t) {
      t.model.id()
      t.model.createdAt()
      t.model.ip()
      t.model.reqUserId()
      t.model.reqUser()
      t.model.operationName()
      t.model.duration()
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      t.crud.apiAccess()
      t.crud.apiAccesses({filtering: true, ordering: true, pagination: true})
    },
  }),
  Mutations: extendType({
    type: 'Mutation',
    definition(t) {
      // t.crud.createOneApiAccess()
      // t.crud.updateOneApiAccess()
    },
  }),
  Rules: {
    Query: {},
    Mutation: {},
    ApiAccess: rules.isAdmin,
  }
}
export default ApiAccess