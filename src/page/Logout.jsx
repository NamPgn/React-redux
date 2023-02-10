import React from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../slice/userSlice';

const Logout = () => {
  // const dispath=useDispatch();
  // dispath(logout());
  
  return <Navigate to={"/"} />
}

export default Logout

