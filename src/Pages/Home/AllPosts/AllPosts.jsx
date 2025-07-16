import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../shared/Loader";
import Post from "./Post";
import NoPosts from "./NoPosts";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const AllPosts = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState("latest");

  const { data, isPending, error } = useQuery({
    queryKey: ["posts", currentPage, search, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getPosts?page=${currentPage}&search=${search}&sortBy=${sortBy}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isPending) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">Error loading posts.</div>
    );

  const posts = data.posts;
  const count = data.count;
  const numberOfPages = Math.ceil(count / 5);
  const pages = [...Array(numberOfPages).keys()];

  const handlePrevPage = () => setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const toggleSortBy = () => {
    setSortBy((prev) => (prev === "latest" ? "popularity" : "latest"));
    setCurrentPage(0);
  };

  if (posts.length === 0) return <NoPosts search={search} />;

  return (
    <div>
      <h1 className="text-center text-2xl font-main md:text-3xl lg:text-4xl font-semibold mt-8 md:mt-12">
        All Posts
      </h1>

      <div className="flex justify-center my-4">
        <button
          onClick={toggleSortBy}
          className="bg-main text-white cursor-pointer px-4 py-2 rounded font-semibold hover:bg-main/90 transition"
        >
          {sortBy === "latest" ? "Sort by Popularity" : "Sort by Latest"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 my-6 md:my-10 lg:grid-cols-3 gap-6 md:gap-10">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      {numberOfPages > 1 && (
        <div className="flex items-center mb-6 md:mb-10 justify-center">
          <div className="flex items-center gap-1 md:gap-2">
            <button
              disabled={currentPage < 1}
              onClick={handlePrevPage}
              className={`bg-gray-300 px-3 py-2 rounded font-medium font-main ${
                currentPage < 1
                  ? "cursor-not-allowed bg-gray-100"
                  : "cursor-pointer"
              }`}
            >
              Prev
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-main px-4 font-medium py-2 cursor-pointer rounded text-white "
                    : "bg-gray-300 font-medium px-4 cursor-pointer py-2 rounded text-black "
                }
              >
                {page + 1}
              </button>
            ))}
            <button
              disabled={currentPage === pages.length - 1}
              onClick={handleNextPage}
              className={`bg-gray-300 px-3 py-2 rounded font-medium font-main ${
                currentPage === pages.length - 1
                  ? "cursor-not-allowed bg-gray-100"
                  : "cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
