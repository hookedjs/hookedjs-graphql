import {scalarType} from '@nexus/schema'
import {ValidationError} from 'apollo-server-express'

import {assertPasswordStrength} from '../lib'

export const Password = scalarType({
  name: 'Password',
  asNexusMethod: 'password',
  description: 'The Password scalar type asserts password strength and serializes to null',
  parseValue(value) {
    return assertPasswordStrength(value, ValidationError)
  },
  serialize(value) {
    return null
  },
})
