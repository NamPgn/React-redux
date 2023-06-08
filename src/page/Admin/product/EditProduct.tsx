import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getProduct } from '../../../redux/slice/product/ThunkProduct/product';
import { toast } from 'react-toastify';
import { Cate } from '../../../function';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hook';
import { MyContext } from '../../../context';
declare var Promise: any;
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const SelectStyled = styled.select``;
const EditProduct = () => {
  const { categorymain, LoadingCateMain, seri, loadingSeri, isError }: any = useContext(MyContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, reset, register } = useForm();
  const dispatch = useAppDispatch();
  const [state, setState]: any = useState({});
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getFormProduct = async (): Promise<any> => {
      const { payload }: any = await dispatch(getProduct(id));
      reset(payload);
      setState(payload);
    }
    getFormProduct();
    const dataCate = async (): Promise<any> => {
      setCategory(await Cate());
    }
    dataCate();
  }, []);

  const onsubmit = (data: any) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('options', data.options);
    formdata.append('seri', data.seri);
    formdata.append('category', data.category);
    formdata.append('_id', id);
    formdata.append('linkVideo', data.linkVideo);
    formdata.append('seri', data.seri);
    formdata.append('LinkCopyright', data.LinkCopyright);
    formdata.append('copyright', data.copyright)
    formdata.append('descriptions', data.descriptions);
    formdata.append('trailer', data.trailer);
    formdata.append('image', data.image[0]);
    formdata.append('year', data.year);
    formdata.append('country', data.country);
    formdata.append('typeId', data.typeId);
    formdata.append('categorymain', data.categorymain);
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
          <label className="form-label">seri</label>
          <InputStyled type="text" {...register('seri')} className="form-control" />
        </Divstyled>

        <Divstyled className="mb-3">
          <label className="form-label">Desciption</label>
          <InputStyled type="text" {...register('descriptions')} className="form-control" />
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
          <InputStyled type="text" {...register('link')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Trailer Video</label>
          <InputStyled type="text" {...register('trailer')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <Divstyled style={{ width: "150px", height: "200px" }}>
            <img style={{ height: "100%", width: "100%" }}
              src={state.image == undefined || null ? "https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54" : state.image} alt="" />
          </Divstyled>
          <br />
          <label className="form-label">New Image</label>
          <InputStyled type="file"  {...register('image')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Year</label>
          <InputStyled type="text" name='year' {...register('year')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Country</label>
          <InputStyled type="text" name='country' {...register('country')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Options</label>
          <InputStyled type="text" name='options' {...register('options')} className="form-control" />
        </Divstyled>
        {/** Thể loại của phim tập*/}
        <Divstyled className="form-label">Category</Divstyled>
        <SelectStyled className="form-select-sm mb-4" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của phim tập</option>
          {category ? category.map((item: any, index: any) =>
            <option value={item._id} key={index}>{
              item.name
            }</option>
          ) : ""}
        </SelectStyled>
        <br />
        {/** Thể loại của phim lẻ phim bộ 1 tập */}
        <Divstyled className="form-label">Thể loại của phim lẻ</Divstyled>
        <SelectStyled className="form-select-sm mb-4" {...register('typeId')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của phim lẻ phim bộ 1 tập</option>
          {seri ? seri.map((item: any, index: any) =>
            <option value={item._id} key={index}>{item.name}</option>
          ) : ""}
        </SelectStyled>
        <br />
        {/** Thể loại của danh mục thể loại gồm các danh mục con */}
        <Divstyled className="form-label">Thể loại của danh mục thể loại gồm các danh mục con</Divstyled>
        <SelectStyled className="form-select-sm mb-4" {...register('categorymain')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của danh mục thể loại gồm các danh mục con</option>
          {categorymain ? categorymain.map((item: any, index: any) =>
            <option value={item._id} key={index}>{item.name}</option>
          ) : ""}
        </SelectStyled>
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </Divstyled>
  )
}

export default EditProduct