import React, { useState, useRef, useEffect } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import Logo from "../../shared/Logo";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [profile, setProfile] = useState(false);
  const dropdownRef = useRef();
console.log(user)
  const signOut = () => {
    logOut()
      .then(() => toast.success("Successfully logged out"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="max-w-[1500px] flex items-center justify-between mx-auto relative">
        <div className="flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="hidden lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
          {links}
        </div>

        <div className="flex items-center gap-1 md:gap-3 relative">
          <IoNotificationsCircleOutline size={52} />
          {user ? (
            <div ref={dropdownRef}>
              <img
                onClick={() => setProfile(!profile)}
                className="size-11 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="profile"
              />
              <AnimatePresence>
                {profile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.24 }}
                    className="absolute right-0 mt-2 space-y-2 bg-white dark:bg-gray-900 dark:text-white rounded-md shadow-lg w-48 p-4 z-50"
                  >
                    <p className="font-medium flex items-center gap-2 mb-2 text-center">
                      {" "}
                      <FaUserAlt /> {user.displayName}
                    </p>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 font-medium hover:text-black duration-300 text-center rounded"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full px-4 py-2 bg-main duration-300 text-center rounded"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-main font-second font-medium text-white"
            >
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
