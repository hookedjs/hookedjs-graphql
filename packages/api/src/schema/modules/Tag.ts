import {extendType, objectType} from '@nexus/schema'

import {rules} from '../lib'

const Tag: ObjectModule = {
  Tag: objectType({
    name: 'Tag',
    definition(t) {
      t.model.id()
      t.model.value()
    },
  }),
  Queries: extendType({
    type: 'Query',
    definition(t) {
      t.crud.tag()
      t.crud.tags({filtering: true, ordering: true, pagination: true})
    },
  }),
  Mutations: extendType({
    type: 'Mutation',
    definition(t) {
      t.crud.createOneTag()
      t.crud.updateOneTag()
      t.crud.deleteOneTag()
    },
  }),
  Rules: {
    Query: {
      tags: rules.isAuthenticated,
    },
    Mutation: {
      createOneTag: rules.isAuthenticated,
    },
    Tag: rules.isAuthenticated,
  },
}
export default Tag