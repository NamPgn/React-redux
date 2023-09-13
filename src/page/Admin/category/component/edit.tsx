import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { getCateSlice, updateCatgorySlice } from '../../../../redux/slice/category/ThunkCategory/category';
import { toast } from 'react-toastify';
import { getCategory } from '../../../../api/category';
import { useAppDispatch } from '../../../../hook';
import { MyButton } from '../../../../components/MV/Button';
import RenderInput, { MyUploadWrapper } from '../../../../components/Form/component';
import MVImage from '../../../../components/MV/Image';
declare var Promise: any;
const EditCategory = () => {
  const dispatch = useAppDispatch();
  const [state, setState]: any = useState({});
  const { reset, handleSubmit, control } = useForm();
  const { id } = useParams();
  const onsubmit = (data: any) => {
    if (data) {
      toast.success('Edit successfully')
      dispatch(updateCatgorySlice(data))
    } else {
      toast.error('Edit failure')
    }
  }
  useEffect(() => {
    dispatch(getCateSlice(id));
    const data = async (): Promise<any> => {
      const { data }: any = await getCategory(id);
      reset(data);
      setState(data);
    }
    data();
  }, []);
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <RenderInput
        name={'name'}
        label={'Category name'}
        control={control}
        rules={undefined}
      />
      <RenderInput
        name={'des'}
        label={'Category des'}
        control={control}
        rules={undefined}
      />
      <RenderInput
        name={'up'}
        label={'Set'}
        control={control}
        rules={undefined}
      />
      <MVImage width={200} src={state && (state.linkImg)} alt="" />
      <RenderInput
        name={'linkImg'}
        label={'Image'}
        control={control}
        rules={undefined}
      />
      <MyUploadWrapper
        name={'file'}
        label={'Image'}
        control={control}
      />
      <MyButton htmlType='submit' className="btn btn-primary">Click</MyButton>
    </form>
  )
}

export default EditCategory
