import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { addProduct } from '../../../redux/slice/product/ThunkProduct/product';
import { MyContext } from '../../../context';
import { useAppDispatch } from '../../../hook';
import renderInput, { MySelectWrapper } from '../../../hook/form';
import { MyButton } from '../../../components/Button';
import MySelect from '../../../components/Select';
const ProductAdd = () => {
  const { categorymain, category, seri, isError }: any = useContext(MyContext);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control } = useForm();
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
    formdata.append('imageLink', data.imageLink);
    formdata.append('video2', data.link);
    dispatch(addProduct(formdata));
    if (isError) {
      toast.error('thất bại');
    }
    toast.success('thành công');
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        {renderInput('name', 'Product name', control)}

        {renderInput('view', 'View', control)}

        {renderInput('seri', 'Seri', control)}

        {renderInput('descriptions', 'Desciption', control)}

        {renderInput('copyright', 'Copyright', control)}

        {renderInput('LinkCopyright', 'LinkCopyright', control)}

        <label className="form-label">Video Url</label>
        <input type="file" name='file' {...register('file')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />

        <label className="form-label">Image</label>
        <input type="file" name='image' {...register('image')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />

        {renderInput('dailyMotionServer', 'DailyMotionServer', control)}

        {renderInput('trailer', 'Trailer Video', control)}

        {renderInput('year', 'Year', control)}
        {renderInput('country', 'Country', control)}
        {renderInput('options', 'Options', control)}

        {renderInput('video2', 'Video Link', control)}

        {renderInput('imageLink', 'Image Link', control)}
        {/** Thể loại của phim tập*/}
        <MySelectWrapper
          control={control}
          name='category'
          label={'Category'}
          placeholder={'category'}
          defaultValue={'category'}
          style={{ width: 300 }}
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
          style={{ width: 300 }}
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
          style={{ width: 300 }}
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