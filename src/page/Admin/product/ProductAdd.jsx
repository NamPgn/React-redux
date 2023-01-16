import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../slice/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cate } from '../../../main';
const ProductAdd = () => {
  const [state, setCate] = useState([]);
  useEffect(() => {
    const dataCate = async () => {
      setCate(await Cate());
    }
    dataCate();
  })
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const onsubmit = (data) => {
    const formdata = new FormData();
    formdata.append('image', data.image[0]);
    formdata.append('name', data.name);
    formdata.append('descriptions', data.descriptions);
    formdata.append('price', data.price);
    formdata.append('category', data.category);
    dispath(addProduct(formdata));
    navigate('/admin/products');
    toast.success('Add Product Success', {
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
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-3">
          <label className="form-label">Product name</label>
          <input type="text" {...register('name')} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" {...register('descriptions')} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="text" {...register('price')} className="form-control" required />
        </div>

        <div className="form-label">Category</div>
        <select className="form-select-sm" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Open this select menu</option>
          {state.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </select>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" {...register('image')} className="form-control" required />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default ProductAdd