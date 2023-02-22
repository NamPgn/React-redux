import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/slice/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cate } from '../../../main';
import FileBase64 from 'react-file-base64';
const ProductAdd = () => {
  const [state, setCate] = useState([]);
  const [formatted, SetFormatted] = useState({
    name: '',
    price: '',
    descriptions: '',
    seri: '',
    copyright: '',
    LinkCopyright: '',
    category: '',
    image: '',
    linkVideo: ''
  })
  useEffect(() => {
    const dataCate = async () => {
      setCate(await Cate());
    }
    dataCate();
  })
  const dispath = useDispatch();
  const navigate = useNavigate();
  const onsubmit = (data) => {
    console.log("state", formatted)
    dispath(addProduct(formatted));
    navigate('/admin/products');
    toast.success('Add Product Success', {
      position: "bottom-right",
      autoClose: 5000,
      theme: "light",
    });
  }
  return (
    <div>
      {/* <form > */}
      <div className="mb-3">
        <label className="form-label">Product name</label>
        <input type="text" name='name' onChange={(e) => { SetFormatted({ ...formatted, name: e.target.value }) }} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">View</label>
        <input type="text" name='price' onChange={(e) => { SetFormatted({ ...formatted, price: e.target.value }) }} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Desciption</label>
        <input type="text" name='descriptions' onChange={(e) => { SetFormatted({ ...formatted, descriptions: e.target.value }) }} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Seri</label>
        <input type="text" name='seri' onChange={(e) => { SetFormatted({ ...formatted, seri: e.target.value }) }} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Copyright</label>
        <input type="text" name='copyright' onChange={(e) => { SetFormatted({ ...formatted, copyright: e.target.value }) }} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">LinkCopyright</label>
        <input type="text" name='LinkCopyright' onChange={(e) => { SetFormatted({ ...formatted, LinkCopyright: e.target.value }) }} className="form-control" required />
      </div>
      <div className="form-label">Category</div>
      <select className="form-select-sm" onChange={(e) => { SetFormatted({ ...formatted, category: e.target.value }) }} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
        <option value={''} >Open this select menu</option>
        {state.map((item, index) => {
          return <option value={item._id} key={index}>{item.name}</option>
        })}
      </select>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <FileBase64 type='file'
          multiple={false}
          onDone={({ base64 }) => {
            SetFormatted({ ...formatted, image: base64 });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Video Url</label>
        <input type="text" name='videourl' onChange={(e) => { SetFormatted({ ...formatted, linkVideo: e.target.value }) }} className="form-control" required />
      </div>
      <button onClick={() => onsubmit()} className="btn btn-primary">Submit</button>
      {/* </form> */}
    </div>
  )
}

export default ProductAdd