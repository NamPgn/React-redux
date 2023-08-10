import React, { useContext } from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Teamplates/Header';
import Footer from '../components/Teamplates/Footer';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import { MainContent } from './style';
import { MyContext } from '../context';
const DivstyledConfigLayout = styled.div`
  display:flex;
`;

const Divstyled = styled.div``;
const LayoutWebsite = () => {
  const { background } = useContext(MyContext);
  return (
    <MainContent background={background && (background.data.url) } className='text-start'>
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
    </MainContent>
  )
}

export default LayoutWebsite;