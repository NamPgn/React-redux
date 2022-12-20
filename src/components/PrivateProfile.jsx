import React from 'react'
import { isAuthentication } from '../auth/getToken'
import { Navigate } from 'react-router-dom';
const PrivateProfile = () => {
  const { data } = isAuthentication();
  if (data) {
    return <Navigate to={'/profile'} />
  } else {
    return <Navigate to={'/'} />
  }
}

export default PrivateProfile