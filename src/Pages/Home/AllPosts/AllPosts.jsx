import React, { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import Post from "./Post";
import NoPosts from "./NoPosts";
const AllPosts = ({ search }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / 5);
  const pages = [...Array(numberOfPages).keys()];
  useEffect(() => {
    setLoading(true);
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/getPosts?page=${currentPage}&search=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        console.log(data);
        setCount(data.count);
        setLoading(false);
      });
  }, [currentPage, search]);
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  if (loading) return <Loader />;
  if (posts.length === 0) return <NoPosts search={search}/>;
  return (
    <div>
      <h1 className="text-center text-2xl font-main md:text-3xl lg:text-4xl font-semibold mt-8 md:mt-12">
        All Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-6 md:my-10 lg:grid-cols-3 gap-6 md:gap-10">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <div className="flex items-center mb-6 md:mb-10 justify-center">
        <div className="flex items-center gap-1 md:gap-2">
          <button
            disabled={currentPage < 1}
            onClick={handlePrevPage}
            className={`bg-gray-300 px-3 py-2 rounded  font-medium font-main ${
              currentPage < 1
                ? "cursor-not-allowed bg-gray-100"
                : "cursor-pointer"
            }`}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              className={
                currentPage === page
                  ? "bg-main px-4 font-medium py-2 cursor-pointer rounded text-white "
                  : "bg-gray-300 font-medium px-4 cursor-pointer py-2 rounded text-black "
              }
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page + 1}
            </button>
          ))}
          <button
            disabled={pages.length - 1 == currentPage}
            onClick={handleNextPage}
            className={`bg-gray-300 px-3  py-2 rounded font-medium font-main ${
              pages.length - 1 == currentPage
                ? "cursor-not-allowed bg-gray-100"
                : "cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
