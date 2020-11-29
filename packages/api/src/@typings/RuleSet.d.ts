interface RuleSet {
  Query: Record<string, any>,
  Mutation: Record<string, any>,
  [ObjectName: string]: any,
}