import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Teamplates/Footer'
import Header from '../Teamplates/Header'
const AuthComponent = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}

export default AuthComponent