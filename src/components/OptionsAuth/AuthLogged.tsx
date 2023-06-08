import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logout } from '../../redux/slice/userSlice';
import styled from 'styled-components';
import { useAppDispatch } from '../../hook';
import { message } from 'antd';

const Divstyled = styled.div``;
const AuthLogged = ({ token, logout }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const success = () => {
    message.success('Logout successful')
  };
  const handleLogout = async () => {
    if (token) {
      try {
        await logout();
        navigate('/auth/signin');
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(logout());
    }
    success();
    return;
  }
  return (
    <>
      <Divstyled className="acountImageContent position-absolute ">
        <Divstyled className="signleAs d-flex justify-content-center">
          <Divstyled>  Signed in as <b>
            {token.displayName || token.user.username}
          </b></Divstyled>
        </Divstyled>
        <hr />
        <Link to={'/auth/profile'}>
          <Divstyled className='d-flex align-items-center hv_'>
            <i className="fa-solid fa-users"></i>
            <Divstyled className='auth'>
              Your profile
            </Divstyled>
          </Divstyled>
        </Link>
        {token.user ? token.user.role === 1 ? <Link to={'/admin'}>
          <Divstyled className='d-flex align-items-center hv_'>
            <i className="fa-regular fa-user"></i>
            <Divstyled className='auth'>
              Admin
            </Divstyled>
          </Divstyled>
        </Link> : "" : ''}
        <Divstyled className='d-flex align-items-center hv_'>
          <i className="fa-solid fa-right-from-bracket"></i>
          <Divstyled className='' onClick={() => { handleLogout() }}>Logout</Divstyled>
        </Divstyled>
      </Divstyled>
    </>
  )
}

export default AuthLogged
