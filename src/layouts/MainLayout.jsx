import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../shared/LOader";

const MainLayout = () => {
  const {loading} = useAuth()
  if(loading) return <Loader/>
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
