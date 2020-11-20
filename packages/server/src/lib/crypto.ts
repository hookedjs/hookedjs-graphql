import crypto from 'crypto'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'

const salt = '551ae75784b425427b561e4acfebd82b' //crypto.randomBytes(16).toString("hex")
const secret = 'shhhhhhared-secret'

export async function hash(str: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(str, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(derivedKey.toString('hex'))
    })
  })
}

export async function verify(str: string, hashToCheck: string): Promise<boolean> {
  const hashExpected = await hash(str)
  return hashToCheck === hashExpected
}

export function tokenize(obj: Record<string, any>) {
  return jwt.sign(obj, secret, { expiresIn: '1d' })
}

export function safeStringCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return crypto.timingSafeEqual(bufA, bufB)
}

export const jwtMiddleware = expressJwt({
  secret,
  // requestProperty: "auth",
  algorithms: ['HS256'],
  credentialsRequired: false,
  // getToken: (req) => req.cookies.auth,
})

