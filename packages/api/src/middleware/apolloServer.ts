import {ApolloServer} from 'apollo-server-express'
import {separateOperations} from 'graphql'
import {fieldExtensionsEstimator, getComplexity, simpleEstimator} from 'graphql-query-complexity'

import {prisma} from '../lib'
import schema from '../schema'

const apolloServer = new ApolloServer({
  schema,
  context: ctx => {
    const user = ctx.req.user ?? {id: '', roles: []}
    return {...ctx, prisma, user}
  },
  plugins: [
    {
      requestDidStart: () => ({
        didResolveOperation({request, document}) {
          const complexity = getComplexity({
            schema,
            // To calculate query complexity properly,
            // we have to check if the document contains multiple operations
            // and eventually extract it operation from the whole query document.
            query: request.operationName ? separateOperations(document)[request.operationName] : document,
            // The variables for our GraphQL query
            variables: request.variables,
            // Add any number of estimators. The estimators are invoked in order, the first
            // numeric value that is being returned by an estimator is used as the field complexity.
            // If no estimator returns a value, an exception is raised.
            estimators: [
              fieldExtensionsEstimator(),
              // Add more estimators here...
              // This will assign each field a complexity of 1
              // if no other estimator returned a value.
              simpleEstimator({defaultComplexity: 1}),
            ],
          })
          // Here we can react to the calculated complexity,
          // like compare it with max and throw error when the threshold is reached.
          if (complexity >= 100) {
            throw new Error(`Sorry, too complicated query! ${complexity} is over 100 that is the max allowed complexity.`)
          }
          // And here we can e.g. subtract the complexity point from hourly API calls limit.
          // console.log('Used query complexity points:', complexity)
        },
      }),
    },
  ],
})
export default apolloServer