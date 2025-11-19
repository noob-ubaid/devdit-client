// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import { axiosSecure } from "../../../hooks/useAxiosSecure";
// import { Link, useParams, useNavigate } from "react-router";
// import Loader from "../../../shared/Loader";
// import { AiFillDislike, AiFillLike } from "react-icons/ai";
// import useAuth from "../../../hooks/useAuth";
// import toast from "react-hot-toast";
// import {
//   WhatsappShareButton,
//   WhatsappIcon,
//   FacebookShareButton,
//   FacebookIcon,
// } from "react-share";
// import useTimeAgo from "../../../hooks/useTimeAgo";

// const Details = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const { data, isPending } = useQuery({
//     queryKey: ["details", id],
//     queryFn: async () => {
//       const res = await axiosSecure(`/post/${id}`);
//       return res.data;
//     },
//   });
//     const time = useTimeAgo(data?.date);
//   const likeMutation = useMutation({
//     mutationFn: async () => {
//       const res = await axiosSecure.patch(`/like/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["details", id]);
//       toast.success("You liked this post!");
//     },
//     onError: () => {
//       toast.error("Failed to like. Try again.");
//     },
//   });

//   const dislikeMutation = useMutation({
//     mutationFn: async () => {
//       const res = await axiosSecure.patch(`/dislike/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["details", id]);
//       toast.success("You disliked this post!");
//     },
//     onError: () => {
//       toast.error("Failed to dislike. Try again.");
//     },
//   });

//   const handleVote = (type) => {
//     if (!user) {
//       navigate("/login");
//       toast.error(`You must log in to ${type} this post.`);
//       return;
//     }
//     if (type === "like") {
//       likeMutation.mutate();
//     } else if (type === "dislike") {
//       dislikeMutation.mutate();
//     }
//   };

//   const shareUrl = `${window.location.origin}/post/${id}`;
//     if (isPending) return <Loader />;
//   return (
//     <div className="rounded bg-gray-100 dark:bg-gray-800 p-4 my-10 md:my-24 max-w-[630px] mx-auto">
//       {/* Top Info */}
//       <div className="flex items-center flex-col border-b border-gray-400 pb-4 justify-between">
//         <div className="flex items-center justify-center w-full gap-1 sm:gap-2">
//           <div className="flex items-center gap-2 md:gap-4">
//             <img
//               className="rounded-full mx-auto size-10 md:size-14"
//               src={data.image}
//               alt={data.name}
//             />
//             <p className="text-xl dark:text-gray-300 md:text-[22px] lg:text-2xl font-medium font-main">
//               {data.name}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center w-full mt-4 justify-between">
//           <p className="text-xl dark:text-gray-300 md:text-[22px] lg:text-2xl font-medium font-main">
//            {time}
//           </p>
//           <p className="bg-blue-200 px-3 py-1 rounded-full text-blue-800 font-main font-semibold ">
//             {data.tag}
//           </p>
//         </div>
//       </div>

//       {/* Post Description */}
//       <div className="border-b border-gray-400 pb-4">
//         <p className="text-2xl dark:text-gray-300 font-medium font-main my-2 md:text-3xl">
//           {data.title}
//         </p>
//         <p className="font-main text-lg mt-4 dark:text-gray-400 text-gray-700">
//           {data.description}
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center justify-between mt-3 gap-1 md:gap-5">
//         <Link
//           to={`/comments/${id}`}
//           className="flex-1 text-center md:py-2 md:px-4 px-2 py-1 bg-white dark:text-white dark:bg-gray-600 rounded text-black font-medium"
//         >
//           All Comments
//         </Link>

//         <div className="flex flex-1 items-center gap-2 justify-center">
//           {/* Like */}
//           <button
//             onClick={() => handleVote("like")}
//             className="flex cursor-pointer items-center gap-1 text-black"
//           >
//             <AiFillLike size={22} className="dark:text-gray-300"/>
//             <span className="font-medium dark:text-gray-300">{data.UpVote}</span>
//           </button>

//           <span className="dark:text-gray-300">|</span>

//           {/* Dislike */}
//           <button
//             onClick={() => handleVote("dislike")}
//             className="flex cursor-pointer items-center gap-1 text-black"
//           >
//             <AiFillDislike size={22} className="dark:text-gray-300"/>
//             <span className="font-medium dark:text-gray-300">{data.DownVote}</span>
//           </button>

//           <span className="dark:text-gray-300">|</span>

//           {/* Share */}
//           <div className="flex items-center gap-2">
//             <WhatsappShareButton disabled={!user} url={shareUrl} title={data.title}>
//               <WhatsappIcon size={28} round />
//             </WhatsappShareButton>

//             <FacebookShareButton disabled={!user} url={shareUrl} quote={data.title}>
//               <FacebookIcon size={28} round />
//             </FacebookShareButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;

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
    <div className="max-w-3xl mx-auto px-4 py-8">
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
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
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
                  <div className="flex items-center gap-1">
                    <IoEye size={14} />
                    <span>1.2k views</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold">
              {data.tag}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {data.title}
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {data.description}
            </p>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700/30 border-y border-gray-100 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.UpVote}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Likes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.DownVote}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Dislikes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  42
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Comments
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Posted {time}
            </div>
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
              Like
            </button>

            {/* Dislike Button */}
            <button
              onClick={() => handleVote("dislike")}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 font-semibold"
            >
              <AiFillDislike size={22} />
              Dislike
            </button>

            {/* Comments Button */}
            <Link
              to={`/comments/${id}`}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 font-semibold"
            >
              <FaComment size={18} />
              Comments
            </Link>

            {/* Share Button */}
            <button
              onClick={handleNativeShare}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-800 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 font-semibold"
            >
              <FaShareAlt size={18} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Related Content */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Discover More Content
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Explore other interesting posts and join the conversation with our
            community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to={`/comments/${id}`}
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-md"
            >
              Join Discussion
            </Link>
            <Link
              to="/"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              Browse Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
