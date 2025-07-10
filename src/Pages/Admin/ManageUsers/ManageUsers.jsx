import React, { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import Loader from "../../../shared/LOader";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [search]);
  return (
    <div className="">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
        Manage Users
      </h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by username"
          className="input input-bordered w-full focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base">
            <tr className="text-center">
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="text-center">
                <td>{idx + 1}</td>
                <td className=" font-medium font-main text-base md:text-lg ">
                  {user.name}
                </td>
                <td className=" font-medium font-main text-base md:text-lg">
                  {user.email}
                </td>
                <td>
                  {user.role === "user" ? (
                    <span className="font-medium px-3 py-1 rounded-full font-main bg-blue-100 text-blue-800">
                      Free
                    </span>
                  ) : (
                    <span className="font-medium font-main px-3 py-1 rounded-full text-white bg-main">
                      Premium
                    </span>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-info">Admin</span>
                  ) : (
                    <button className="bg-main px-3 py-1 font-medium font-main rounded-full mx-auto text-white flex items-center gap-2">
                      <span className="hidden md:block"><FaUserShield /></span> Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
