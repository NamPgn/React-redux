import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryOne$ } from '../../../redux/selectors';
import { getCateSlice, updateCatgorySlice } from '../../../redux/slice/category/ThunkCategory/category';
import { toast } from 'react-toastify';
import { getCategory } from '../../../api/category';
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const EditCategory = () => {
  const getCategoryOne = useSelector(getCategoryOne$);
  const { register, reset, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [state, setData] = useState('');
  const onsubmit = (data) => {
    data ? toast.success('Edit successfully', dispatch(updateCatgorySlice(data))) : toast.error('Edit failure')
  }
  useEffect(() => {
    dispatch(getCateSlice(id));
    const data = async () => {
      const { data } = await getCategory(id);
      reset(data);
    }
    data();
  }, []);
  const onchange = async (e) => {
    const file = e.target.files[0];
    const base64 = await converBase64(file);
    setData(base64);
  }
  const converBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  return (
    <Divstyled>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Divstyled className="mb-3">
          <label className="form-label">Category name</label>
          <InputStyled type="text" {...register('name')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Category des</label>
          <InputStyled type="text" {...register('des')} className="form-control" />
        </Divstyled>
        <Divstyled className='mb-2' style={{ width: "150px", height: "150px" }}>
          <img src={getCategoryOne.linkImg} alt="" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Image</label>
          <InputStyled type="text" {...register('linkImg')} className="form-control" />
        </Divstyled>
        <InputStyled type="file" onChange={(e) => onchange(e)} placeholder='Imgae Edit' />
        <Divstyled style={{ width: "150px", height: "150px" }}>
          <InputStyled type="text" value={state} className="form-control" />
        </Divstyled>
        <BtnStyled className="btn btn-primary">Click</BtnStyled>
      </form>
    </Divstyled>
  )
}

export default EditCategory
