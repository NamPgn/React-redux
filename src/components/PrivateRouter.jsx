import { isAuthentication } from "../auth/getToken";
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
const PrivateRouter = (props) => {
  // console.log("prop",props.children)
  const data = isAuthentication();
  if (data) {
    if (data.data.user.role == 0) {
      return <Navigate to={'/'} />
    } else {
      return props.children
    }
  } else {
    return <Navigate to={'/'} />
  }
}

export default PrivateRouter
