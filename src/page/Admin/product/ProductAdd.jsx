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
    formdata.append('price', data.price);
    formdata.append('category', data.category);
    formdata.append('linkVideo', data.linkVideo);
    formdata.append('seri', data.seri);
    formdata.append('LinkCopyright', data.LinkCopyright);
    formdata.append('copyright', data.copyright)
    formdata.append('descriptions',data.descriptions);
    console.log("data",data);
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
          <label className="form-label">View</label>
          <input type="text" {...register('price')} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Video Url</label>
          <input type="text" {...register('linkVideo')} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Desciption</label>
          <input type="text" {...register('descriptions')} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Seri</label>
          <input type="text" {...register('seri')} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Copyright</label>
          <input type="text" {...register('copyright')} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">LinkCopyright</label>
          <input type="text" {...register('LinkCopyright')} className="form-control" required />
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