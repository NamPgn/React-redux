import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthentication } from '../auth/getToken';
import { useDispatch, useSelector } from 'react-redux';
import { getUser_id, logout } from '../redux/slice/userSlice';
import { user$ } from '../redux/selectors';
import jwtDecode from 'jwt-decode';
const Profile = () => {
  const data = isAuthentication();
  const dispath = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  }, [])
  const handleLogOut = () => {
    dispath(logout());
    navigate('/');
  }
  try {
    const decode = jwtDecode(data?.token);
    return <div className="page-content page-container" id="page-content" style={{ margin: "20px" }}>
      <div className="">
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-12 col-xl-4">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body text-center">
                    <div className="mt-3 mb-4 d-flex justify-content-center">
                      <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwEgAHtFlzbKxbhus9ocoNE_ox89K_eTPkLBPdOPPyw&s'}
                        className=" img-fluid" style={{ width: "100px",borderRadius:'5px' }} />
                    </div>
                    <h4 className="mb-2 text-light">{decode.username}</h4>
                    <p className="text-muted ">@Programmer <span className="mx-2">|</span> <a
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
                        <p className="text-muted mb-0">{decode.role == 0 ? "Bạn đéo phải Admin" : "Bạn là Admin"}</p>
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
      </div>
    </div>
  } catch (error) {
    return <div className='text-light container text-center' ><Link to={"/auth/signin"}>Đăng nhập</Link></div>
  }

}

export default Profile
