import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { editUser, getUser_id } from '../../../redux/slice/userSlice';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hook';
declare var Promise: any;
const DivstyledEditAuth = styled.div``;
const BtnStyledEditAuth = styled.button``;
const InputStyledEditAuth = styled.input``;
const FormStyledEditAuth = styled.form``;
const ImageStyledEditAuth = styled.img`
width: 200px; height: 200px; objectFit: cover ;
`;
const EditUser = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispath = useAppDispatch();
  const { id } = useParams();
  const [user, setstate] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getDataUser = () => {
      const { payload }: any = dispath(getUser_id(id));
      console.log(payload);
      reset(payload);
      setstate(payload);
    }
    getDataUser();
  }, [])
  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('_id', id);
    dispath(editUser(formData));
    navigate("/admin/users");
    toast.success(`Sửa ${formData.append('username', data.username)} thành công`, {
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
    <DivstyledEditAuth>
      <FormStyledEditAuth onSubmit={handleSubmit(onSubmit)}>
        <DivstyledEditAuth className="mb-3">
          <label className="form-label">User name</label>
          <InputStyledEditAuth type="text" {...register('username', { required: true })} className="form-control" />
        </DivstyledEditAuth>
        <DivstyledEditAuth className="mb-3">
          <label className="form-label">Email</label>
          <InputStyledEditAuth type="email"  {...register('email', { required: true })} className="form-control" />
        </DivstyledEditAuth>
        <DivstyledEditAuth className="mb-3">
          <label className="form-label">Password</label>
          <InputStyledEditAuth type="password"  {...register('password', { required: true })} className="form-control" />
        </DivstyledEditAuth>
        <DivstyledEditAuth>Image</DivstyledEditAuth>
        {/* <InputStyledEditAuth type="text" {...register('image', { required: true })} className="form-control" /> */}
        <ImageStyledEditAuth src={user ? user.image : ""} className="img-radius" alt="User-Profile-Image" />
        <DivstyledEditAuth className="mb-3">
          <label className="form-label">Image</label>
          <InputStyledEditAuth type="file" {...register('image')} className="form-control" />
        </DivstyledEditAuth>
        <BtnStyledEditAuth className="btn btn-primary">Submit</BtnStyledEditAuth>
      </FormStyledEditAuth>
    </DivstyledEditAuth>
  )
}

export default EditUser
