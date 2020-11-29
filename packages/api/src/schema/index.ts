import {
  // connectionPlugin,
  // fieldAuthorizePlugin,
  makeSchema,
  nullabilityGuardPlugin,
  queryComplexityPlugin,
} from '@nexus/schema'
import { applyMiddleware } from 'graphql-middleware'
import {nexusPrisma} from 'nexus-plugin-prisma'
import * as path from 'path'

import {rules} from './lib'
import * as Modules from './modules'
import {ApiAccess, ApiError, ClientEvent, Post, Tag, Token, User} from './modules'
import * as Mutation from './Mutation'
import * as Query from './Query'
import * as Scalars from './scalars'

// const DEBUGGING_CURSOR = false
// let fn = DEBUGGING_CURSOR ? (i: string) => i : undefined

const schema = makeSchema({
  types: [Query, Mutation, Scalars, Modules],
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
  // features: {
  //   abstractTypeStrategies: {
  //     __typename: true,
  //     resolveType: true,
  //   },
  // },
})

const schemaWithShield = applyMiddleware(schema, rules.shield(
  rules.mergeRuleSets(
    ApiAccess.Rules,
    ApiError.Rules,
    ClientEvent.Rules,
    Post.Rules,
    Tag.Rules,
    Token.Rules,
    User.Rules,
  ),
  {
    fallbackError: 'Forbidden',
    fallbackRule: rules.isAdmin,
    allowExternalErrors: true,
  }
))

export default schemaWithShield

