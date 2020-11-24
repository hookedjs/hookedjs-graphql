import {extendType, objectType} from '@nexus/schema'

export const ApiAccess = objectType({
  name: 'ApiAccess',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.ip()
    t.model.reqUserId()
    t.model.reqUser()
    t.model.userAgent()
    t.model.operationName()
    t.model.region()
    t.model.city()
    t.model.duration()
  },
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.apiAccess()
    t.crud.apiAccesses({filtering: true, ordering: true, pagination: true})
  },
})

export const Mutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneApiAccess()
    // t.crud.updateOneApiAccess()
  },
})
