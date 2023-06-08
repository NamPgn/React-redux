import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Cate } from '../../../function';
import { useForm } from "react-hook-form";
import { addProduct } from '../../../redux/slice/product/ThunkProduct/product';
import styled from 'styled-components';
import { MyContext } from '../../../context';
import { useAppDispatch } from '../../../hook';
declare var Promise: any;
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const SelectStyled = styled.select``;
const ProductAdd = () => {
  const { categorymain, LoadingCateMain, seri, loadingSeri, isError }: any = useContext(MyContext);
  const [state, setCate] = useState([]);
  useEffect(() => {
    const dataCate = async (): Promise<any> => {
      setCate(await Cate());
    }
    dataCate();
  }, []);

  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const onsubmit = (data: any) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('options', data.options);
    formdata.append('category', data.category);
    formdata.append('file', data.file[0]);
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
    dispatch(addProduct(formdata));

    if (isError) {
      toast.error('thất bại');
    }
    toast.success('thành công');
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
          <label className="form-label">Seri</label>
          <InputStyled type="text" name='seri' {...register('seri')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Desciption</label>
          <InputStyled type="text" name='descriptions' {...register('descriptions')} className="form-control" />
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
          <InputStyled type="file" name='image' {...register('image')} className="form-control" />
        </Divstyled>
        <Divstyled className="mb-3">
          <label className="form-label">Trailer Video</label>
          <InputStyled type="text" name='trailer' {...register('trailer')} className="form-control" />
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
          {state.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </SelectStyled>
        <br />
        {/** Thể loại của phim lẻ phim bộ 1 tập */}
        <Divstyled className="form-label">Thể loại của phim lẻ</Divstyled>
        <SelectStyled className="form-select-sm mb-4" {...register('typeId')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của phim lẻ phim bộ 1 tập</option>
          {seri.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </SelectStyled>
        <br />
        {/** Thể loại của danh mục thể loại gồm các danh mục con */}
        <Divstyled className="form-label">Thể loại của danh mục thể loại gồm các danh mục con</Divstyled>
        <SelectStyled className="form-select-sm mb-4" {...register('categorymain')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của danh mục thể loại gồm các danh mục con</option>
          {categorymain.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </SelectStyled>
        <br />
        <Divstyled className='mt-2'>
          <BtnStyled className="btn btn-primary">Submit</BtnStyled>
        </Divstyled>
      </form>
    </Divstyled>
  )
}

export default ProductAdd