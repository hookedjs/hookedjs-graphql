import {extendType, objectType} from '@nexus/schema'

import {ObjectModule, prismaHelpers, rules} from '@h/api-core/src/graphql/lib'

const ClientEvent: ObjectModule = {
  ObjectType: objectType({
    name: 'ClientEvent',
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
      prismaHelpers.includeMutations(t, ['createOneClientEvent'])
      t.crud.createOneClientEvent({
        computedInputs: {
          createdBy: ({ctx}) => ({
            connect: {id: ctx.user.id},
          }),
        },
      })
    },
  }),
  Rules: {
    Query: {},
    Mutation: {
      createOneClientEvent: rules.allow,
    },
    ClientEvent: rules.isAdmin,
  }
}
export default ClientEvent