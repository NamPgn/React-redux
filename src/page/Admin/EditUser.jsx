import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editUser, getUser_id } from '../../slice/userSlice';


const EditUser = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispath = useDispatch();
  const { id } = useParams();
  const [user, setstate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getDataUser = async () => {
      const { payload } = await dispath(getUser_id(id));
      reset(payload);
      setstate(payload);
    }
    getDataUser();
  }, [])
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    console.log("1")

    dispath(editUser(formData));
    console.log("data", data.image[0]);
    // navigate("/admin/users");
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">User name</label>
          <input type="text" {...register('username', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email"  {...register('email', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password"  {...register('password', { required: true })} className="form-control" />
        </div>
        <div>Image</div>
        {/* <input type="text" {...register('image', { required: true })} className="form-control" /> */}
        <img src={user ? user.image : ""} style={{ width: "200px", height: "200px", objectFit: "cover" }} class="img-radius" alt="User-Profile-Image" />
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" {...register('image')} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default EditUser
