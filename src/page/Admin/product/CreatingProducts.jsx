import React from 'react'
import { useForm } from 'react-hook-form';
import { importDataFile } from '../../../slice/productSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CreatingProducts = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const onsubmit = (data) => {
    const formData = new FormData();
    formData.append('xlsxProduct', data.xlsxProduct[0]);
    dispath(importDataFile(formData));
    toast.success(`Thêm sản phẩm thành công`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate('/admin/products');
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", textAlign: "center", height: "100vh" }}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <label class="form-label" for="customFile">Default file input example</label>
          <input type="file" {...register('xlsxProduct')} class="form-control" id="customFile" />
          <button class="btn btn-success" style={{ margin: "20px 0" }}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatingProducts