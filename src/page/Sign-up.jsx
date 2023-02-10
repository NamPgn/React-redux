import { useForm } from 'react-hook-form'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { resgisterLogin } from "../slice/userSlice"

import { useDispatch } from 'react-redux';
const Signup = () => {
    const { handleSubmit, register } = useForm();
    const dispath = useDispatch();
    const navigate = useNavigate();
    const onsubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        console.log("dataForm", data)
        dispath(resgisterLogin(formData));
        navigate("/auth/signin")
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)} className="container formContainer">
                <div>
                    <div className="mb-3">
                        <input type="text" className="input" name="username" {...register("username")} aria-describedby="emailHelp" placeholder='Username' />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="input" name='email' {...register("email")} aria-describedby="emailHelp" placeholder='Email address' />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="input" name='password' placeholder='Password'  {...register("password")} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <input type="file" className="input" name='file' placeholder='Repassword'  {...register("image")} id="exampleInputPassword1" />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup