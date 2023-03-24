import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryOne$ } from '../../../redux/selectors';
import { getCateSlice, updateCatgorySlice } from '../../../redux/slice/category/ThunkCategory/category';
import { toast } from 'react-toastify';
import { getCategory } from '../../../api/category';
const EditCategory = () => {
  const getCategoryOne = useSelector(getCategoryOne$);
  const { register, reset, handleSubmit } = useForm();
  const { id } = useParams();
  const dispath = useDispatch();
  const [state, setData] = useState('');
  const onsubmit = (data) => {
    data ? toast.success('Edit successfully', dispath(updateCatgorySlice(data))) : toast.error('Edit failure')
  }
  useEffect(() => {
    dispath(getCateSlice(id));
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
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-3">
          <label className="form-label">Category name</label>
          <input type="text" {...register('name')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Category des</label>
          <input type="text" {...register('des')} className="form-control" />
        </div>
        <div className='mb-2' style={{ width: "150px", height: "150px" }}>
          <img src={getCategoryOne.linkImg} alt="" />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="text" {...register('linkImg')} className="form-control" />
        </div>
        <input type="file" onChange={(e) => onchange(e)} placeholder='Imgae Edit' />
        <div style={{ width: "150px", height: "150px" }}>
          <input type="text" value={state} className="form-control" />
        </div>
        <button className="btn btn-primary">Click</button>
      </form>
    </div>
  )
}

export default EditCategory
