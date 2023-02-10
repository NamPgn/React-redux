import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, } from "react-router-dom";
import CategoryProduct from '../../components/CategoryProduct';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
const HomePage = () => {

  return (
    <div>
      <main >
        <div>
          <Header />
        </div>
        <div className="container">
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