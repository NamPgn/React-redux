import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logout } from '../../redux/slice/userSlice';
import { useAppDispatch } from '../../hook';
import { message } from 'antd';

const AuthLogged = ({ token }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const success = () => {
    message.success('Logout successful')
  };
  const handleLogout = async () => {
    dispatch(logout());
  }
  return (
    <>
      <div className="acountImageContent absolute ">
        <div className="signleAs d-flex justify-content-center">
          <div>  Signed in as <b>
            {token.user.username}
          </b></div>
        </div>
        <hr />
        <Link to={'/auth/profile'}>
          <div className='d-flex items-center hv_ text-center'>
            <i className="fa-solid fa-users"></i>
            <div className='auth'>
              Your profile
            </div>
          </div>
        </Link>
        {token.user ? token.user.role === 1 ? <Link to={'/admin'}>
          <div className='d-flex items-center hv_ text-center'>
            <i className="fa-regular fa-user"></i>
            <div className='auth'>
              Admin
            </div>
          </div>
        </Link> : "" : ''}
        <div className='d-flex items-center hv_ text-center'>
          <i className="fa-solid fa-right-from-bracket"></i>
          <div className='' onClick={() => { handleLogout() }}>Logout</div>
        </div>
      </div>
    </>
  )
}

export default AuthLogged
