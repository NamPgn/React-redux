import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../../components/Page/Footer';
import Header from '../../components/Page/Header';
const HomePage = () => {

  return (
    <div>
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
    </div>
  )
}

export default HomePage;