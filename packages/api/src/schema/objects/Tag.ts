import {extendType, objectType} from '@nexus/schema'

import {isAuthenticated, RuleSet} from '../lib'

export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.model.id()
    t.model.value()
  },
})

export const Queries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.tag()
    t.crud.tags({filtering: true, ordering: true, pagination: true})
  },
})

export const Mutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTag()
    t.crud.updateOneTag()
    t.crud.deleteOneTag()
  },
})

export const Rules: RuleSet = {
  Query: {
    tags: isAuthenticated,
  },
  Mutation: {
    createOneTag: isAuthenticated,
  },
  Tag: isAuthenticated,
}