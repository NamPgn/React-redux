import React from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { MyButton } from '../../../components/Button';
import { setBackground } from '../../../api/trailer';
const EditBackground = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const { id } = useParams();
  const onsubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('_id', id);
    const res = await setBackground(formData)
    if (res.data.success) {
      toast.success('edit successfully');
    } else {
      toast.error('edit failed');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input {...register('file')} type="file" className="text-[#000] underline text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
        />
        <MyButton htmlType='submit' className="btn btn-primary mt-2">Submit</MyButton>
      </form>
    </div>
  )
}

export default EditBackground