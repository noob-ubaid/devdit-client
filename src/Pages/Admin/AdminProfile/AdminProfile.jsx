import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Loader from "../../../shared/Loader";

const AdminProfile = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));

    fetch(`${import.meta.env.VITE_API_URL}/announcement`)
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <Loader />;
  return (
    <div>
      <div className="flex items-center flex-col md:flex-row justify-between mt-6 md:mt-0 bg-base-200 p-2 md:p-6 rounded-md">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <img
            className="size-12 md:size-16 rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <div>
            <p className="text-xl font-main text-center md:text-left md:font-bold font-medium ">
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
      {/* pie chart  */}

      <div className="flex items-center justify-center w-full max-w-[500px] mx-auto">
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Pie
              data={[
                { name: "number of users", uv: users.length },
                { name: "number of posts", uv: posts.length },
                { name: "number of comments", uv: announcements.length },
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
