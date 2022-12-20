import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthentication } from '../auth/getToken';
import { loginForm } from '../slice/userSlice';
const Signin = () => {
  const { register, handleSubmit } = useForm();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const onsubmit = (data) => {
    console.log("dtaafrom", data)
    if (dispath(loginForm(data))) {
      navigate('/')
    }else{
      alert("Đăng nhập lại đi")
    }
  }

  return (
    <div>
      <form className='container' onSubmit={handleSubmit(onsubmit)}>
        <div class="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" {...register('email')} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" {...register('password')} name='password' id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signin