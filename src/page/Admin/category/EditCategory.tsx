import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { getCategoryOne$ } from '../../../redux/selectors';
import { getCateSlice, updateCatgorySlice } from '../../../redux/slice/category/ThunkCategory/category';
import { toast } from 'react-toastify';
import { getCategory } from '../../../api/category';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { MyButton } from '../../../components/Button';
const Divstyled = styled.div``;
const InputStyled = styled.input``;
declare var Promise: any;
const EditCategory = () => {
  const getCategoryOne = useAppSelector(getCategoryOne$);
  const dispatch = useAppDispatch();
  const { register, reset, handleSubmit } = useForm();
  const { id } = useParams();
  const [state, setData] = useState('');
  const onsubmit = (data: any) => {
    if (data) {
      toast.success('Edit successfully')
      dispatch(updateCatgorySlice(data))
    } else {
      toast.error('Edit failure')
    }
  }
  useEffect(() => {
    dispatch(getCateSlice(id));
    const data = async (): Promise<any> => {
      const { data }: any = await getCategory(id);
      reset(data);
    }
    data();
  }, []);
  const onchange = async (e): Promise<any> => {
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
          <InputStyled type="text" {...register('name')} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Category des</label>
          <InputStyled type="text" {...register('des')} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </Divstyled>
        <Divstyled className='mb-2' style={{ width: "150px", height: "150px" }}>
          <img className='h-full' src={getCategoryOne ? getCategoryOne.linkImg : ""} alt="" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Image</label>
          <InputStyled type="text" {...register('linkImg')} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </Divstyled>
        <InputStyled type="file" onChange={(e) => onchange(e)} placeholder='Imgae Edit' />
        <div className='mt-2'>
          <MyButton htmlType='submit' className="btn btn-primary">Click</MyButton>
        </div>
      </form>
    </Divstyled>
  )
}

export default EditCategory
