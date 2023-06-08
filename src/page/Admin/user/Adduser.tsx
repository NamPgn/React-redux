import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { resgisterLogin } from '../../../redux/slice/userSlice';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hook';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const Adduser = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data:any) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    dispath(resgisterLogin(formData));
    navigate("/admin/users");
    toast.success(`Thêm user thành công`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <Divstyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divstyled className="mb-3">
          <label className="form-label">User name</label>
          <InputStyled type="text" {...register('username', { required: true })} className="form-control" required />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Email</label>
          <InputStyled type="text" {...register('email', { required: true })} className="form-control" required />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Password</label>
          <InputStyled type="password"  {...register(`password`, { required: true })} className="form-control" required />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Image</label>
          <InputStyled type="file"  {...register("image")} className="form-control" required />
        </Divstyled>
        <BtnStyled className="btn btn-primary">Submit</BtnStyled>
      </form>
    </Divstyled>
  )
}

export default Adduser
