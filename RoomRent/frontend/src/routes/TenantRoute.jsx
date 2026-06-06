import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const TenantRoute = ({children}) => {
    const user = useSelector(state => state.user.user);
    if (!user) {
        return <div>Loading </div>
    }
    if (user.role !== 'tenant') {
        return <Navigate to='/' />
    }
  return children
}

export default TenantRoute