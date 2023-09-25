import { isAuthentication } from "../../auth/getToken";
import React from 'react';
import { Navigate } from 'react-router-dom';
import MVLink from "../Location/Link";
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
    return <div className='text-light container text-center' ><MVLink to={"/auth/signin"}>Đăng nhập</MVLink></div>
  }
}

export default PrivateRouter
