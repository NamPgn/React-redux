import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, } from "react-router-dom";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Cate } from '../../main';
const HomePage = () => {
  
  return (
    <div>
      <main class="flex-shrink-0" style={{ background: "#333" }}>
        <div>
          <Header />
        </div>
        <Outlet />
        <div>
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default HomePage;