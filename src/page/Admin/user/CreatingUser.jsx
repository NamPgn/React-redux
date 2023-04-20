import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { importXlsx } from '../../../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
const DivstyledAuth = styled.div`
display: flex;
justifyContent: center;
textAlign: center; 
height: 100vh ;
`;
const BtnStyledCreateAuth = styled.button`
margin: 20px 0;
`;
const FormStyledCreateAuth = styled.form`

`
const InputStyled = styled.input``;
const CreatingUser = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const onsubmit = (data) => {
    const formData = new FormData();
    formData.append('xlsx', data.xlsx[0]);
    dispath(importXlsx(formData));
    navigate('/admin/users');
    toast.success(`Thêm user thành công`, {
      position: "bottom-right",
    });
  }
  return (
    <DivstyledAuth>
      <FormStyledCreateAuth onSubmit={handleSubmit(onsubmit)}>
        <label className="form-label" for="customFile">Default file input example</label>
        <InputStyled type="file" {...register('xlsx')} className="form-control" id="customFile" />
        <BtnStyledCreateAuth className="btn btn-success">Submit</BtnStyledCreateAuth>
      </FormStyledCreateAuth>
    </DivstyledAuth>
  )
}

export default CreatingUser
