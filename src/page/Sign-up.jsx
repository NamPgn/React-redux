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
        navigate("/signin")
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)} className="container">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" {...register("username")} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' {...register("email")} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'  {...register("password")} id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="file" className="form-control" name='file'  {...register("image")} id="exampleInputPassword1" />
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

export default Signup