import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthentication } from '../auth/getToken';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { editImage, getUser_id, selectUserValue } from '../slice/userSlice';
import { toast } from 'react-toastify';
const Profile = () => {
  const { data } = isAuthentication();
  const { handleSubmit, register } = useForm();
  const dispath = useDispatch();
  const user = useSelector(selectUserValue);
  console.log("user", user);
  const navigate=useNavigate();
  useEffect(() => {
    dispath(getUser_id(data ? data.user._id : ""));
  }, [])
  const onsubmit = (data) => {
    const formdata = new FormData();
    formdata.append('image', data.image[0]);
    console.log("dataEdit", data.image[0]);
    dispath(editImage(formdata));
    toast.success(`Cập nhật thành công`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <>
      {data ? <div class="page-content page-container" id="page-content" style={{margin:"20px"}}>
        {user ? <div class="">
          <div class="row container d-flex justify-content-center">
            <div class="col-md-12">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        <img src={user ? user.image : ""} style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "100%" }} class="img-radius" alt="User-Profile-Image" />
                        <form onSubmit={handleSubmit(onsubmit)}>
                          <div>onsubmit
                            <input style={{ cursor: "pointer" }} {...register('image')} type="file"
                              name="image"
                              accept="image/png, image/jpeg" />
                          </div>
                          <button className="btn btn-primary">Submit</button>
                        </form>
                      </div>
                      <h6 class="f-w-600">{user ? user.username : ""}</h6>
                      <p>Web Designer</p>
                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400">{user ? user.email : ""}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Phone</p>
                          <h6 class="text-muted f-w-400">98979989898</h6>
                        </div>
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Token</p>
                          <h6 class="text-muted f-w-400">{data.token}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Quyền</p>
                          <h6 class="text-muted f-w-400">{user.role == 0 ? "Bạn đéo phải Admin" : "Bạn là Admin"}</h6>
                        </div>
                      </div>
                      <ul class="social-link list-unstyled m-t-40 m-b-10">
                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> : ""}
      </div> : <Link to={"/signin"}>Đăng nhập</Link>}
    </>
  )
}

export default Profile
