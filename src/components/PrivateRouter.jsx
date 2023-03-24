import { isAuthentication } from "../auth/getToken";
import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
const PrivateRouter = (props) => {
  const data = isAuthentication();
  try {
    const token = jwtDecode(data.token)
    if (data) {
      if (token.role == 0) {
        return <Navigate to={'/'} />
      } else {
        return props.children
      }
    } else {
      return <Navigate to={'/'} />
    }
  } catch (error) {
    return <div className='text-light container text-center' ><Link to={"/auth/signin"}>Đăng nhập</Link></div>
  }

}

export default PrivateRouter
