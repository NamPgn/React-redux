import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { resgisterLogin } from "../redux/slice/userSlice"
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Signup = () => {
    const { handleSubmit, register } = useForm();
    const dispath = useDispatch();
    const navigate = useNavigate();
    const [state, setSate] = useState({
        username: '',
        email: '',
        password: '',
        image: ''
    });

    const onsubmit = (data) => {
        // const formData = new FormData();
        // formData.append("image", data.image[0]);
        // formData.append('username', data.username);
        // formData.append('email', data.email);
        // formData.append('password', data.password);
        console.log(state);
        dispath(resgisterLogin(state));
        toast.success('Login Success');
        navigate("/auth/signin");

    }
    return (
        <div>
            {/* <form onSubmit={(onsubmit)} className="container formContainer"> */}
            <div className='formContainer container'>
                <div>
                    <div className="mb-3">
                        <input type="text" className="input" onChange={(e) => { setSate({ ...state, username: e.target.value }) }} name="username" aria-describedby="emailHelp" placeholder='Username' />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="input" name='email' onChange={(e) => { setSate({ ...state, email: e.target.value }) }} aria-describedby="emailHelp" placeholder='Email address' />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="input" onChange={(e) => { setSate({ ...state, password: e.target.value }) }} name='password' placeholder='Password' id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3" style={{ color: "#fff" }}>
                        <FileBase64 type='file'
                            multiple={false}
                            onDone={({ base64 }) => {
                                setSate({ ...state, image: base64 });
                            }}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={() => onsubmit()}>Submit</button>
                </div>
            </div>
            {/* </form> */}
        </div>
    )
}

export default Signup