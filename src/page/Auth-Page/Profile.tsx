import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthentication } from '../../auth/getToken';
import { logout } from '../../redux/slice/userSlice';
import { user$ } from '../../redux/selectors';
import styled from 'styled-components';
import { useAppDispatch } from '../../hook';
import { message } from 'antd';
// import { UserAuth } from '../../context';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const PStyled = styled.p``;
const Profile = () => {
  // const { user, logOut } = UserAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  }, [])
  const Auth = isAuthentication();
  const handleLogOut = async () => {
    dispatch(logout());
    message.success('Logout successfuly!')
    navigate('/');
  }
  if (Auth) {
    return <Divstyled className="page-content page-container" id="page-content" >
      <Divstyled className="">
        <Divstyled className="vh-100">
          <Divstyled className="containers py-5 h-100">
            <Divstyled className="row d-flex justify-content-center align-items-center h-100">
              <Divstyled className="col-md-12 col-xl-4">
                <Divstyled className="card" style={{ borderRadius: "15px" }}>
                  <Divstyled className="card-body text-center">
                    <Divstyled className="mt-3 mb-4 d-flex justify-content-center">
                      <img
                        className=" img-fluid" style={{ width: "100px", borderRadius: '5px' }} />
                    </Divstyled>
                    <h4 className="mb-2 text-light">{Auth ? Auth.user.username : ''}</h4>
                    <Divstyled className="mb-4 pb-2">
                      <BtnStyled type="button" className="btn btn-outline-primary btn-floating">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </BtnStyled>
                      <BtnStyled type="button" className="btn btn-outline-primary btn-floating">
                        <i className="fab fa-twitter fa-lg"></i>
                      </BtnStyled>
                      <BtnStyled type="button" className="btn btn-outline-primary btn-floating">
                        <i className="fab fa-skype fa-lg"></i>
                      </BtnStyled>
                    </Divstyled>
                    <BtnStyled onClick={() => handleLogOut()} type="button" className="btn btn-primary btn-rounded btn-lg">
                      Logout
                    </BtnStyled>
                    <Divstyled className="d-flex justify-content-between text-center mt-5 mb-2">
                      <Divstyled>
                        <PStyled className="text-muted mb-0">Wallets Balance</PStyled>
                      </Divstyled>
                      <Divstyled className="px-3">
                        <PStyled className="text-muted mb-0">{'Bạn không phải là admin'}</PStyled>
                      </Divstyled>
                      <Divstyled>
                        <PStyled className="text-muted mb-0">Total Transactions</PStyled>
                      </Divstyled>
                    </Divstyled>
                  </Divstyled>
                </Divstyled>
              </Divstyled>
            </Divstyled>
          </Divstyled>
        </Divstyled>
      </Divstyled>
    </Divstyled>
  } else {
    return <Divstyled className='text-light text-center vh-100' style={{ paddingTop: "200px" }}  ><Link to={"/auth/signin"}>Đăng nhập</Link></Divstyled>
  }


}

export default Profile
