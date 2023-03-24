import React from 'react'
import { Link } from 'react-router-dom'

const AuthUnLogger = () => {
  return (
    <div className="authUnLoggerToggle acountImageContent position-absolute ">
      <div className="signleAs d-flex justify-content-center">
        <div> <i className="fa-regular fa-face-laugh"></i> <b>
        </b></div>
      </div>
      <hr />
      <Link to={'/auth/signin'}>
        <div className='d-flex align-items-center hv_'>
          <i className="fa-regular fa-user"></i>
          <div className='auth'>
            Signin
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AuthUnLogger
