import { isAuthentication } from "../../auth/getToken";
import React from 'react';
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
const PrivateRouter = (props) => {
  const data = isAuthentication();
  try {
    if (data) {
      if (data.user.role == 0) {
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
