import React, { useContext, useEffect } from 'react'
import {
  IUserContext,
  IUserWithoutPassword,
  LoginInfos,
  LoginResponse,
} from '../interfaces/interfaces'
import * as SecureStore from 'expo-secure-store'
import { useLazyQuery } from '@apollo/client'
import { CHECKTOKEN, LOGIN } from '../Graphql/queries/User.queries'
import { Alert } from 'react-native'
import { Text } from 'react-native-svg'

const UserContext = React.createContext<IUserContext | null>({
  async signIn(data: any) {},
  async signOut() {},
  user: null,
  token: '',
})

type AuthState = {
  user: IUserWithoutPassword | null
  token: string
}

type AuthAction =
  | { type: 'LOG_IN'; user: IUserWithoutPassword; token: string }
  | { type: 'LOG_OUT' }

function InitialContextProvider({
  children,
  userData,
}: Readonly<{
  children: React.ReactNode
  userData: LoginResponse | { user: {}; token: '' }
}>) {
  const [login] = useLazyQuery(LOGIN, { fetchPolicy: 'no-cache' })

  const [authState, dispatch] = React.useReducer(
    (prevState: AuthState, action: AuthAction): AuthState => {
      switch (action.type) {
        case 'LOG_IN':
          return {
            ...prevState,
            user: action.user,
            token: action.token,
          }
        case 'LOG_OUT':
          return {
            ...prevState,
            user: null,
            token: '',
          }
        default:
          return { ...(userData as AuthState) }
      }
    },
    {} as AuthState,
    () => {
      return userData as AuthState
    },
  )

  const authContext = {
    user: authState?.user,
    token: authState?.token,
    signIn: async ({ email, password }: LoginInfos) => {
      try {
        await login({
          variables: { userLoginInfos: { email, password } },
          async onCompleted(data) {
            const { token, ...user } = data.Login
            dispatch({ type: 'LOG_IN', user, token })
            if (!data.Login.message) {
              await SecureStore.setItemAsync('token', token)
              await SecureStore.setItemAsync('user', JSON.stringify(user))
            }
            if (data.Login.message) {
              Alert.alert(data.Login.message)
            }
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    signOut: async () => {
      dispatch({ type: 'LOG_OUT' })
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('user')
    },
  }

  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  )
}

export function UserContextProvider({
  children,
  value,
}: Readonly<{
  children: React.ReactNode
  value?: IUserContext
}>) {
  const [checkToken, { data, loading }] = useLazyQuery(CHECKTOKEN, {
    fetchPolicy: 'no-cache',
  })

  const getUserData = async () => {
    const user = await SecureStore.getItemAsync('user')
    const token = await SecureStore.getItemAsync('token')
    checkToken({
      variables: { token },
      async onCompleted(data) {
        if (data.CheckToken?.message) {
          Alert.alert(data.CheckToken?.message)
          value?.signOut()
        } else {
          const { token, ...user } = data?.CheckToken
          await SecureStore.setItemAsync('token', token)
          await SecureStore.setItemAsync('user', JSON.stringify(user))
        }
      },
    })
  }

  useEffect(() => {
    getUserData()
  }, [])
  if (loading) return <Text>Loading...</Text>
  return (
    <InitialContextProvider userData={data?.CheckToken}>
      {children}
    </InitialContextProvider>
  )
}

export const useAuth = () => {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error('useAuth must be used within a UserContextProvider')
  }
  return context
}

export default UserContextProvider
