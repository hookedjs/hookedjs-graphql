import {
  makeSchema, mutationType,
  nullabilityGuardPlugin,
  queryComplexityPlugin, queryType,
} from '@nexus/schema'
import { applyMiddleware } from 'graphql-middleware'
import {nexusPrisma} from 'nexus-plugin-prisma'
import * as path from 'path'

import {rules} from './lib'
import * as Modules from './modules'

const Query = queryType({definition(t) {}})
const Mutation = mutationType({definition(t) {}})

const schema = makeSchema({
  types: [Query, Mutation, Modules],
  outputs: {
    typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts'),
    schema: path.join(__dirname, '../../schema.graphql'),
  },
  plugins: [
    nexusPrisma({experimentalCRUD: true}),
    queryComplexityPlugin(),
    nullabilityGuardPlugin({
      shouldGuard: true,
      fallbackValues: {
        Int: () => -1,
        DateTime: () => new Date(0),
        Boolean: () => false,
        String: () => '',
        Json: () => '',
      },
    }),
  ],
  // features: {
  //   abstractTypeStrategies: {
  //     __typename: true,
  //     resolveType: true,
  //   },
  // },
})

const schemaWithShield = applyMiddleware(schema, rules.shield(
  rules.mergeRuleSets(...Object.values(Modules).map(m => m.Rules)),
  {
    fallbackError: 'Forbidden',
    fallbackRule: rules.isAdmin,
    allowExternalErrors: true,
  }
))

export default schemaWithShield

