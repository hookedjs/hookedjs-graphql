import {
  // connectionPlugin,
  fieldAuthorizePlugin,
  makeSchema,
  nullabilityGuardPlugin,
  queryComplexityPlugin,
} from '@nexus/schema'
import {nexusPrisma} from 'nexus-plugin-prisma'
import * as path from 'path'

import * as Mutation from './Mutation'
import * as Objects from './objects'
import * as Query from './Query'
import * as Scalars from './scalars'

// const DEBUGGING_CURSOR = false
// let fn = DEBUGGING_CURSOR ? (i: string) => i : undefined

export default makeSchema({
  types: [Query, Mutation, Scalars, Objects],
  outputs: {
    // typegen: path.join(__dirname, '../typegen.gen.ts'),
    typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts'),
    schema: path.join(__dirname, '../../schema.graphql'),
  },
  plugins: [
    nexusPrisma({experimentalCRUD: true}),
    // connectionPlugin({
    //   encodeCursor: fn,
    //   decodeCursor: fn,
    // }),
    queryComplexityPlugin(),
    fieldAuthorizePlugin(),
    nullabilityGuardPlugin({
      shouldGuard: true,
      fallbackValues: {
        Int: () => -1,
        DateTime: () => new Date(0),
        Boolean: () => false,
        String: () => '',
        Email: () => '',
        Password: () => '',
        Empty: () => null,
        Json: () => '',
      },
    }),
  ],
  // prettierConfig: require.resolve('../../../.prettierrc'),
  // features: {
  //   abstractTypeStrategies: {
  //     __typename: true,
  //     resolveType: true,
  //   },
  // },
})
