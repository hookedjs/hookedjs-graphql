import { PostStatus } from '@prisma/client'
import {allow, and, deny, not,or, rule, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return !!ctx.user.id
  },
)

function isAdminCtx(ctx: any) {
  return ctx.user.roles.includes('admin')
}

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return isAdminCtx(ctx)
  },
)

const isEditor = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.roles.includes('editor') || isAdminCtx(ctx)
  },
)

const isSelf = rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    return parent.id === ctx.user.id || isAdminCtx(ctx)
  },
)

const isPostPublishedOrOwner = rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    return parent.status === PostStatus.PUBLISHED || parent.authorId === ctx.user.id || isAdminCtx(ctx)
  },
)

const permissions = shield(
  {
    Query: {
      auth: allow,
      authRefresh: allow,
      users: isAuthenticated,
      tags: isAuthenticated,
      posts: isAuthenticated,
    },
    Mutation: {
      createOneClientEvent: allow,
      createOneUser: allow,
      createOnePost: isAuthenticated,
      createOneTag: isAuthenticated,
    },
    User: {
      id: isAuthenticated,
      name: isAuthenticated,
      email: isSelf,
      postsAuthored: isAuthenticated,
    },
    Post: {
      id: isPostPublishedOrOwner,
      title: isPostPublishedOrOwner,
      tags: isPostPublishedOrOwner,
      status: isPostPublishedOrOwner,
      author: isPostPublishedOrOwner,
      authorId: isPostPublishedOrOwner,
    },
    Tag: isAuthenticated,
  }, {
    fallbackError: 'Forbidden',
    fallbackRule: isAdmin,
    allowExternalErrors: true,
  }
)

export default permissions