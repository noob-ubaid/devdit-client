import React from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import Logo from "../../shared/Logo";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  const links = (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <NavLink to="/" className={`text-xl font-second font-medium`}>
        Home
      </NavLink>
      <NavLink to="/membership" className={`text-xl font-second font-medium`}>
        Membership
      </NavLink>
    </div>
  );
  return (
    <div className="sticky top-0 bg-main/20 backdrop-blur-2xl z-50 py-4 px-3 md:px-4 overflow-visible">
      <div className="max-w-[1500px] flex items-center justify-between mx-auto">
        <div className="flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost  lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm bg- dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="hidden lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
        {links}
      </div>

      <div className="flex items-center gap-1 md:gap-5">
        <IoNotificationsCircleOutline size={40}/>
        <Link to="/login" className="px-4 py-2 rounded-md bg-main font-second font-medium text-white">Join Us</Link>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
