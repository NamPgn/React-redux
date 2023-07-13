import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Cate } from '../../../function';
import { useForm } from "react-hook-form";
import { addProduct } from '../../../redux/slice/product/ThunkProduct/product';
import styled from 'styled-components';
import { MyContext } from '../../../context';
import { useAppDispatch } from '../../../hook';
import { Button } from 'antd';
import renderInput from '../../../hook/form';
declare var Promise: any;
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
  const { register, handleSubmit, control } = useForm();

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
    formdata.append('dailyMotionServer', data.dailyMotionServer);
    dispatch(addProduct(formdata));
    console.log(data);
    if (isError) {
      toast.error('thất bại');
    }
    toast.success('thành công');
  }

 
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-3">
          {renderInput('name', 'Product name', control)}
        </div>
        <div className="mb-3">
          {renderInput('view', 'View', control)}
        </div>
        <div className="mb-3">
          {renderInput('seri', 'Seri', control)}
        </div>
        <div className="mb-3">
          {renderInput('descriptions', 'Desciption', control)}
        </div>
        <div className="mb-3">
          {renderInput('copyright', 'Copyright', control)}
        </div>
        <div className="mb-3">
          {renderInput('LinkCopyright', 'LinkCopyright', control)}
        </div>
        <div className="mb-3">
          <label className="form-label">Video Url</label>
          <input type="file" name='file' {...register('file')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" name='image' {...register('image')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div className="mb-3">
          {renderInput('dailyMotionServer', 'DailyMotionServer', control)}
        </div>
        <div className="mb-3">
          {renderInput('trailer', 'Trailer Video', control)}
        </div>
        <div className="mb-3">
          {renderInput('year', 'Year', control)}
        </div>
        <div className="mb-3">
          {renderInput('country', 'Country', control)}
        </div>
        <div className="mb-3">
          {renderInput('options', 'Options', control)}
        </div>
        {/** Thể loại của phim tập*/}
        <div className="form-label">Category</div>
        <select className="form-select-sm mb-4" {...register('category')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của phim tập</option>
          {state.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </select>
        <br />
        {/** Thể loại của phim lẻ phim bộ 1 tập */}
        <div className="form-label">Thể loại của phim lẻ</div>
        <select className="form-select-sm mb-4" {...register('typeId')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của phim lẻ phim bộ 1 tập</option>
          {seri.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </select>
        <br />
        {/** Thể loại của danh mục thể loại gồm các danh mục con */}
        <div className="form-label">Thể loại của danh mục thể loại gồm các danh mục con</div>
        <select className="form-select-sm mb-4" {...register('categorymain')} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
          <option value={''} >Thể loại của danh mục thể loại gồm các danh mục con</option>
          {categorymain.map((item, index) => {
            return <option value={item._id} key={index}>{item.name}</option>
          })}
        </select>
        <br />
        <div className='mt-2'>
          <Button htmlType='submit' className="btn btn-primary">Submit</Button>
        </div>
      </form>

      
    </div>
  )
}

export default ProductAdd