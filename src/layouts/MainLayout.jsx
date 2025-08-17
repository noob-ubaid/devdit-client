import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../shared/Loader";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const { loading } = useAuth();
  if (loading) return <Loader />;
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      <div className="max-w-[1500px] mx-auto px-4 2xl:px-0">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
