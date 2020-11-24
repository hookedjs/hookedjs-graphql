import {extendType, objectType} from '@nexus/schema'

export const ApiError = objectType({
  name: 'ApiError',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.ip()
    t.model.reqUserId()
    t.model.reqUser()
    t.model.userAgent()
    t.model.operationName()
    t.model.message()
    t.model.stack()
    t.model.reqBody()
    t.model.resBody()
  },
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.apiError()
    t.crud.apiErrors({filtering: true, ordering: true, pagination: true})
  },
})

export const Mutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneApiError()
    // t.crud.updateOneApiError()
  },
})
