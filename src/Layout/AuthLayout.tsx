import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Teamplates/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Teamplates/Footer";
import Main from ".";
import { ChangeContext } from "../context";
const AuthComponent = () => {
  const { state } = useContext(ChangeContext) || {};
  return (
    <Main className="text-start">
      <Header />
      <div className="flex">
        <div className={state ? "w-1/12" : "w-2/12"}>
          <SideBar />
        </div>
        <div className={`${state ? "w-11/12" : "w-10/12"} p-2`}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </Main>
  );
};

export default AuthComponent;
