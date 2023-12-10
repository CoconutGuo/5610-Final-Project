import React from 'react'
import { useUserContext } from '@/store/useUser'
import { Navigate, Outlet } from 'react-router-dom'

function RequireAuth({ children }) {
  const { userInfo } = useUserContext()

  if (!userInfo) {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}

export default RequireAuth
