import {extendType, objectType} from '@nexus/schema'

import {ObjectModule, prismaHelpers, rules} from '@h/api-core/src/graphql/lib'

const ApiError: ObjectModule = {
  ObjectType: objectType({
    name: 'ApiError',
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
    Query: {},
    Mutation: {},
    ApiError: rules.isAdmin,
  },
}
export default ApiError