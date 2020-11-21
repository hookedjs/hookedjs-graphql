import {scalarType} from '@nexus/schema'

import {assertPasswordStrength} from '../lib'

export const Password = scalarType({
  name: 'Password',
  asNexusMethod: 'password',
  description: 'The Password scalar type asserts password strength and serializes to null',
  parseValue(value) {
    return assertPasswordStrength(value)
  },
  serialize(value) {
    return null
  },
})
