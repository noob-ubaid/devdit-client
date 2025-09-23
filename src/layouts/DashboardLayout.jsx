import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaUser } from "react-icons/fa";
import {
  MdAddCircleOutline,
  MdOutlineArticle,
  MdError,
  MdManageAccounts,
  MdDarkMode,
} from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import Logo from "../shared/Logo";
import Loader from "../shared/Loader";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { useDarkMode } from "../contexts/ThemeContext";
import { CiLight } from "react-icons/ci";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { darkMode, setDarkMode } = useDarkMode();
  const [role, isPending] = useRole();
  if (isPending) return <Loader />;

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar for mobile */}
          <div className="navbar bg-base-300 w-full lg:hidden">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>

          {/* Page content */}
          <div className="md:p-8 bg-white dark:bg-black min-h-screen p-4">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-main flex flex-col justify-between min-h-full w-80 p-4 pt-10">
            <div>
              <Link to="/">
                <Logo footer={true} />
              </Link>

              <li className="mt-6 flex flex-col gap-2">
                {(role === "user" || role === "member") && (
                  <>
                    <NavLink
                      to="/dashboard/myProfile"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <FaUser className="inline-block" />
                      My Profile
                    </NavLink>

                    <NavLink
                      to="/dashboard/addPost"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <MdAddCircleOutline className="inline-block" />
                      Add Post
                    </NavLink>

                    <NavLink
                      to="/dashboard/myPost"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <MdOutlineArticle className="inline-block" />
                      My Posts
                    </NavLink>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <NavLink
                      to="/dashboard/myProfile"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <FaUser className="inline-block" />
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/dashboard/adminProfile"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <FaUser className="inline-block" />
                      Admin Profile
                    </NavLink>

                    <NavLink
                      to="/dashboard/manageUsers"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <MdManageAccounts className="inline-block" />
                      Manage Users
                    </NavLink>
                    <NavLink
                      to="/dashboard/reports"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <MdError className="inline-block" />
                      Reported Activities
                    </NavLink>

                    <NavLink
                      to="/dashboard/announcement"
                      className={({ isActive }) =>
                        `flex items-center font-medium text-lg gap-3 px-3 py-2 font-main rounded transition-colors ${
                          isActive ? "bg-base-200 text-main" : "text-white"
                        }`
                      }
                    >
                      <GrAnnounce className="inline-block" />
                      Make Announcement
                    </NavLink>
                  </>
                )}
              </li>
            </div>
            <div className="flex items-center justify-between pb-6">
              <div className="flex items-center gap-2">
                <img className="size-10 md:size-11 rounded-full bg-center object-cover" src={user.photoURL} alt="" />
                <p className="font-medium text-white text-2xl">
                  {user.displayName}
                </p>
              </div>
              <button className="end" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? (
                  <CiLight size={42} className=" text-white " />
                ) : (
                  <MdDarkMode size={42} className=" text-black " />
                )}
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
