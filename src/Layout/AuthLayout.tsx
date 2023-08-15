import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Teamplates/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Teamplates/Footer';
import Main from '.';
const AuthComponent = () => {
  return (
    <Main className='text-start'>
      <Header />
      <div className='flex'>
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </Main>
  )
}

export default AuthComponent