import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/Loader";
import { Link } from "react-router";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const AllPosts = () => {
  const {
    data = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await axiosSecure("/posts");
      return res.data;
    },
  });
  if (isPending) return <Loader />;
  if (isError) return <p>Something went wrong : {error.message}</p>;
  return (
    <div>
      <h1 className="text-center text-2xl font-main md:text-3xl lg:text-4xl font-semibold mt-8 md:mt-12">
        All Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-6 md:my-10 lg:grid-cols-3 gap-6 md:gap-10">
        {data.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <div className="rounded bg-gray-100 p-4">
              <div className="flex items-center border-b border-gray-400 pb-4  justify-between ">
                <div className="flex items-center gap-2 md:gap-3">
                  <p className="md:text-xl text-lg font-main md:font-bold font-semibold">
                    {post.date}
                  </p>
                </div>
                <p className="bg-blue-200 px-3 py-1 rounded-full text-blue-800 font-main font-semibold ">
                  {post.tag}
                </p>
              </div>
              <div className="border-b border-gray-400 pb-4">
                <p className="text-xl font-medium font-main my-2 md:text-2xl">
                  {post.title}
                </p>
                <p className="font-second h-[140px] text-gray-700">
                  {post.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3 gap-5">
                <Link className="flex-1 text-center py-2 px-4 bg-white rounded-full text-black font-medium">
                  View Comments
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-black">
                    <AiFillLike size={22} />
                    <p className="font-medium">{post.UpVote}</p>
                  </div>
                  |
                  <div className="flex items-center gap-2 text-black">
                    <AiFillDislike size={22} />
                    <p className="font-medium">{post.DownVote}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
