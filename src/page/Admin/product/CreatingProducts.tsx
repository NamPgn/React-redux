import React from 'react'
import { useForm } from 'react-hook-form';
import { importDataFile } from '../../../redux/slice/product/thunkProduct/product';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hook';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const CreatingProducts = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onsubmit = (data: any) => {
    const formData = new FormData();
    formData.append('xlsxProduct', data.xlsxProduct[0]);
    dispatch(importDataFile(formData));
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
    navigate('/dashboard/products');
  }
  return (
    <Divstyled>
      <Divstyled style={{ display: "flex", justifyContent: "center", textAlign: "center", height: "100vh" }}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <label className="form-label" >Default file input example</label>
          <InputStyled type="file" {...register('xlsxProduct')} className="form-control" id="customFile" />
          <BtnStyled className="btn btn-success" style={{ margin: "20px 0" }}>Submit</BtnStyled>
        </form>
      </Divstyled>
    </Divstyled>
  )
}

export default CreatingProducts