import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Teamplates/Footer'
import Header from '../../components/Teamplates/Header'
import SideBar from '../../components/SideBar'
const AuthComponent = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <SideBar />
      <Footer />
    </main>
  )
}

export default AuthComponent