import React from "react";
import { Link } from "react-router";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import useComments from "../../../hooks/useComments";
import useTimeAgo from "../../../hooks/useTimeAgo";

const Post = ({ post }) => {
  const { data: comments = [], isLoading } = useComments(post._id);
  const time = useTimeAgo(post.date);

  return (
      <div className="rounded bg-gray-100 dark:bg-gray-800 p-4 w-full max-w-full overflow-hidden">
        <div className="flex flex-wrap items-center border-b border-gray-400 pb-4 justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full w-10 h-10 md:w-12 md:h-12 object-cover"
              src={post.image}
              alt={post.name}
            />
            <p className="text-xl dark:text-gray-300 md:text-[21px] font-medium font-main">
              {post.name}
            </p>
          </div>
          <p className="bg-blue-200 px-3 py-1 rounded-full text-blue-800 font-main font-semibold whitespace-nowrap">
            {post.tag}
          </p>
        </div>

        <div className="border-b border-gray-400 pb-4">
          <p className="text-xl dark:text-gray-300 font-medium  h-[70px] font-main my-2 md:text-2xl">
            {post.title}
          </p>
          <p className="font-second text-gray-700 dark:text-gray-400 line-clamp-2 min-h-[50px]">
            {post.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-3 gap-2 md:gap-5">
          <p className="md:text-lg dark:text-gray-300 text-base font-main md:font-semibold font-medium">
            {time}
          </p>
          <Link className="bg-main text-white font-medium px-5 py-2 rounded" to={`/post/${post._id}`}>View More</Link>
        </div>
      </div>
  );
};

export default Post;
