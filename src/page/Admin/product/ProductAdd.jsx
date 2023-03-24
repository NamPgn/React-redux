import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cate } from '../../../main';
import FileBase64 from 'react-file-base64';
import { useForm } from "react-hook-form";
import { addProduct } from '../../../redux/slice/product/ThunkProduct/product';
const ProductAdd = () => {
  const [state, setCate] = useState([]);

  useEffect(() => {
    const dataCate = async () => {
      setCate(await Cate());
    }
    dataCate();
  }, []);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const { register, reset, handleSubmit } = useForm();
  const onsubmit = (data) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('price', data.price);
    formdata.append('category', data.category);
    formdata.append('file', data.file[0]);
    formdata.append('seri', data.seri);
    formdata.append('LinkCopyright', data.LinkCopyright);
    formdata.append('copyright', data.copyright)
    formdata.append('descriptions', data.descriptions);
    formdata.append('trailer', data.trailer);
    dispath(addProduct(formdata));
    // navigate('/admin/products');
    toast.success('Add Product Success', {
      position: "bottom-right",
      autoClose: 5000,
      theme: "light",
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-3">
          <label className="form-label">Product name</label>
          <input type="text" name='name' {...register('name')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">View</label>
          <input type="text" name='price' {...register('price')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Desciption</label>
          <input type="text" name='descriptions' {...register('descriptions')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Seri</label>
          <input type="text" name='seri' {...register('seri')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Copyright</label>
          <input type="text" name='copyright' {...register('copyright')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">LinkCopyright</label>
          <input type="text" name='LinkCopyright' {...register('LinkCopyright')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Video Url</label>
          <input type="file" name='file' {...register('file')} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Trailer Video</label>
          <input type="text" name='trailer' {...register('trailer')} className="form-control" />
        </div>
        <div className="form-label">Category</div>
        <select className="form-select-sm" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Open this select menu</option>
          {state.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </select>
        {/* <div className="mb-3 mt-2">
          <label className="form-label">Image</label>
          <FileBase64 type='file'
            multiple={false}
            onDone={({ base64 }) => {
              // SetFormatted({ ...formatted, image: base64 });
            }}
          />
        </div> */}
        <br />
        <div className='mt-2'>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ProductAdd