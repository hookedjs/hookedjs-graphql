import {OutputDefinitionBlock} from '@nexus/schema/dist/definitions/definitionBlocks'
import {ObjectDefinitionBlock} from '@nexus/schema/dist/definitions/objectType'

export default {
  includeFields,
  includeQueries,
  includeMutations,
}

function includeFields (t: ObjectDefinitionBlock<any>, excludes: string[] = [])  {
  for (const key of Object.keys(t.model).filter(isIncluded(excludes))) {
    if (key.endsWith('J'))
      (t.model as any)[key]({filtering: true, ordering: true, pagination: true})
    else
      (t.model as any)[key]()
  }
}
function includeQueries (t: OutputDefinitionBlock<any>, excludes: string[] = []) {
  for (const key of Object.keys(t.crud).filter(isIncluded(excludes)).filter(isQuery)) {
    if (key.endsWith('s'))
      (t.crud as any)[key]({filtering: true, ordering: true, pagination: true})
    else
      (t.crud as any)[key]()
  }
}
function includeMutations (t: OutputDefinitionBlock<any>, excludes: string[] = []) {
  for (const key of Object.keys(t.crud).filter(isIncluded(excludes)).filter(isMutation)) {
    (t.crud as any)[key]()
  }
}

function isIncluded (excludes: string[]) {
  return (key: string) => !excludes.includes(key)
}
function isMutation (key: string) {
  if (key.startsWith('create') || key.startsWith('update') || key.startsWith('delete')) return true
}
function isQuery (key: string) {
  return !isMutation(key)
}
