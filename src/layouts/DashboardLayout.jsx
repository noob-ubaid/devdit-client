import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaUser } from "react-icons/fa";
import { MdAddCircleOutline, MdOutlineArticle, MdManageAccounts } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import Logo from "../shared/Logo";
import Loader from "../shared/Loader";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
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
          <div className="md:p-8 p-4">
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

          <ul className="menu bg-main min-h-full w-80 p-4 pt-10">
            <Link to="/">
              <Logo footer={true} />
            </Link>

            <li className="mt-6 flex flex-col gap-2">
              {(role === "user" || role === "premium") && (
                <>
                  <NavLink
                    to="/dashboard/myProfile" // ✅ Updated path for highlight
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
