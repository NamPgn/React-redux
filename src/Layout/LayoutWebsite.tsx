import React, { useContext } from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Teamplates/Header';
import Footer from '../components/Teamplates/Footer';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Main from '.';
import { ChangeContext } from '../context';
const DivstyledConfigLayout = styled.div`
  display:flex;
`;

const Divstyled = styled.div``;
const LayoutWebsite = () => {
  const { state } = useContext(ChangeContext) || {};
  return (
    <Main className='text-start'>
      <Divstyled>
        <Header />
      </Divstyled>
      <DivstyledConfigLayout className="containers" >
        <div className={state ? 'w-1/12' : 'w-2/12'} >
          <SideBar />
        </div>
        <div className={`${state ? "w-11/12" : "w-10/12"} p-2`}>
          <Outlet />
        </div>
      </DivstyledConfigLayout>
      <Divstyled>
        <Footer />
      </Divstyled>
    </Main>
  )
}

export default LayoutWebsite;