import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getProduct } from '../../../slice/productSlice';

import { toast } from 'react-toastify';
import { getAdmin } from '../../../slice/userSlice';
import { getAllcategory } from '../../../api/categoty';
import { Cate, filterCate } from '../../../main';
const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, reset, register } = useForm();
  const dispath = useDispatch();
  const [state, setState] = useState({});
  const [cate, setCate] = useState([]);
  const [category,setCategory]=useState([]);
  useEffect(() => {
    const getFormProduct = async () => {
      const { payload } = await dispath(getProduct(id));
      reset(payload);
      setState(payload);
    }
    getFormProduct();

    const dataCate = async () => {
      setCategory(await Cate());
    }
    dataCate();
  }, []);
  useEffect(() => {
    const Cate = async () => {
      const { data } = await getAllcategory();
      setCate(data);
    }
    Cate();
  }, []);
  const onsubmit = (data) => {
    const formdata = new FormData();
    formdata.append('image', data.image[0]);
    formdata.append('name', data.name);
    formdata.append('descriptions', data.descriptions);
    formdata.append('price', data.price);
    formdata.append('category', data.category);
    formdata.append('_id', id);
    dispath(editProduct(formdata));
    navigate('/admin/products');
    toast.success(`Sửa ${data.name}} công`, {
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
        <div className="mb-3">
          <div className="form-label">Category</div>
          <select className="form-select-sm" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
            <option value={''} >Open this select menu</option>
            {category.map((item, index) => {
              return <option value={item._id} key={index}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" {...register('image')} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default EditProduct