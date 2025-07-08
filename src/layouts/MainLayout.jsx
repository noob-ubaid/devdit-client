import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[1500px] mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
