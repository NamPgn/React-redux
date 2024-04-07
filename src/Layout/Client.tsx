import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Teamplates/Header";
import Footer from "../components/Teamplates/Footer";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import Main from ".";
import { ChangeContext } from "../context";


const LayoutWebsite = () => {
  const { state } = useContext(ChangeContext) || {};
  return (
    <Main className="text-start">
      <div>
        <Header />
      </div>
      <div className="containers flex">
        <div className={state ? "w-1/12" : "w-2/12"}>
          <SideBar />
        </div>
        <div className={`${state ? "w-11/12" : "w-10/12"} p-2`}>
          <Outlet />
        </div>
      </div>
      
      <div>
        <Footer />
      </div>
    </Main>
  );
};

export default LayoutWebsite;
