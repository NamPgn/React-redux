import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logout } from '../../redux/slice/userSlice';
import styled from 'styled-components';

const Divstyled = styled.div``;
const AuthLogged = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success('Logout Success!');
    dispatch(logout());
    navigate('/auth/signin');
  }

  return (
    <Divstyled className="acountImageContent position-absolute ">
      <Divstyled className="signleAs d-flex justify-content-center">
        <Divstyled>  Signed in as <b>
          {token.username}
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
      {token.role === 1 ? <Link to={'/admin'}>
        <Divstyled className='d-flex align-items-center hv_'>
          <i className="fa-regular fa-user"></i>
          <Divstyled className='auth'>
            Admin
          </Divstyled>
        </Divstyled>
      </Link> : ""}
      <Divstyled className='d-flex align-items-center hv_'>
        <i className="fa-solid fa-right-from-bracket"></i>
        <Divstyled className='' onClick={() => { handleLogout() }}>Logout</Divstyled>
      </Divstyled>
    </Divstyled>
  )
}

export default AuthLogged
