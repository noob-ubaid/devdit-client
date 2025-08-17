import React from "react";
import { Link } from "react-router";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import useTimeAgo from "../../../hooks/useTimeAgo";

const PostCard = ({ post }) => {
  const { tag, title, date, description, _id } = post;
  const time = useTimeAgo(date);

  return (
    <div className="rounded bg-gray-100 dark:bg-gray-800 p-4 flex flex-col justify-between h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center border-b border-gray-400 pb-4 justify-between">
        <p className="md:text-xl dark:text-gray-300 text-lg font-main md:font-bold font-semibold">
          {time}
        </p>
        <p className="bg-blue-200 px-3 py-1 rounded-full text-blue-800 font-main font-semibold">
          {tag}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between mt-4">
        <div className="pb-4">
          <p className="text-xl font-medium dark:text-gray-300 font-main my-2 md:text-2xl">
            {title}
          </p>
          <p className="font-second dark:text-gray-400 text-gray-700">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Link
            to={`/comments/${_id}`}
            className="flex-1 text-center py-2 px-4 bg-white font-main rounded text-black font-medium hover:bg-gray-200 transition"
          >
            View Comments
          </Link>
          <Link
            to={`/post/${_id}`}
            className="flex-1 text-center py-2 px-4 bg-main text-white rounded font-medium font-main hover:bg-blue-700 transition"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
