// declare module 'ObjectModule' {
//   // export default function(userAgent: string): boolean;
//   // export function compareSync(key: string, hash: string): boolean;
//   // export function hashSync(key: string, count: number): string;
// }

// declare module 'ObjectModule' {
//   // Queries: any;
//   export default {
//     Queries: any,
//     Mutaitons: any,
//   }
// }

interface ObjectModule {
  Queries: any;
  Mutations: any;
  Rules: RuleSet;
  [ObjectName: string]: any;
}
