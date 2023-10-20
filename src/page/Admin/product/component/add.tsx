import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { addProduct } from '../../../../redux/slice/product/thunkProduct/product';
import { MyContext } from '../../../../context';
import { useAppDispatch } from '../../../../hook';
import  { MySelectWrapper } from '../../../../components/Form/component';
import { MyButton } from '../../../../components/MV/Button';
import MVUpload from '../../../../components/MV/Upload';
import MVInput from '../../../../components/MV/Input';
const ProductAdd = () => {
  const { categorymain, category, seri }: any = useContext(MyContext);
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm();
  const categoryOptions = category && (category?.data.map((item, index) => ({
    label: item.name,
    value: item._id
  })));

  const categorymainOptions = categorymain && (categorymain?.map((item, index) => ({
    label: item.name,
    value: item._id
  })));

  const typeOptions = seri && (seri?.map((item, index) => ({
    label: item.name,
    value: item._id
  })));
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('options', data.options);
    formdata.append('category', data.category);
    // formdata.append('file', data.file[0]);
    formdata.append('seri', data.seri);
    formdata.append('LinkCopyright', data.LinkCopyright);
    formdata.append('copyright', data.copyright)
    formdata.append('descriptions', data.descriptions);
    formdata.append('trailer', data.trailer);
    formdata.append('image', data.image);
    formdata.append('year', data.year);
    formdata.append('country', data.country);
    formdata.append('typeId', data.typeId);
    formdata.append('categorymain', data.categorymain);
    formdata.append('dailyMotionServer', data.dailyMotionServer);
    formdata.append('imageLink', data.imageLink);
    formdata.append('video2', data.video2);
    const res = await dispatch(addProduct(formdata));
    if (res) {
      toast.success('Add product successfully');
    } else {
      toast.error('Add product failed');
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <MVInput
          name={'name'}
          label={'Product name'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'view'}
          label={'View'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'seri'}
          label={'Seri'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'descriptions'}
          label={'Desciption'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'copyright'}
          label={'Copyright'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'LinkCopyright'}
          label={'LinkCopyright'}
          control={control}
          rules={undefined}
        />
        {/* <MyUploadWrapper
          name={'file'}
          label={'New Video Upload'}
          control={control}
        /> */}
        <MVUpload
          name={'image'}
          label={'New Image Upload'}
          control={control}
        />
        {/* <label className="form-label">Video Url</label>
        <input type="file" name='file' {...register('file')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        <label className="form-label">Image</label>
        <input type="file" name='image' {...register('image')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" /> */}
        <MVInput
          name={'dailyMotionServer'}
          label={'DailyMotionServer'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'trailer'}
          label={'Trailer Video'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'year'}
          label={'Year'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'country'}
          label={'Country'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'options'}
          label={'Options'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'video2'}
          label={'Video Link'}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={'imageLink'}
          label={'Image Link'}
          control={control}
          rules={undefined}
        />
        {/** Thể loại của phim tập*/}
        <MySelectWrapper
          control={control}
          name='category'
          label={'Category'}
          placeholder={'category'}
          defaultValue={'category'}
          options={categoryOptions}
        />
        <br />
        {/** Thể loại của phim lẻ phim bộ 1 tập */}
        <MySelectWrapper
          name={'typeId'}
          label={'Thể loại của phim lẻ'}
          control={control}
          placeholder={'typeId'}
          defaultValue={'typeId'}
          options={typeOptions}
        />
        <br />
        {/** Thể loại của danh mục thể loại gồm các danh mục con */}
        <MySelectWrapper
          name={'categorymain'}
          label={'Thể loại của danh mục thể loại gồm các danh mục con'}
          control={control}
          placeholder={'categorymain'}
          defaultValue={'categorymain'}
          options={categorymainOptions}
        />
        <br />
        <div className='mt-2'>
          <MyButton htmlType='submit' className="btn btn-primary">Submit</MyButton>
        </div>
      </form>
    </div>
  )
}

export default ProductAdd