import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../../components/Teamplates/Header';
import Footer from '../../components/Teamplates/Footer';
const HomePage = () => {

  return (
    <main >
      <div>
        <Header />
      </div>
      <div className="container" >
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  )
}

export default HomePage;