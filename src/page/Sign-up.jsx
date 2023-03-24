import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { resgisterLogin } from "../redux/slice/userSlice"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
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
    const dispath = useDispatch();
    const navigate = useNavigate();
    const onsubmit = (data) => {
        // const formData = new FormData();
        // formData.append("image", data.image[0]);
        // formData.append('username', data.username);
        // formData.append('email', data.email);
        // formData.append('password', data.password);
        console.log("data",data)
        dispath(resgisterLogin(data));
        toast.success('Register Success');
        navigate("/auth/signin");
    }
    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className='mb-5'>
                {/* <form onSubmit={(onsubmit)} className="container formContainer"> */}
                <div className='formContainer container'>
                    <div>
                        <div className="mb-3 des">
                            <input type="text" className="input" {...register('username')} name="username" aria-describedby="emailHelp" placeholder='Username' />
                            {errors.username && <p>{errors.username.message}</p>}
                        </div>
                        {/* <div className="mb-3">
                        <input type="hidden"  className="input" name='email' onChange={(e) => { setSate({ ...state, email: e.target.value }) }} aria-describedby="emailHelp" placeholder='Email address' />
                    </div> */}
                        <div className="mb-3 des">
                            <input type="password" className="input" {...register('password')} name='password' placeholder='Password' id="exampleInputPassword1" />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        {/* <div className="mb-3" style={{ color: "#fff" }}>
                        <FileBase64 type='file'
                            multiple={false}
                            onDone={({ base64 }) => {
                                setSate({ ...state, image: base64 });
                            }}
                        />
                    </div> */}
                        <button className="btn btn-primary">Register</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </form>
    )
}

export default Signup