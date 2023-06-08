import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../../components/Teamplates/Header';
import Footer from '../../components/Teamplates/Footer';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';
const DivstyledConfigLayout = styled.div`
  display:flex;
`;

const Divstyled = styled.div``;

const HomePage = () => {
  return (
    <main >
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

export default HomePage;