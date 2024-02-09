import { useContext } from 'react'

import { UserContext } from '../context/UserContext'
import { IUserContext } from '../interfaces/interfaces'

function useAuth() {
  const context = useContext(UserContext)
  return { ...context } as IUserContext
}

export default useAuth
