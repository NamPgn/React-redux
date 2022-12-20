import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resgisterLogin } from '../../slice/userSlice';


const Adduser = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    console.log(data)
    dispath(resgisterLogin(formData));
    navigate("/admin");
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">User name</label>
          <input type="text" {...register('username', { required: true })} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="text" {...register('email', { required: true })} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password"  {...register(`password`, { required: true })} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file"  {...register("image")} className="form-control" required />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Adduser
