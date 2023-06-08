import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Divstyled = styled.div``;
const SpanStyled = styled.span``;
const Psyled = styled.p``;
const BtnStyled = styled.button``;
const ContactAdmin = () => {
  
  return (
    <Divstyled className='admin_contact'>
      <Divstyled className="network d-flex justify-content-center" style={{ color: "#fff" }}>
        <Divstyled className="col-xl-8 col-sm-8 ">
          <Divstyled className="card ">
            <Divstyled className="card-body">
              <Divstyled className="img_contact ">
                <Divstyled className='d-flex justify-content-center'><img src="https://i.pinimg.com/564x/60/36/41/6036415c3560662af8404a82676baa09.jpg" alt="" className="avatar-md rounded-circle img-thumbnail" /></Divstyled>
                <Divstyled className="flex-1 ">
                  <h5 className="font-size-16 mb-1 mt-1"><Link to="#" className="text-light">Admin Contact</Link></h5>
                  <SpanStyled className="badge badge-soft-success mb-0">Web Developer</SpanStyled>
                </Divstyled>
              </Divstyled>
              <Divstyled className="mt-3 pt-1 iconContact">
                <Psyled className="mb-0">
                  <i className="fa-brands fa-facebook "></i>
                  <Link to="https://www.facebook.com/profile.php?id=100040511214253">Facebook</Link>
                </Psyled>
                <Psyled className="mb-0 mt-2">
                  <i className="fa-regular fa-user"></i>
                  <Link to="https://www.tiktok.com/@tieu_loli">Tiktok</Link>
                </Psyled>
                <Psyled className="mb-0 mt-2">
                  <i className="fa-brands fa-youtube"></i>
                  <Link to="https://www.youtube.com/channel/UCMRhIr6pa_Xs7MEPAquDBQQ">Youtube</Link>
                </Psyled>
              </Divstyled>
            </Divstyled>
          </Divstyled>
        </Divstyled>
      </Divstyled>
    </Divstyled>
  )
}

export default ContactAdmin