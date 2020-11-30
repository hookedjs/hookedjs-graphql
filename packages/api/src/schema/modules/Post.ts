import {extendType, objectType} from '@nexus/schema'
import {PostStatus} from '@prisma/client'

import {rules} from '../lib'
import prismaHelpers from '../lib/prismaHelpers'

const isPostPublishedOrOwner = rules.rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    return parent.status === PostStatus.PUBLISHED || parent.authorId === ctx.user.id || ctx.user.roles.includes('admin')
  },
)

const Post: ObjectModule = {
  ObjectType: objectType({
    name: 'Post',
    definition(t) {
      prismaHelpers.includeFields(t)
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      prismaHelpers.includeQueries(t)
    },
  }),
  Mutations: extendType({
    type: 'Mutation',
    definition(t) {
      prismaHelpers.includeMutations(t, ['createOnePost', 'updateOnePost'])
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