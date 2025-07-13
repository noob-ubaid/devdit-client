import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Comment from "./Comment";

const Comments = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data = [], isPending } = useQuery({
    queryKey: ["allComments", id],
    queryFn: async () => {
      const result = await axiosSecure(`/comments/${id}`);
      return result.data;
    },
  });
  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const data = {
      comment,
      postId: id,
      commenterName: user?.displayName,
      commenterEmail: user?.email,
      commenterImage: user?.photoURL,
    };
    fetch(`${import.meta.env.VITE_API_URL}/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Comment posted successfully");
      });
  };
  console.log(data);
  return (
    <div className="max-w-2xl mx-auto bg-gray-200 md:p-4 p-2 rounded-md my-10 md:my-14">
      <h1 className="text-center text-2xl font-main md:text-3xl lg:text-4xl font-semibold my-4 md:my-6 lg:my-8">
        All comments
      </h1>
      <div className="h-[350px] md:h-[420px] overflow-y-scroll space-y-3 ">
        {data.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
      <form onSubmit={handleComment} className=" space-y-4 mt-6 md:mt-8">
        <input
          className="px-6 py-3 rounded w-full bg-white outline-none"
          type="text"
          name="comment"
          placeholder="Write a comment"
        />
        <button
          type="submit"
          className="bg-main cursor-pointer w-full font-second text-white font-medium md:px-8 md:py-2.5 px-4 py-2 rounded"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
