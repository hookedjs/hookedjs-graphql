export * from '../../lib'
export {default as prismaHelpers} from './prismaHelpers'
export * as rules from './rules'
import { RuleSet } from './rules'

export interface ObjectModule {
  ObjectType: any;
  Queries: any;
  Mutations: any;
  Rules: RuleSet;
  // [ObjectName: string]: any;
}