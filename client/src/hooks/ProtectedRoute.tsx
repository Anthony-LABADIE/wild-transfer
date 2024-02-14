import { Navigate } from 'react-router-dom'

import useAuth from './useAuth'

function ProtectedRoute({ children: children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user?.id) {
    return <Navigate to="/" state="Unauthorized" />
  }

  return children
}

export default ProtectedRoute
