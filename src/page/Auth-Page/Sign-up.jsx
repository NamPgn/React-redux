import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { resgisterLogin } from "../../redux/slice/userSlice"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const FormStyled = styled.form``;
const Signup = () => {
    const schema = yup.object().shape({
        username: yup.string().required().test('is-email', 'Username must not contain @', (value) => {
            return !value.includes('@');
        }).max(15, 'Your Name value must be at most 10 characters long').matches(/^[A-Za-z]+$/),
        password: yup.string().required().max(15, 'Password value must be at most 10 characters long')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onsubmit = (data) => {
        // const formData = new FormData();
        // formData.append("image", data.image[0]);
        // formData.append('username', data.username);
        // formData.append('email', data.email);
        // formData.append('password', data.password);
        dispatch(resgisterLogin(data));
        toast.success('Register Success');
        navigate("/auth/signin");
    }
    return (
        <FormStyled onSubmit={handleSubmit(onsubmit)} className='vh-100'>
            <Divstyled className='mb-5'>
                {/* <form onSubmit={(onsubmit)} className="container formContainer"> */}
                <Divstyled className='formContainer containers '>
                    <Divstyled>
                        <Divstyled className="mb-3 des">
                            <InputStyled type="text" className="input" {...register('username')} name="username" aria-describedby="emailHelp" placeholder='Username' />
                            {errors.username && <p>{errors.username.message}</p>}
                        </Divstyled>
                        {/* <Divstyled className="mb-3">
                        <input type="hidden"  className="input" name='email' onChange={(e) => { setSate({ ...state, email: e.target.value }) }} aria-describedby="emailHelp" placeholder='Email address' />
                    </Divstyled> */}
                        <Divstyled className="mb-3 des">
                            <InputStyled type="password" className="input" {...register('password')} name='password' placeholder='Password' id="exampleInputPassword1" />
                            {errors.password && <p>{errors.password.message}</p>}
                        </Divstyled>
                        {/* <Divstyled className="mb-3" style={{ color: "#fff" }}>
                        <FileBase64 type='file'
                            multiple={false}
                            onDone={({ base64 }) => {
                                setSate({ ...state, image: base64 });
                            }}
                        />
                    </Divstyled> */}
                        <BtnStyled className="btn btn-primary">Register</BtnStyled>
                    </Divstyled>
                </Divstyled>
                {/* </form> */}
            </Divstyled>
        </FormStyled>
    )
}

export default Signup