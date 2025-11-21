import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { Link, useParams, useNavigate } from "react-router";
import Loader from "../../../shared/Loader";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaComment, FaShareAlt } from "react-icons/fa";
import { IoTime, IoEye } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useTimeAgo from "../../../hooks/useTimeAgo";
import { FaBookmark } from "react-icons/fa";
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
  const { data: comments = [], isPending: loading } = useQuery({
    queryKey: ["allComments", id],
    queryFn: async () => {
      const result = await axiosSecure(`/comments/${id}`);
      return result.data;
    },
  });

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

  const handleNativeShare = async () => {
    if (!user) {
      navigate("/login");
      toast.error("You must log in to share this post.");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: data?.title,
          text: data?.description,
          url: `${window.location.origin}/post/${id}`,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          toast.error("Failed to share post.");
        }
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${id}`);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isPending) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto px-1 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Main Post Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Author Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  className="rounded-full w-16 h-16 border-4 border-white dark:border-gray-800 shadow-md object-cover"
                  src={data.image}
                  alt={data.name}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {data.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <IoTime size={14} />
                    <span>{time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleNativeShare}
                className="text-black dark:text-white"
              >
                <FaShareAlt size={20} />
              </button>
              <button className="text-black dark:text-white">
                <FaBookmark size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-4">
          <h1 className="text-3xl font-second font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {data.title}
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 font-second dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {data.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            {/* Like Button */}
            <button
              onClick={() => handleVote("like")}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-200 dark:hover:border-green-800 hover:text-green-700 dark:hover:text-green-300 transition-all duration-200 font-semibold"
            >
              <AiFillLike size={22} />
              {data.UpVote}
            </button>

            {/* Dislike Button */}
            <button
              onClick={() => handleVote("dislike")}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 font-semibold"
            >
              <AiFillDislike size={22} />
              {data.DownVote}
            </button>

            {/* Comments Button */}
            <Link
              to={`/comments/${id}`}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 font-semibold"
            >
              <FaComment size={18} />
              {comments.length}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
