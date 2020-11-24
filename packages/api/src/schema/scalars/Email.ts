import {scalarType} from '@nexus/schema'
import {ValidationError} from 'apollo-server-express'

import {assertEmail} from '../lib'

export const Email = scalarType({
  name: 'Email',
  asNexusMethod: 'email',
  description: 'The Email scalar type asserts email validity',
  parseValue(value) {
    return assertEmail(value, ValidationError)
  },
  serialize(value) {
    return value
  },
  // parseLiteral(value) {
  //   return assertEmail(value)
  // }
})
