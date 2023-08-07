import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Teamplates/Header';
import Footer from '../components/Teamplates/Footer';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
const DivstyledConfigLayout = styled.div`
  display:flex;
`;

const Divstyled = styled.div``;
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 4000,
};
const LayoutWebsite = () => {

  return (
    <main className='text-start'>
      <Divstyled>
        <Header />
      </Divstyled>
      <DivstyledConfigLayout className="containers" >
        <SideBar />
        <Outlet />
      </DivstyledConfigLayout>
      <Divstyled>
        <Footer />
      </Divstyled>
    </main>
  )
}

export default LayoutWebsite;