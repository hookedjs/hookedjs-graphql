import {ApiAccessCreateInput, ApiErrorCreateInput } from '@prisma/client'
import { NextFunction,Request, Response } from 'express'
import {GraphQLError} from 'graphql'

import {geo, prisma} from '../lib'

function gqlLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()
  const oldWrite = res.write,
    oldEnd = res.end
    // oldSend = res.send

  const chunks: any[] = []

  res.write = function (chunk: any) {
    chunks.push(chunk)
    // eslint-disable-next-line prefer-rest-params
    return oldWrite.apply(res, arguments as any)
  }

  // res.send = function(body: any) {
  //   oldSend(body)
  // }

  res.end = function (chunk: any) {
    if (chunk)
      chunks.push(chunk)

    logRequest(req, res, chunks, start)

    // eslint-disable-next-line prefer-rest-params
    oldEnd.apply(res, arguments as any)
  }

  next()
}

export default gqlLogger

// Doesn't have to be async but make it async to ensure it doesn't slow/block the response
async function logRequest(req: Request, res: Response, chunks: any, start: number) {
  const operationName = req.body?.operationName || req.body?.query?.match(/(query|mutation) (.*) {/)?.[2]

  if (operationName) {
    let reqBody = req.body
    if (reqBody?.variables?.password)
      reqBody = {...reqBody, variables: {...reqBody.variables, password: 'redacted'}}

    let resBody: any = chunks
    try {
      resBody = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch (_) {
    }

    const ip = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip || '') as string

    const location = geo.fromIp(ip)

    const baseMessage: Pick<ApiAccessCreateInput, 'ip' | 'userAgent' | 'operationName'> = {
      ip,
      ...(req.user?.id && {reqUser: {connect: {id: req.user?.id}}}),
      userAgent: req.headers['user-agent'] || '',
      operationName,
    }

    const duration = Date.now() - start

    const accessMessage: ApiAccessCreateInput = {
      ...baseMessage,
      region: location?.region,
      city: location?.city,
      country: location?.country,
      eu: location?.eu === '1',
      lat: location?.ll[0],
      lon: location?.ll[1],
      duration,
    }
    console.dir(accessMessage)
    prisma.apiAccess.create({data: accessMessage}).catch(e => {
      console.error('Prisma access capture error!')
      console.dir(e)
      console.dir(accessMessage)
      throw e
    })

    if (res.statusCode >= 400) {
      resBody?.errors.forEach((e: GraphQLError) => {
        const errorMessage: ApiErrorCreateInput = {
          ...baseMessage,
          reqBody,
          message: e.message,
          stack: e.extensions,
          resBody,
        }
        console.error(errorMessage)
        prisma.apiError.create({data: errorMessage}).catch(e => {
          console.error('Prisma error capture error!')
          console.dir(e)
          console.dir(errorMessage)
          throw e
        })
      })
    }
  }
}