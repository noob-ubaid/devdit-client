import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/makeAdmin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "User has been made admin.", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Mutation for cancelling admin
  const cancelAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/cancelAdmin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Admin rights removed.", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(id);
      }
    });
  };

  const handleCancelAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAdminMutation.mutate(id);
      }
    });
  };


  return (
    <div>
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
                <td className="font-medium font-main text-base md:text-lg">
                  {user.name}
                </td>
                <td className="font-medium font-main text-base md:text-lg">
                  {user.email}
                </td>
                <td>
                  {user.role === "user" && (
                    <span className="font-medium px-3 py-1 rounded-full font-main bg-blue-200 text-blue-800">
                      Free
                    </span>
                  )}
                  {user.role === "premium" && (
                    <span className="font-medium px-3 py-1 rounded-full font-main bg-yellow-200 text-yellow-700">
                      Premium
                    </span>
                  )}
                  {user.role === "admin" && (
                    <span className="font-medium px-3 py-1 rounded-full font-main bg-green-200 text-green-800">
                      Admin
                    </span>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleCancelAdmin(user._id)}
                      className="bg-red-500 cursor-pointer px-3 py-1 font-medium font-main rounded-full mx-auto text-white flex items-center gap-2"
                    >
                      <span className="hidden md:block">
                        <FaUserShield />
                      </span>{" "}
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-main px-3 py-1 font-medium font-main rounded-full mx-auto text-white flex items-center gap-2"
                    >
                      <span className="hidden md:block">
                        <FaUserShield />
                      </span>{" "}
                      Make Admin
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
