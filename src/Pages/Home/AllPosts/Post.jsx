import React from "react";
import { Link } from "react-router";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import useComments from "../../../hooks/useComments";

const Post = ({ post }) => {
  const { data: comments = [], isLoading } = useComments(post._id);

  return (
    <Link to={`/post/${post._id}`} key={post._id}>
      <div className="rounded bg-gray-100 p-4">
        <div className="flex items-center border-b border-gray-400 pb-4 justify-between ">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full size-10 md:size-14"
              src={post.image}
              alt={post.name}
            />
            <p className="text-xl md:text-[22px] lg:text-2xl font-medium font-main">
              {post.name}
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
          <p className="font-second h-[140px] text-gray-700">{post.description}</p>
        </div>
        <div className="flex items-center justify-between mt-3 gap-5">
          <p className="md:text-lg text-base font-main md:font-semibold font-medium">
            {post.date}
          </p>
          <div className="flex items-center gap-2">
            <div data-tip="Total Comments" className="flex tooltip items-center gap-2 text-black">
              <FaComment size={22} />
              <p className="font-medium">{isLoading ? "..." : comments.length}</p>
            </div>
            |
            <div data-tip="Total Upvote" className="flex tooltip items-center gap-2 text-black">
              <AiFillLike size={22} />
              <p className="font-medium">{post.UpVote}</p>
            </div>
            |
            <div data-tip="Total Downvote" className="flex tooltip items-center gap-2 text-black">
              <AiFillDislike size={22} />
              <p className="font-medium">{post.DownVote}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
