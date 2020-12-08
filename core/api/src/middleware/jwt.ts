import {NextFunction, Request, Response} from 'express'

import {untokenize} from '../lib/crypto'

export function jwt (req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('Authorization')
  let authCtx = {id: '', roles: []}
  if (authorization) {
    try {
      authCtx = untokenize(authorization.slice(7)) as any
    } catch (_) {}
  }
  req.user = authCtx
  next()
}
export default jwt