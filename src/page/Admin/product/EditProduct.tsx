import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getProduct } from '../../../redux/slice/product/ThunkProduct/product';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hook';
import { MyContext } from '../../../context';
import renderInput from '../../../hook/form';
import { UploadAssby } from '../../../api/product';
import { MyButton } from '../../../components/Button';
declare var Promise: any;
const Divstyled = styled.div``;
const SelectStyled = styled.select``;
const EditProduct = () => {
  const { categorymain, category, seri }: any = useContext(MyContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, reset, register, control } = useForm();
  const dispatch = useAppDispatch();
  const [state, setState]: any = useState({});
  useEffect(() => {
    const getFormProduct = async (): Promise<any> => {
      const { payload }: any = await dispatch(getProduct(id));
      reset(payload);
      setState(payload);
    }
    getFormProduct();
  }, []);
  const onsubmit = (data: any) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('options', data.options);
    formdata.append('seri', data.seri);
    formdata.append('category', data.category);
    formdata.append('_id', id);
    formdata.append('seri', data.seri);
    formdata.append('LinkCopyright', data.LinkCopyright);
    formdata.append('copyright', data.copyright)
    formdata.append('descriptions', data.descriptions);
    formdata.append('trailer', data.trailer);
    formdata.append('image', data.image[0]);
    formdata.append('file', data.file[0]);
    formdata.append('year', data.year);
    formdata.append('country', data.country);
    formdata.append('typeId', data.typeId);
    formdata.append('categorymain', data.categorymain);
    formdata.append('dailyMotionServer', data.dailyMotionServer);
    formdata.append('image2',data.image2);
    formdata.append('video2',data.video2);
    dispatch(editProduct(formdata));
    // navigate('/admin/products');
    toast.success(`Sửa ${data.name}} công`, {
      position: "bottom-right",
      autoClose: 5000,
      theme: "light",
    });
  }

  const handleSubmitServerAssb = async (data: any) => {
    const formdata = new FormData();
    formdata.append('fileupload', data.fileupload[0]);
    await UploadAssby(id, formdata)
  }
  return (
    <Divstyled>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Divstyled className="mb-3">
          {renderInput('name', 'Product name', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('seri', 'Seri', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('view', 'View', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('descriptions', 'Desciption', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('copyright', 'Copyright', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('LinkCopyright', 'LinkCopyright', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('link', 'Video Url', control)}
        </Divstyled>
        <div className="mb-3">
          {renderInput('dailyMotionServer', 'DailyMotionServer', control)}
        </div>
        <Divstyled className="mb-3">
          {renderInput('server2', 'Assb server', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('trailer', 'Trailer Video', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          <Divstyled style={{ width: "150px", height: "200px" }}>
            <img style={{ height: "100%", width: "100%" }}
              src={state.image == undefined || null ? "https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54" : state.image} alt="" />
          </Divstyled>
          <br />
          <div className="mb-3">
            <label className="form-label">New Video Url</label>
            <input type="file" name='file' {...register('file')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
          </div>
          <div className="mb-3">
            <label className="form-label">New Image</label>
            <input type="file" name='image' {...register('image')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
          </div>
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('year', 'Year', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('country', 'country', control)}
        </Divstyled>
        <Divstyled className="mb-3">
          {renderInput('options', 'Options', control)}
        </Divstyled>
        <div className="mb-3">
          {renderInput('video2', 'Video Link', control)}
        </div>
        <div className="mb-3">
          {renderInput('image2', 'Image Link', control)}
        </div>
        {/** Thể loại của phim tập*/}
        <Divstyled className="form-label">Category</Divstyled>
        <SelectStyled className="form-select-sm mb-4" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''}  >Thể loại của phim tập</option>
          {category ? category.data.map((item: any, index: any) =>
            <option value={item._id} key={index} selected={state.category?._id == item._id}>{
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
            <option value={item._id} key={index} >{item.name}</option>
          ) : ""}
        </SelectStyled>
        <br />
        {/** Thể loại của danh mục thể loại gồm các danh mục con */}
        <Divstyled className="form-label">Thể loại của danh mục thể loại gồm các danh mục con</Divstyled>
        <SelectStyled className="form-select-sm mb-4" {...register('categorymain')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của danh mục thể loại gồm các danh mục con</option>
          {categorymain ? categorymain.map((item: any, index: any) =>
            <option value={item._id} key={index} >{item.name}</option>
          ) : ""}
        </SelectStyled>
        <br />
        <MyButton htmlType='submit' className="btn btn-primary">Submit</MyButton>
      </form>

      <form onSubmit={handleSubmit(handleSubmitServerAssb)}>
        <div className="mb-3 mt-5">
          <label className="form-label">Video Url</label>
          <input type="file" name='file' {...register('fileupload')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div className='mt-2'>
          <MyButton htmlType='submit' className="btn btn-primary">Submit</MyButton>
        </div>
      </form>
    </Divstyled>
  )
}

export default EditProduct