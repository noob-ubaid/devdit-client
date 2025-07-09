import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/LOader";
const MyProfile = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
         setRole(data)
         setLoading(false)
      });
  }, [user]);
  if(loading) return <Loader/>
  return (
    <div>
      <div className="flex items-center justify-between mt-6 md:mt-0 bg-base-200 p-4 md:p-6 rounded-md">
        <div className="flex items-center gap-4">
          <img
            className="size-14 md:size-16 rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <div>
            <p className="text-xl font-bold ">{user?.displayName}</p>
            <p className="text-lg font-semibold">{user?.email}</p>
          </div>
        </div>
        <div>
          <button className="bg-main font-medium px-3 py-1 rounded-full text-white">
            {role?.role === "user" ? "Bronze" : "Gold"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
