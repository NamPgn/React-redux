import React from 'react'
import { AccountStyle } from './styles'
import { LoginOutlined, SmileOutlined } from '@ant-design/icons'
import MVLink from '../Location/Link'

const AuthUnLogger = () => {
  return (
    <AccountStyle className="authUnLoggerToggle acountImageContent absolute z-9">
      <div className="signleAs d-flex justify-center">
        <div style={{ textAlign: 'center' }}>
          <SmileOutlined /> </div>
      </div>
      <hr />
      <MVLink to={'/auth/signin'}>
        <div className='d-flex items-center hv_ justify-center text-center'>
          <LoginOutlined />
          <div className='auth'>
            Signin
          </div>
        </div>
      </MVLink>
    </AccountStyle>
  )
}

export default AuthUnLogger
