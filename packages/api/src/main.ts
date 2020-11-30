import compression from 'compression'
import express from 'express'
import path from 'path'
import sirv from 'sirv'

import apolloServer from './graphql/apolloServer'
import {gqlLogger, jwt} from './middleware'

const {PORT = 4000, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'

const app = express()
app.use(jwt)
app.use(compression())
app.use(gqlLogger)

apolloServer.applyMiddleware({app})

app.use(sirv(
  path.join(__dirname, '../react/build'),
  {
    dev, etag: true, maxAge: 10 * 60 * 1000,
    immutable: true, single: true,
  }),
)

const server = app.listen({port: PORT}, () => console.log(`🚀 Server ready at http://localhost:${PORT}`))


// server
//   .on("error", (e) => {
//     // @ts-ignore: ts doesn't know of code attribute
//     if (e.code === "EADDRINUSE")
//       console.log("Address in use :-(")
//     else
//       console.log("Unknown express error!")
//     server.close()
//   })
//   .on("close", () => console.log("Http server closed."))

// function handleExit(signal: string) {
//   if (dev) return
//   console.log(`Received exit signal ${signal}`);
//   server.close()
//   // Force exit if express doesn't close in a reasonable amount of time.
//   setTimeout(() => process.exit(1), 60000);
// }
// if (!dev) {
//   process.on('exit', handleExit);
//   process.on('SIGINT', handleExit);
//   process.on('SIGTERM', handleExit);
// }