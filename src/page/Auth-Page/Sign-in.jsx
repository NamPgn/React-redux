import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginForm } from '../../redux/slice/userSlice';
import { toast } from 'react-toastify';
import { isLogin$, loginUser$, userErr$ } from '../../redux/selectors/user';
import { Navigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { user$ } from '../../redux/selectors';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const FormStyled = styled.form``;
const Signin = () => {
  const [state, setSate] = useState(null);
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
  const onsubmit = (data) => {
    dispatch(loginForm(data));
    console.log(state);
    setInterval(() => {
      setSate(localStorage.getItem('token'));
    }, 2000);
    toast.success('thành công')
    navigate('/');
    //if error then return login error
  }
  return (
    <Divstyled className='mb-5 vh-100' >
      <FormStyled className='containers formContainer' onSubmit={handleSubmit(onsubmit)} >
        <Divstyled>
          <Divstyled className="inputGroup des">
            <InputStyled type="text" className="input" {...register('username')} required="" placeholder='Username' autoComplete="off" />
            {errors.username && <p>{errors.username.message}</p>}
          </Divstyled>
          <Divstyled className="inputGroup des">
            <InputStyled type="password" className="input" {...register('password')} placeholder='Pass' required="" autoComplete="off" />
            {errors.password && <p>{errors.password.message}</p>}
          </Divstyled>
          <BtnStyled className="btn btn-primary">Đăng nhập</BtnStyled>
          <Link to={'/auth/signup'} style={{ margin: "0px 10px", color: "#0d6efd" }}> Đăng kí </Link>
        </Divstyled>
      </FormStyled>
    </Divstyled>
  )
}

export default Signin