/**
 * Helpers for the field authorize plugin and field resolvers
 *
 * Usage:
 *
 * t.field('postById', {
 *   type: Post,
 *   args: { id: idArg() },
 *   authorize: isOwner(["ADMIN"]),
 *   resolve(root, args, ctx) {
 *     return ctx.post.byId(args.id)
 *   },
 * })
 *
 *  t.string("email", {
 *   resolve: auth.guardIfNotOwner("email", [UserRole.EDITOR]),
 * })
 *
 */
import {UserRole} from '@prisma/client'
import {ForbiddenError} from 'apollo-server-express'
import * as r from 'rambdax'

export interface RequestWithUserContext {
  user: {
    id: string
    roles: string[]
  }
}

export function forbidAll(fieldName: string) {
  return () => {
    throw new ForbiddenError(`Forbidden: Cannot query ${fieldName} field`)
  }
}

export function hasOneOfRoles(allowRoles: string[]) {
  return (_root: any, args: Record<string, any>, ctx: RequestWithUserContext) => {
    return ctx.user.roles.includes(UserRole.ADMIN) || r.intersection(allowRoles, ctx.user.roles).length
  }
}

export function isOwner(allowRoles: string[]) {
  return (root: any, args: Record<string, any>, ctx: RequestWithUserContext) => {
    return ctx.user.id === root.id || ctx.user.roles.includes(UserRole.ADMIN) || r.intersection(allowRoles, ctx.user.roles).length
  }
}

export function limitToRoles(fieldName: string, allowRoles: string[]) {
  return (root: any, args: Record<string, any>, ctx: RequestWithUserContext) => {
    if (!hasOneOfRoles(allowRoles)(root, args, ctx)) {
      throw new ForbiddenError(`Forbidden: Cannot query ${fieldName} field`)
    }
    return root[fieldName]
  }
}

export function limitToOwner(fieldName: string, allowRoles: string[]) {
  return (root: any, args: Record<string, any>, ctx: RequestWithUserContext) => {
    if (!isOwner(allowRoles)(root, args, ctx)) {
      throw new ForbiddenError(`Forbidden: Cannot query ${fieldName} field`)
    }
    return root[fieldName]
  }
}
