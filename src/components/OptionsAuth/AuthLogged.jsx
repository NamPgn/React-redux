import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logout } from '../../redux/slice/userSlice';

const AuthLogged = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success('Logout Success!');
    dispatch(logout());
    navigate('/auth/signin');
  }

  return (
    <div className="acountImageContent position-absolute ">
      <div className="signleAs d-flex justify-content-center">
        <div>  Signed in as <b>
          {token.username}
        </b></div>
      </div>
      <hr />
      <Link to={'/auth/profile'}>
        <div className='d-flex align-items-center hv_'>
          <i className="fa-solid fa-users"></i>
          <div className='auth'>
            Your profile
          </div>
        </div>
      </Link>
      {token.role === 1 ? <Link to={'/admin'}>
        <div className='d-flex align-items-center hv_'>
          <i className="fa-regular fa-user"></i>
          <div className='auth'>
            Admin
          </div>
        </div>
      </Link> : ""}
      <div className='d-flex align-items-center hv_'>
        <i className="fa-solid fa-right-from-bracket"></i>
        <div className='' onClick={() => { handleLogout() }}>Logout</div>
      </div>
    </div>
  )
}

export default AuthLogged
