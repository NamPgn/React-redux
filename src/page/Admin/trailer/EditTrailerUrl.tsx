import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { getTrailerUrl } from '../../../api/trailer';
import { toast } from 'react-toastify';
import { editTrailerSlice } from '../../../redux/slice/postSlice';
import { useAppDispatch } from '../../../hook';
import { Button } from 'antd';
import renderInput from '../../../hook/form';
declare var Promise: any;

const editTrailerUrl = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const dispath = useAppDispatch();
  useEffect(() => {
    const getData = async (): Promise<any> => {
      const { data } = await getTrailerUrl();
      reset(data);
    }
    getData();
  }, []);
  const onsubmit = (data: any) => {
    if (data) {
      toast.success('edit successfully');
      dispath(editTrailerSlice(data));
      // navigete('/admin/trailing');
    } else {
      toast.error('edit failed');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        {renderInput('url', 'Trailer', control, { required: true })}
        <Button htmlType='submit' className="btn btn-primary mt-2">Submit</Button>
      </form>
    </div>
  )
}

export default editTrailerUrl
