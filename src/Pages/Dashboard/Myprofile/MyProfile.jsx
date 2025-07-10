import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/LOader";
import PostCard from "./PostCard";
const MyProfile = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data);
        setLoading(false);
      });
  }, [user]);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/profile/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [user]);
  if (loading) return <Loader />;
  return (
    <div>
      <div className="flex items-center flex-col md:flex-row justify-between mt-6 md:mt-0 bg-base-200 p-2 md:p-6 rounded-md">
        <div className="flex items-center gap-2 md:gap-4">
          <img
            className="size-14 md:size-16 rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <div>
            <p className="text-xl font-main md:font-bold font-semibold ">
              {user?.displayName}
            </p>
            <p className="text-lg font-main font-medium md:font-semibold">
              {user?.email}
            </p>
          </div>
        </div>
        <div>
          <button className="bg-main font-medium mt-3 md:mt-0 font-second px-3 py-1 rounded-full text-white">
            {role?.role === "user" ? "Bronze" : "Gold"}
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium font-main mt-10 md:mt-14">
          My Recent posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-center mt-6 text-gray-500">
            You haven't added any posts yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 mt-8 md:mt-12 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
