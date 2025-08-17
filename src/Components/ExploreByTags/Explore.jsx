import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";
import Post from "../../Pages/Home/AllPosts/Post";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
const Explore = () => {
  const [clickedTag, setClickedTag] = useState("");
  const [coloums, setColoums] = useState(false);
  const { data: tags = [], isPending } = useQuery({
    queryKey: ["exploreTags"],
    queryFn: async () => {
      const res = await axiosSecure(`/tags`);
      return res.data;
    },
  });
  const { data: posts = [], isPending: loading } = useQuery({
    queryKey: ["exploreTags", clickedTag],
    queryFn: async () => {
      if (!clickedTag) return [];
      const res = await axiosSecure(`/posts?tag=${clickedTag}`);
      return res.data;
    },
    enabled: !!clickedTag,
  });
  const handleTag = (tag) => {
    setClickedTag(tag);
  };
  if (isPending) return <Loader />;
  return (
    <div className="py-14 md:py-20">
      <h4 className="text-2xl font-semibold dark:text-gray-300 font-main md:text-3xl lg:text-4xl text-center">
        Explore by tags
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 my-8 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {tags.map((tag) => (
          <div
            onClick={() => handleTag(tag.tag)}
            key={tag._id}
            className="bg-blue-200 rounded-md cursor-pointer hover:shadow-md duration-300 text-blue-900 py-16"
          >
            <p className="text-center text-xl font-semibold font-main">
              {tag.tag}
            </p>
          </div>
        ))}
      </div>
      {clickedTag === "" && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md w-full py-12">
          <p className="text-center text-2xl dark:text-gray-300 font-medium font-main md:text-3xl">
            Select tag to get the selected posts
          </p>
        </div>
      )}
      {clickedTag !== "" && posts.length !== 0 && (
        <div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-2xl md:text-3xl font-main font-medium">
              All posts related to {clickedTag}
            </h4>
            <div>
              {clickedTag && (
                <div className=" items-center gap-4 hidden lg:flex justify-end">
                  <div
                    onClick={() => setColoums(false)}
                    className="bg-gray-200 cursor-pointer p-1.5 rounded"
                  >
                    <BsFillGrid3X3GapFill size={22} />
                  </div>
                  <div
                    onClick={() => setColoums(true)}
                    className="bg-gray-200 cursor-pointer p-1.5 rounded"
                  >
                    <BsFillGridFill size={22} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`grid grid-cols-1 gap-5 mt-8 md:grid-cols-2 ${
              !coloums ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {posts.length > 0 && posts.map((post) => <Post post={post} />)}
          </div>
        </div>
      )}
      {
        posts.length === 0 && clickedTag !== '' && <div className="bg-gray-100 dark:bg-gray-800 rounded-md py-12">
            <p className="text-center text-2xl font-medium font-main dark:text-gray-300 md:text-3xl">No posts found related to <span className="font-semibold">{clickedTag}</span>.Try another tag</p>
        </div>
      }
    </div>
  );
};

export default Explore;
