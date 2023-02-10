import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
const AuthComponent = () => {
  return (
    <div>
      <Header/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default AuthComponent