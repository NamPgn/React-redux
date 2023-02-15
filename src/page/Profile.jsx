import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthentication } from '../auth/getToken';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { editImage, getUser_id, logout } from '../redux/slice/userSlice';
import { toast } from 'react-toastify';
import { user$ } from '../redux/selectors';
const Profile = () => {
  const { data } = isAuthentication();
  const { handleSubmit, register } = useForm();
  const dispath = useDispatch();
  const user = useSelector(user$);
  const navigate = useNavigate();
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

  const handleLogOut = () => {
    dispath(logout());
    navigate('/');
  }
  return (
    <>
      {data ? <div className="page-content page-container" id="page-content" style={{ margin: "20px" }}>
        {user ? <div className="">
          <section className="vh-100">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-4">
                  <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body text-center">
                      <div className="mt-3 mb-4">
                        <img src={data.user.image}
                          className=" img-fluid" style={{ width: "100px" }} />
                      </div>
                      <h4 className="mb-2 text-light">{data.user.username}</h4>
                      <p className="text-muted mb-4">@Programmer <span className="mx-2">|</span> <a
                        href="#!">mdbootstrap.com</a></p>
                      <div className="mb-4 pb-2">
                        <button type="button" className="btn btn-outline-primary btn-floating">
                          <i className="fab fa-facebook-f fa-lg"></i>
                        </button>
                        <button type="button" className="btn btn-outline-primary btn-floating">
                          <i className="fab fa-twitter fa-lg"></i>
                        </button>
                        <button type="button" className="btn btn-outline-primary btn-floating">
                          <i className="fab fa-skype fa-lg"></i>
                        </button>
                      </div>
                      <button onClick={() => handleLogOut()} type="button" className="btn btn-primary btn-rounded btn-lg">
                        Logout
                      </button>
                      <div className="d-flex justify-content-between text-center mt-5 mb-2">
                        <div>
                          <p className="mb-2 h5">8471</p>
                          <p className="text-muted mb-0">Wallets Balance</p>
                        </div>
                        <div className="px-3">
                          <p className="mb-2 h5">8512</p>
                          <p className="text-muted mb-0">{data.user.role == 0 ? "Bạn đéo phải Admin" : "Bạn là Admin"}</p>
                        </div>
                        <div>
                          <p className="mb-2 h5">4751</p>
                          <p className="text-muted mb-0">Total Transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div> : ""}
      </div> : <div className='text-light container text-center' ><Link to={"/auth/signin"}>Đăng nhập</Link></div>
      }
    </>
  )
}

export default Profile
