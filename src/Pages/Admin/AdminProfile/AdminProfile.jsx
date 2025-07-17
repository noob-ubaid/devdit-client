import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Loader from "../../../shared/Loader";
import AddTag from "./AddTag";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = useAuth();

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });

  const { data: posts = [], isLoading: isPostsLoading } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts");
      return res.data;
    },
  });

  const { data: allComments = [], isLoading: isAnnouncementsLoading } =
    useQuery({
      queryKey: ["allComments"],
      queryFn: async () => {
        const res = await axiosSecure.get("/allComments");
        return res.data;
      },
    });

  if (isUsersLoading || isPostsLoading || isAnnouncementsLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Profile Section */}
      <div className="flex items-center flex-col md:flex-row justify-between mt-6 md:mt-0 bg-base-200 p-4 md:p-6 rounded-md">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <img
            className="size-12 md:size-16 rounded-full"
            src={user?.photoURL}
            alt={user?.displayName || "Admin"}
          />
          <div>
            <p className="text-xl font-main text-center md:text-left md:font-bold font-medium">
              {user?.displayName}
            </p>
            <p className="text-lg font-main text-center md:text-left font-medium md:font-semibold">
              {user?.email}
            </p>
          </div>
        </div>
        <div>
          <button className="bg-main font-medium mt-3 md:mt-0 font-second px-3 py-1 rounded-full text-white">
            Admin
          </button>
        </div>
      </div>

      {/* Add Tag */}
      <div>
        <AddTag />
      </div>

      {/* Pie Chart */}
      <div className="flex items-center justify-center w-full max-w-[480px] mx-auto mt-10">
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Pie
              data={[
                { name: "Number of users", uv: users.length },
                { name: "Number of posts", uv: posts.length },
                { name: "Number of comments", uv: allComments.length },
              ]}
              dataKey="uv"
              fill="#3D74B6"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminProfile;
