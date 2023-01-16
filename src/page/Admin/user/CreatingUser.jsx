import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { importXlsx } from '../../../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    <div style={{ display: "flex", justifyContent: "center", textAlign: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label class="form-label" for="customFile">Default file input example</label>
        <input type="file" {...register('xlsx')} class="form-control" id="customFile" />
        <button class="btn btn-success" style={{ margin: "20px 0" }}>Submit</button>
      </form>
    </div>
  )
}

export default CreatingUser
