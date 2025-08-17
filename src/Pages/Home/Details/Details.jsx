import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { Link, useParams, useNavigate } from "react-router";
import Loader from "../../../shared/Loader";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import useTimeAgo from "../../../hooks/useTimeAgo";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const res = await axiosSecure(`/post/${id}`);
      return res.data;
    },
  });
    const time = useTimeAgo(data?.date);
  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/like/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["details", id]);
      toast.success("You liked this post!");
    },
    onError: () => {
      toast.error("Failed to like. Try again.");
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/dislike/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["details", id]);
      toast.success("You disliked this post!");
    },
    onError: () => {
      toast.error("Failed to dislike. Try again.");
    },
  });

  const handleVote = (type) => {
    if (!user) {
      navigate("/login");
      toast.error(`You must log in to ${type} this post.`);
      return;
    }
    if (type === "like") {
      likeMutation.mutate();
    } else if (type === "dislike") {
      dislikeMutation.mutate();
    }
  };

  const shareUrl = `${window.location.origin}/post/${id}`;
    if (isPending) return <Loader />;
  return (
    <div className="rounded bg-gray-100 dark:bg-gray-800 p-4 my-10 md:my-24 max-w-[600px] mx-auto">
      {/* Top Info */}
      <div className="flex items-center flex-col border-b border-gray-400 pb-4 justify-between">
        <div className="flex items-center justify-center w-full gap-1 sm:gap-2">
          <div className="flex items-center gap-2 md:gap-4">
            <img
              className="rounded-full mx-auto size-10 md:size-14"
              src={data.image}
              alt={data.name}
            />
            <p className="text-xl dark:text-gray-300 md:text-[22px] lg:text-2xl font-medium font-main">
              {data.name}
            </p>
          </div>
        </div>
        <div className="flex items-center w-full mt-4 justify-between">
          <p className="text-xl dark:text-gray-300 md:text-[22px] lg:text-2xl font-medium font-main">
           {time}
          </p>
          <p className="bg-blue-200 px-3 py-1 rounded-full text-blue-800 font-main font-semibold ">
            {data.tag}
          </p>
        </div>
      </div>

      {/* Post Description */}
      <div className="border-b border-gray-400 pb-4">
        <p className="text-2xl dark:text-gray-300 font-medium font-main my-2 md:text-3xl">
          {data.title}
        </p>
        <p className="font-main text-lg mt-4 dark:text-gray-400 text-gray-700">
          {data.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-3 gap-1 md:gap-5">
        <Link
          to={`/comments/${id}`}
          className="flex-1 text-center md:py-2 md:px-4 px-2 py-1 bg-white dark:text-white dark:bg-gray-600 rounded text-black font-medium"
        >
          All Comments
        </Link>

        <div className="flex flex-1 items-center gap-4 justify-center">
          {/* Like */}
          <button
            onClick={() => handleVote("like")}
            className="flex cursor-pointer items-center gap-1 text-black"
          >
            <AiFillLike size={22} className="dark:text-gray-300"/>
            <span className="font-medium dark:text-gray-300">{data.UpVote}</span>
          </button>

          <span>|</span>

          {/* Dislike */}
          <button
            onClick={() => handleVote("dislike")}
            className="flex cursor-pointer items-center gap-1 text-black"
          >
            <AiFillDislike size={22} className="dark:text-gray-300"/>
            <span className="font-medium dark:text-gray-300">{data.DownVote}</span>
          </button>

          <span>|</span>

          {/* Share */}
          <div className="flex items-center gap-4">
            <WhatsappShareButton disabled={!user} url={shareUrl} title={data.title}>
              <WhatsappIcon size={28} round />
            </WhatsappShareButton>

            <FacebookShareButton disabled={!user} url={shareUrl} quote={data.title}>
              <FacebookIcon size={28} round />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
