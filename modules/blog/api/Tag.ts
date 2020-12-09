import {ObjectModule, prismaHelpers, rules} from '@h/api-core/src/graphql/lib'
import {extendType, objectType} from '@nexus/schema'

const Tag: ObjectModule = {
  ObjectType: objectType({
    name: 'Tag',
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
      prismaHelpers.includeMutations(t)
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