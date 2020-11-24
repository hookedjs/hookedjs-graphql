import {gql, useApolloClient} from '@apollo/client'
import React from 'react'
import {useInterval, useLocalStorage} from 'react-use'

import {ContextType} from './types'

export const defaultValue: ContextType['state'] = Object.freeze({
  accessToken: '',
  refreshToken: '',
  userId: '',
  roles: [],
})

export const AuthenticationContext = React.createContext<ContextType>({
  state: defaultValue,
  login: async () => ({graphQLErrors: [{message: 'Not initialized'}] as any}),
  logout: async () => {
  },
  register: async () => ({graphQLErrors: [{message: 'Not initialized'}] as any}),
})

export const AuthenticationProvider: React.FC = ({children}) => {
  const [state = defaultValue, setState] = useLocalStorage<ContextType['state']>('authentication', defaultValue)
  const apolloClient = useApolloClient()

  const login: ContextType['login'] = React.useCallback(
    async (creds) => {
      const res = await apolloClient.query({query: AUTH, variables: creds})
        .then(res => {
          setState(res.data.auth)
          return res
        })
        .catch(e => e)
      return res
    },
    [apolloClient, setState]
  )

  const logout: ContextType['logout'] = React.useCallback(async () => {
    setState(defaultValue)
  }, [setState])

  const register: ContextType['register'] = React.useCallback(
    async (creds) => {
      const res = await apolloClient.mutate({mutation: REGISTER, variables: {data: creds}})
        .then(() => {
          return login({email: creds.email, password: creds.password!})
        })
        .catch(e => e)
      return res
    },
    [apolloClient, login]
  )

  useInterval(() => {
    if (state.refreshToken) {
      apolloClient.query({query: AUTH_REFRESH, variables: {refreshToken: state.refreshToken}})
        .then(res => {
          setState(res.data.authRefresh)
        })
        .catch(e => {
          console.error(e)
          setState(defaultValue)
        })
    }
  }, 60 * 1000)

  const values: ContextType = {state, login, logout, register}

  return <AuthenticationContext.Provider value={values}>{children}</AuthenticationContext.Provider>
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext)
}

const AUTH = gql`
    query Auth($email: String!, $password: String!) {
        auth(email: $email, password: $password) {
            accessToken
            refreshToken
            userId
            roles
        }
    }
`

const AUTH_REFRESH = gql`
    query AuthRefresh($refreshToken: String!) {
        authRefresh(refreshToken: $refreshToken) {
            accessToken
            refreshToken
            userId
            roles
        }
    }
`

const REGISTER = gql`
    mutation Register($data: RegisterInputType!) {
        createOneUser(data: $data) {
            id
        }
    }
`
