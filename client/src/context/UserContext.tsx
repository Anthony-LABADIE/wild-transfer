import { useLazyQuery } from '@apollo/client'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CHECKTOKEN, LOGIN } from '../graphql/queries/User.queries'
import {
  IUserContext,
  IUserWithoutPassword,
  LoginInfos,
} from '../interfaces/interfaces'

export const UserContext = createContext<IUserContext | null>(null)

type TUserContextProviderProps = {
  children?: React.ReactNode
}

type AuthState = {
  user: IUserWithoutPassword | null
  token: string
}

type AuthAction =
  | { type: 'LOG_IN'; user: IUserWithoutPassword; token: string }
  | { type: 'LOG_OUT' }

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
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
      return prevState
  }
}

function UserContextProvider({ children }: TUserContextProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [login] = useLazyQuery(LOGIN)
  const [checkToken] = useLazyQuery(CHECKTOKEN)
  const navigate = useNavigate()

  const getUserData = (): AuthState => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    return {
      user: user ? JSON.parse(user) : null,
      token: token || '',
    }
  }

  const [authState, dispatch] = useReducer(
    authReducer,
    { user: null, token: '' },
    getUserData,
  )

  const authContext: IUserContext = {
    user: authState.user,
    token: authState.token,
    sidebarOpen,
    setSidebarOpen,
    signIn: async ({ email, password }: LoginInfos): Promise<void> => {
      await login({
        variables: { userLoginInfos: { email, password } },
        onError(error) {
          alert(error.message)
        },
        onCompleted(data) {
          if (data.Login?.message) {
            alert(data.Login?.message)
          } else {
            const { token, ...user } = data.Login
            dispatch({ type: 'LOG_IN', user, token })
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/home')
          }
        },
      })
    },
    signOut: async () => {
      dispatch({ type: 'LOG_OUT' })
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
    },
  }

  useEffect(() => {
    checkToken({
      variables: { token: getUserData().token },
      onCompleted(data) {
        if (data.CheckToken?.message) {
          alert(data.CheckToken?.message)
          authContext.signOut()
        } else {
          const { token, ...user } = data.CheckToken
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
        }
      },
    })
  }, [])
  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
