import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getProduct } from '../../../redux/slice/product/ThunkProduct/product';
import { toast } from 'react-toastify';
import { Cate } from '../../../function';
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const SelectStyled = styled.select``;
const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, reset, register } = useForm();
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getFormProduct = async () => {
      const { payload } = await dispatch(getProduct(id));
      reset(payload);
      setState(payload);
    }
    getFormProduct();
    const dataCate = async () => {
      setCategory(await Cate());
    }
    dataCate();
  }, []);

  const onsubmit = (data) => {
    const formdata = new FormData();
    // formdata.append('image', data.image[0]);
    formdata.append('name', data.name);
    formdata.append('price', data.price);
    formdata.append('category', data.category);
    formdata.append('_id', id);
    formdata.append('linkVideo', data.linkVideo);
    formdata.append('seri', data.seri);
    formdata.append('LinkCopyright', data.LinkCopyright);
    formdata.append('copyright', data.copyright)
    formdata.append('descriptions', data.descriptions);
    formdata.append('trailer', data.trailer);
    dispatch(editProduct(formdata));
    navigate('/admin/products');
    toast.success(`Sửa ${data.name}} công`, {
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
          <InputStyled type="text" {...register('name')} className="form-control" />
        </Divstyled>

        <Divstyled className="mb-3">
          <label className="form-label">Price</label>
          <InputStyled type="text" {...register('price')} className="form-control" />
        </Divstyled>

        <Divstyled className="mb-3">
          <label className="form-label">Desciption</label>
          <InputStyled type="text" {...register('descriptions')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Seri</label>
          <InputStyled type="text" {...register('seri')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Copyright</label>
          <InputStyled type="text" {...register('copyright')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">LinkCopyright</label>
          <InputStyled type="text" {...register('LinkCopyright')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Video Url</label>
          <InputStyled type="text" {...register('linkVideo')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Trailer Video</label>
          <InputStyled type="text" {...register('trailer')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <Divstyled style={{ width: "150px", height: "200px" }}>
            <img style={{ height: "100%", width: "100%" }} src={state.image ? state.image : "https://hoathinh3d.com/wp-content/uploads/2021/10/dau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856-300x450.jpg"} {...register('image')} alt="" />
          </Divstyled>
        </Divstyled>
        <Divstyled className="mb-3">
          <Divstyled className="form-label">Category</Divstyled>
          <SelectStyled className="form-select-sm" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
            <option value={''} >Open this select menu</option>
            {category.map((item, index) => {
              return <option value={item._id} key={index}>{item.name}</option>
            })}
          </SelectStyled>
        </Divstyled>
        <button className="btn btn-primary">Submit</button>
      </form>
    </Divstyled>
  )
}

export default EditProduct