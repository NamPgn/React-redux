import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { editProduct, getProduct } from '../../../../redux/slice/product/thunkProduct/product';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch } from '../../../../hook';
import { MyContext } from '../../../../context';
import renderInput, { MySelectWrapper, MyUploadWrapper } from '../../../../hook/form';
import { UploadAssby } from '../../../../api/product';
import { MyButton } from '../../../../components/Button';
declare var Promise: any;
const Divstyled = styled.div``;
const EditProduct = () => {
  const { categorymain, category, seri }: any = useContext(MyContext);
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
  const onsubmit = async (data: any) => {
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
    // formdata.append('file', data.file[0]);
    formdata.append('year', data.year);
    formdata.append('country', data.country);
    formdata.append('typeId', data.typeId);
    formdata.append('categorymain', data.categorymain);
    formdata.append('dailyMotionServer', data.dailyMotionServer);
    formdata.append('link', data.link);
    formdata.append('imageLink', data.image);
    const res = await dispatch(editProduct(formdata));
    if (res.payload.success) {
      toast.success(`Sửa ${data.name} công`);
    }
  }
  const handleSubmitServerAssb = async (data: any) => {
    const formdata = new FormData();
    formdata.append('fileupload', data.fileupload[0]);
    const res = await UploadAssby(id, formdata);
    if (res) {
      toast.success(`Sửa ${data.name} công`);
    }
  }
  return (
    <Divstyled>
      <form onSubmit={handleSubmit(onsubmit)}>
        {renderInput('name', 'Product name', control)}
        {renderInput('seri', 'Seri', control)}
        {renderInput('view', 'View', control)}
        {renderInput('descriptions', 'Desciption', control)}
        {renderInput('copyright', 'Copyright', control)}
        {renderInput('LinkCopyright', 'LinkCopyright', control)}
        {renderInput('link', 'Video Url', control)}
        {renderInput('dailyMotionServer', 'DailyMotionServer', control)}
        {renderInput('server2', 'Assb server', control)}
        {renderInput('trailer', 'Trailer Video', control)}
        <Divstyled style={{ width: "150px", height: "200px" }}>
          <img style={{ height: "100%", width: "100%" }}
            src={state.image == undefined || null ? "https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54" : state.image} alt="" />
        </Divstyled>
        <br />
        <MyUploadWrapper
          name={'file'}
          label={'New Video Upload'}
          control={control}
        />
        <MyUploadWrapper
          name={'image'}
          label={'New Image Upload'}
          control={control}
        />
        {/* <div className="mb-3">
          <label className="form-label">New Video Url</label>
          <input type="file" name='file' {...register('file')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div className="mb-3">
          <label className="form-label">New Image</label>
          <input type="file" name='image' {...register('image')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div> */}
        {renderInput('year', 'Year', control)}
        {renderInput('country', 'country', control)}
        {renderInput('options', 'Options', control)}
        {renderInput('imageLink', 'Image Link', control)}
        {/** Thể loại của phim tập*/}
        <MySelectWrapper
          label={'Category'}
          control={control}
          name={'category'}
          placeholder={'category'}
          defaultValue={'category'}
          style={{ width: 300 }}
          options={category && (category?.data.map((item, index) => ({
            label: item.name,
            value: item._id
          })))}
        />
        <br />
        {/** Thể loại của phim lẻ phim bộ 1 tập */}
        <MySelectWrapper
          name={'typeId'}
          label={'Thể loại của phim lẻ'}
          control={control}
          placeholder={'Thể loại'}
          defaultValue={'Thể loại'}
          style={{ width: 300 }}
          options={seri && (seri?.map((item, index) => ({
            label: item.name,
            value: item._id
          })))}
        />
        <br />
        {/** Thể loại của danh mục thể loại gồm các danh mục con */}
        <MySelectWrapper
          control={control}
          name={'Thể loại của danh mục thể loại gồm các danh mục con'}
          label={'Categorymain'}
          placeholder={'categorymain'}
          defaultValue={'categorymain'}
          style={{ width: 300 }}
          options={categorymain && (categorymain?.map((item, index) => ({
            label: item.name,
            value: item._id
          })))}
        />
        <br />
        <MyButton htmlType='submit' className="btn btn-primary mt-2">Submit</MyButton>
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