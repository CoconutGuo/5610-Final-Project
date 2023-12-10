import React from 'react'
import { useUserContext } from '@/store/useUser'
import { Navigate, Outlet } from 'react-router-dom'

function RequireAuthRole({ children, role }) {
  const { userInfo } = useUserContext()

  if (userInfo?.role !== role) {
    return <Navigate to="/" replace />
  }

  return children || <Outlet />
}

export default RequireAuthRole
