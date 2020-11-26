import {shield } from 'graphql-shield'

import {ApiAccess, ApiError, ClientEvent, Post, Tag,Token, User} from '../objects'
import {isAdmin, RuleSet} from './rules'

const rules = mergeRules(
  ApiAccess.Rules,
  ApiError.Rules,
  ClientEvent.Rules,
  Post.Rules,
  Tag.Rules,
  Token.Rules,
  User.Rules
)

const permissions = shield(rules, {
  fallbackError: 'Forbidden',
  fallbackRule: isAdmin,
  allowExternalErrors: true,
}
)

export default permissions


function mergeRules(...rules: RuleSet[]): RuleSet {
  return rules.reduce(
    (a,r) => ({
      ...a,
      ...r,
      Query: {...a.Query, ...r.Query},
      Mutation: {...a.Mutation, ...r.Mutation },
    }),
    {Query:{}, Mutation: {}})
}