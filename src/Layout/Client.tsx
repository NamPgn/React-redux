import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Teamplates/Header";
import Footer from "../components/Teamplates/Footer";
import Main from ".";
import { MyContext } from "../context";

const LayoutWebsite = () => {
  return (
    <Main className="text-start">
      {/* <div className="containers flex">
        <div className={state ? "w-1/12" : "w-2/12"}>
          <SideBar />
        </div>
        <div className={`${state ? "w-11/12" : "w-10/12"} p-2`}>
        </div>
      </div> */}
      <Outlet />
    </Main>
  );
};

export default LayoutWebsite;
