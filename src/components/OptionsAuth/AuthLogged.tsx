import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slice/userSlice';
import { useAppDispatch } from '../../hook';
import { AccountStyle } from './styles';
import { LikeOutlined, LogoutOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const AuthLogged = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  }
  const handleCheckCart = () => {
    if (!user) {
      Error('Bạn cần đăng nhập!')
    } else {
      navigate('/cart/user');
    }
  }
  return (
    <>
      <AccountStyle className="acountImageContent absolute z-10">
        <div className="signleAs d-flex justify-content-center">
          <div>Signed in as <b>
            {user ? user.username : ''}
          </b></div>
        </div>
        <hr />
        <Link to={'/auth/profile'}>
          <div className='d-flex items-center hv_ text-center'>
            <UsergroupAddOutlined />
            <div className='auth'>
              Your profile
            </div>
          </div>
        </Link>
        <div className='d-flex items-center hv_ text-center'>
          <LikeOutlined />
          <div onClick={handleCheckCart} className='auth'>
            Saved
          </div>
        </div>
        {user ? user.role >= 1 ? <Link to={'/dashboard'}>
          <div className='d-flex items-center hv_ text-center'>
            <UserOutlined />
            <div className='auth'>
              Admin
            </div>
          </div>
        </Link> : "" : ''}
        <div className='d-flex items-center hv_ text-center'>
          <LogoutOutlined />
          <div className='' onClick={() => { handleLogout() }}>Logout</div>
        </div>
      </AccountStyle>
    </>
  )
}

export default AuthLogged
