import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginForm } from '../../redux/slice/userSlice';
import { toast } from 'react-toastify';
import { userErr$ } from '../../redux/selectors/user';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';
const Signin = () => {
  const schema = yup.object().shape({
    username: yup.string().required().test('is-email', 'Username must not contain @', (value) => {
      return !value.includes('@');
    }).max(15, 'Your Name value must be at most 10 characters long').matches(/^[A-Za-z]+$/),
    password: yup.string().required().max(15, 'Password value must be at most 10 characters long')
  }).required();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userErr = useSelector(userErr$);
  const onsubmit = (data) => {
    if (userErr == false) { //if error then return login error
      toast.success("Login Success", dispatch(loginForm(data)));
      navigate('/');
    } else {
      toast.error("Login failure");
    }
  }
  return (
    <div className='mb-5 vh-100' >
      <form className='container formContainer' onSubmit={handleSubmit(onsubmit)} >
        <div>
          <div className="inputGroup des">
            <input type="text" className="input" {...register('username')} required="" placeholder='Username' autoComplete="off" />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className="inputGroup des">
            <input type="password" className="input" {...register('password')} placeholder='Pass' required="" autoComplete="off" />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button className="btn btn-primary">Đăng nhập</button>
          <Link to={'/auth/signup'} style={{ margin: "0px 10px", color: "#0d6efd" }}  > Đăng kí </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin