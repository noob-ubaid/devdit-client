import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import Post from "../../Pages/Home/AllPosts/Post";

const AllPostsPage = () => {
  const [sortBy, setSortBy] = useState("asc");
  const { data: posts = [], isPending } = useQuery({
    queryKey: ["allPosts", sortBy],
    queryFn: async () => {
      const res = await axiosSecure(`/allPosts?sort=${sortBy}`);
      return res.data;
    },
  });
  console.log(sortBy);
  return (
    <div className="py-12 md:py-16">
      <h4 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 dark:text-gray-300">
        All Posts
      </h4>
      <div className="flex items-center mb-6 justify-end">
        <select
          className="outline-none font-main font-medium dark:text-white dark:border-gray-500 border border-gray-700 p-2 rounded"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option className="font-medium p-1 dark:text-black" value="asc">
            Sort by ascending like
          </option>
          <option className="font-medium p-1 dark:text-black" value="desc">
            Sort by descending like
          </option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPostsPage;
