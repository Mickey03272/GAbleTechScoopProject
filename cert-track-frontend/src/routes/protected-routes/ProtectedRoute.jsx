import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../util/authContext'
import { Navigate, Outlet } from 'react-router-dom'
import NotFoundPage from './../error/NotFoundPage'

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRoles, authenticated } = useContext(authContext);
  const authorized = userRoles?.find((role) => allowedRoles.includes(role));
  
  return (
    authenticated 
      ? authorized 
        ? <Outlet /> 
        : <NotFoundPage authenticated={authenticated} isAllowedRole={false}/>
      : <Navigate to="/login" replace={true} />
  )
}

export default ProtectedRoute