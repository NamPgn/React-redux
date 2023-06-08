import React from 'react'
import { Navigate } from 'react-router-dom';
import { logout } from '../../redux/slice/userSlice';

const Logout = () => {
  return <Navigate to={"/"} />
}

export default Logout

