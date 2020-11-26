import {extendType, objectType} from '@nexus/schema'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.createdAt()
    t.model.createdBy()
    t.model.createdById()
    t.model.updatedAt()
    t.model.updatedBy()
    t.model.updatedById()
    t.model.id()

    t.model.title()
    t.model.tags()
    t.model.status()
    t.model.author()
    t.model.authorId()
  },
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.post()
    t.crud.posts({filtering: true, ordering: true, pagination: true})
  },
})

export const Mutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePost({
      computedInputs: {
        createdBy: ({ctx}) => ({connect: {id: ctx.user.id}}),
        updatedBy: ({ctx}) => ({connect: {id: ctx.user.id}}),
        author: ({ctx}) => ({connect: {id: ctx.user.id}}),
      },
    })
    t.crud.updateOnePost({
      computedInputs: {
        updatedBy: ({ctx}) => ({connect: {id: ctx.user.id}}),
      },
    })
    t.crud.deleteOnePost()
  },
})
