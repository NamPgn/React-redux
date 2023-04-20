import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cate } from '../../../function';
import FileBase64 from 'react-file-base64';
import { useForm } from "react-hook-form";
import { addProduct } from '../../../redux/slice/product/ThunkProduct/product';
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const SelectStyled = styled.select``;
const ProductAdd = () => {
  const [state, setCate] = useState([]);
  useEffect(() => {
    const dataCate = async () => {
      setCate(await Cate());
    }
    dataCate();
  }, []);
  const dispatch = useDispatch();
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
    formdata.append('image', data.image);
    dispatch(addProduct(formdata));
    console.log(data);
    // navigate('/admin/products');
    toast.success('Add Product Success', {
      position: "bottom-right",
      autoClose: 5000,
      theme: "light",
    });
  }
  return (
    <Divstyled>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Divstyled className="mb-3">
          <label className="form-label">Product name</label>
          <InputStyled type="text" name='name' {...register('name')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">View</label>
          <InputStyled type="text" name='price' {...register('price')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Desciption</label>
          <InputStyled type="text" name='descriptions' {...register('descriptions')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Seri</label>
          <InputStyled type="text" name='seri' {...register('seri')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Copyright</label>
          <InputStyled type="text" name='copyright' {...register('copyright')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">LinkCopyright</label>
          <InputStyled type="text" name='LinkCopyright' {...register('LinkCopyright')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Video Url</label>
          <InputStyled type="file" name='file' {...register('file')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Image</label>
          <InputStyled type="text" name='image' {...register('image')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Trailer Video</label>
          <InputStyled type="text" name='trailer' {...register('trailer')} className="form-control" />
        </Divstyled>
        <Divstyled className="form-label">Category</Divstyled>
        <SelectStyled className="form-select-sm" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Open this select menu</option>
          {state.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </SelectStyled>
        {/* <Divstyled className="mb-3 mt-2">
          <label className="form-label">Image</label>
          <FileBase64 type='file'
            multiple={false}
            onDone={({ base64 }) => {
              // SetFormatted({ ...formatted, image: base64 });
            }}
          />
        </Divstyled> */}
        <br />
        <Divstyled className='mt-2'>
          <BtnStyled className="btn btn-primary">Submit</BtnStyled>
        </Divstyled>
      </form>
    </Divstyled>
  )
}

export default ProductAdd