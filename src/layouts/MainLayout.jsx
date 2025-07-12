import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../shared/Loader";

const MainLayout = () => {
  const { loading } = useAuth();
  if (loading) return <Loader />;
  return (
    <>
      <Navbar />
      <div className="max-w-[1500px] mx-auto px-4 2xl:px-0">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
