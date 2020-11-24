import {extendType, objectType} from '@nexus/schema'

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
    t.crud.apiError()
    t.crud.apiErrors({filtering: true, ordering: true, pagination: true})
  },
})

export const ClientEventMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneApiError({
      computedInputs: {
        createdBy: ({ctx}) => ({
          connect: {id: ctx.user.id},
        }),
      },
    })
    // t.crud.updateOneApiError()
  },
})
