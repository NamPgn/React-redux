import React from 'react'
import { Link } from 'react-router-dom'

const AuthUnLogger = () => {
  return (
    <div className="authUnLoggerToggle acountImageContent absolute ">
      <div className="signleAs d-flex justify-center">
        <div> <i className="fa-regular fa-face-laugh"></i> <b>
        </b></div>
      </div>
      <hr />
      <Link to={'/auth/signin'}>
        <div className='d-flex items-center hv_ text-center'>
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
