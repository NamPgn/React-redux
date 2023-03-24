import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Page/Footer'
import Header from './Page/Header'
const AuthComponent = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AuthComponent