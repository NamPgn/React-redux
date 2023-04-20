import React from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../../redux/slice/userSlice';

const Logout = () => {
  return <Navigate to={"/"} />
}

export default Logout

