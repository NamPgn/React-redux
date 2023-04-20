import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Divstyled = styled.div``;
const AuthUnLogger = () => {
  return (
    <Divstyled className="authUnLoggerToggle acountImageContent position-absolute ">
      <Divstyled className="signleAs d-flex justify-content-center">
        <Divstyled> <i className="fa-regular fa-face-laugh"></i> <b>
        </b></Divstyled>
      </Divstyled>
      <hr />
      <Link to={'/auth/signin'}>
        <Divstyled className='d-flex align-items-center hv_'>
          <i className="fa-regular fa-user"></i>
          <Divstyled className='auth'>
            Signin
          </Divstyled>
        </Divstyled>
      </Link>
    </Divstyled>
  )
}

export default AuthUnLogger
