import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { resgisterLogin } from '../../../../redux/slice/userSlice';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch } from '../../../../hook';
import RenderInput from '../../../../components/Form/component';
import { MyButton } from '../../../../components/MV/Button';
const Divstyled = styled.div``;
const InputStyled = styled.input``;
const Adduser = () => {
  const { register, handleSubmit, control } = useForm();
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    dispath(resgisterLogin(formData));
    navigate("/dashboard/users");
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
          <RenderInput
            name={'username'}
            label={'User name'}
            control={control}
            rules={undefined}
          />
        </Divstyled>
        <Divstyled className="mb-3">
          <RenderInput
            name={'email'}
            label={'Email'}
            control={control}
            rules={undefined}
          />
        </Divstyled>
        <Divstyled className="mb-3">
          <RenderInput
            name={'password'}
            label={'Password'}
            control={control}
            rules={undefined}
          />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Image</label>
          <InputStyled type="file"  {...register("image")} className="form-control" required />
        </Divstyled>
        <MyButton className="btn btn-primary">Submit</MyButton>
      </form>
    </Divstyled>
  )
}

export default Adduser
