import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { isAuthentication } from '../auth/getToken';
import { loginForm } from '../redux/slice/userSlice';
const Signin = () => {
  const { register, handleSubmit } = useForm();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const onsubmit = (data) => {
    if (dispath(loginForm(data))) {
      navigate('/')
    } else {
      alert("Đăng nhập lại đi")
    }
  }

  return (
    <div>
      <form className='container formContainer' onSubmit={handleSubmit(onsubmit)} >
        <div>
          <div className="inputGroup">
            <input type="text" className="input" {...register('email')} required="" placeholder='Email' autocomplete="off" />
          </div>
          <div className="inputGroup">
            <input type="password" className="input" {...register('password')} placeholder='Pass' required="" autocomplete="off" />
          </div>
          <button className="btn btn-primary">Submit</button>
          <Link to={'/auth/signup'} style={{ margin: "0px 10px" }} >Đăng kí </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin