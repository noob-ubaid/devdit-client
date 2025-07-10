import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/LOader";
import PostCard from "./PostCard";
import { Link } from "react-router";
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
        {posts.length === 0 ? (
          <div className="bg-[rgba(15,15,15,0.05)] w-full py-16 md:mb-28 text-center px-4 md:px-0 mt-6 md:mt-10 rounded-md">
            <h4 className="font-semibold font-main text-2xl md:text-3xl text-[#141414]">
              You haven’t added any posts yet
            </h4>
            <p className="mt-4 font-second max-w-2xl text-center mx-auto text-[#141414B3]">
              Start building your presence by adding your first post, sharing
              your ideas with others, and growing your knowledge within the
              community.{" "}
            </p>
            <div className="mt-10">
              <Link
                to="/dashboard/addPost"
                className="bg-main mt-6 text-white font-second font-medium px-8 py-3 rounded-full"
              >
                Add Post
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium font-main mt-10 md:mt-14">
              My Recent posts
            </h2>
            <div className="grid grid-cols-1 mt-8 md:mt-12 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
