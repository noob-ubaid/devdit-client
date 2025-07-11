import React from "react";
import { Link } from "react-router";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
const PostCard = ({ post }) => {
  const { tag, title, date,description, _id, UpVote, DownVote } = post;
  return (
    <div className="rounded bg-gray-100 p-4">
      <div className="flex items-center border-b border-gray-400 pb-4  justify-between ">
        <div className="flex items-center gap-2 md:gap-3">
         <p className="md:text-xl text-lg font-main md:font-bold font-semibold">{date}</p>
        </div>
        <p className="bg-blue-200 px-3 py-1 rounded-full text-blue-800 font-main font-semibold ">
          {tag}
        </p>
      </div>
      <div className="border-b border-gray-400 pb-4">
        <p className="text-xl font-medium font-main my-2 md:text-2xl">{title}</p>
        <p className="font-second h-[140px] text-gray-700">{description}</p>
      </div>
      <div className="flex items-center justify-between mt-3 gap-5">
      <Link className="flex-1 text-center py-2 px-4 bg-white rounded-full text-black font-medium">View Comments</Link>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-black">
          <AiFillLike size={22}/>
          <p className="font-medium">{UpVote}</p>
        </div>
        |
        <div className="flex items-center gap-2 text-black">
          <AiFillDislike size={22}/>
          <p className="font-medium">{DownVote}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PostCard;
