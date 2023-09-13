import React from 'react'
import { Link } from 'react-router-dom'
import { AccountStyle } from './styles'
import { LoginOutlined, SmileOutlined } from '@ant-design/icons'

const AuthUnLogger = () => {
  return (
    <AccountStyle className="authUnLoggerToggle acountImageContent absolute z-9">
      <div className="signleAs d-flex justify-center">
        <div style={{ textAlign: 'center' }}>
          <SmileOutlined /> </div>
      </div>
      <hr />
      <Link to={'/auth/signin'}>
        <div className='d-flex items-center hv_ justify-center text-center'>
          <LoginOutlined />
          <div className='auth'>
            Signin
          </div>
        </div>
      </Link>
    </AccountStyle>
  )
}

export default AuthUnLogger
