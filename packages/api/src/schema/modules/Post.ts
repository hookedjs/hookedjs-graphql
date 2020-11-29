import {extendType, objectType} from '@nexus/schema'
import {PostStatus} from '@prisma/client'

import {rules} from '../lib'

const isPostPublishedOrOwner = rules.rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    return parent.status === PostStatus.PUBLISHED || parent.authorId === ctx.user.id || ctx.user.roles.includes('admin')
  },
)

const Post: ObjectModule = {
  Post: objectType({
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
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      t.crud.post()
      t.crud.posts({filtering: true, ordering: true, pagination: true})
    },
  }),
  Mutations: extendType({
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
  }),
  Rules: {
    Query: {
      posts: rules.isAuthenticated,
    },
    Mutation: {
      createOnePost: rules.isAuthenticated,
    },
    Post: {
      id: isPostPublishedOrOwner,
      title: isPostPublishedOrOwner,
      tags: isPostPublishedOrOwner,
      status: isPostPublishedOrOwner,
      author: isPostPublishedOrOwner,
      authorId: isPostPublishedOrOwner,
    }
  }
}
export default Post