import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { Link, useParams, useNavigate } from "react-router";
import Loader from "../../../shared/Loader";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isPending } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const res = await axiosSecure(`/posts/${id}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;

  const handleNotLoggedInUser = (success, error) => {
    if (!user) {
      navigate("/login");
      toast.error(error);
      return
    }
    else{
      navigate("/");
      toast.success(success);
    }
  };
  return (
    <div className="rounded bg-gray-100 p-4 my-6 md:my-10 max-w-[700px] mx-auto">
      {/* Top Info */}
      <div className="flex items-center flex-col border-b border-gray-400 pb-4 justify-between">
        <div className="flex items-center justify-center w-full gap-1 sm:gap-2">
          <div className="flex items-center gap-2 md:gap-4">
            <img
              className="rounded-full mx-auto size-10 md:size-14"
              src={data.image}
              alt={data.name}
            />
            <p className="text-xl md:text-[22px] lg:text-2xl font-medium font-main">
              {data.name}
            </p>
          </div>
        </div>
        <div className="flex items-center w-full mt-4 justify-between">
          <p className="text-xl md:text-[22px] lg:text-2xl font-medium font-main">
            {data.date}
          </p>
          <p className="bg-blue-200 px-3 py-1 rounded-full text-blue-800 font-main font-semibold ">
            {data.tag}
          </p>
        </div>
      </div>

      {/* Post Description */}
      <div className="border-b border-gray-400 pb-4">
        <p className="text-xl font-medium font-main my-2 md:text-2xl">
          {data.title}
        </p>
        <p className="font-second h-[140px] text-gray-700">
          {data.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-3 gap-5">
        <Link to={`/comments/${id}`}
          className="flex-1 text-center py-2 px-4 bg-white rounded-full text-black font-medium"
        >
          View Comments
        </Link>
        <div className="flex items-center gap-2">
          {/* Like */}
          <button onClick={() =>
            handleNotLoggedInUser(
              "You liked this post",
              "You must log in to like."
            )
          } className="flex items-center gap-1 text-black">
            <AiFillLike size={22} />
            <span className="font-medium">{data.UpVote}</span>
          </button>

          {/* Divider */}
          <span>|</span>

          {/* Dislike */}
          <button onClick={() =>
            handleNotLoggedInUser(
              "You disliked this post",
              "You must log in to dislike."
            )
          } className="flex items-center gap-1 text-black">
            <AiFillDislike size={22} />
            <span className="font-medium">{data.DownVote}</span>
          </button>

          {/* Divider */}
          <span>|</span>

          {/* Share */}
          <button onClick={() =>
            handleNotLoggedInUser(
              "You shared this post",
              "You must log in to share the post."
            )
          } className="flex items-center gap-1 text-black">
            <FaShareSquare size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;

