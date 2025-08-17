import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Comment from "./Comment";
import NoComments from "./NoComments";

const Comments = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: comments = [], isPending } = useQuery({
    queryKey: ["allComments", id],
    queryFn: async () => {
      const result = await axiosSecure(`/comments/${id}`);
      return result.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (newComment) => {
      const res = await axiosSecure.post(`/comments`, newComment);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Comment posted successfully");
      queryClient.invalidateQueries({ queryKey: ["allComments", id] });
    },
    onError: () => {
      toast.error("Failed to post comment");
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value;
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const newComment = {
      comment: commentText,
      postId: id,
      commenterName: user?.displayName,
      commenterEmail: user?.email,
      commenterImage: user?.photoURL,
      createdAt: new Date(),
      isReported: false,
      reportedAt: null,
      feedback: "",
    };

    mutate(newComment);
    e.target.reset();
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 md:p-4 p-2 rounded-md my-10 md:my-14">
      <h1 className="text-center text-2xl dark:text-gray-300 font-main md:text-3xl lg:text-4xl font-semibold my-4 md:my-6 lg:my-8">
        All comments
      </h1>

      <div>
        {isPending ? (
          <p className="text-center text-gray-600">Loading comments...</p>
        ) : comments.length === 0 ? (
          <NoComments/>
        ) : (
          <div className=" space-y-3">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>

      {user ? (
        <form onSubmit={handleComment} className="space-y-4 mt-4 md:mt-6">
          <input
            className="px-6 py-3 rounded w-full dark:bg-gray-700 dark:text-gray-300 bg-white outline-none"
            type="text"
            name="comment"
            placeholder="Write a comment"
          />
          <button
            type="submit"
            className="bg-main cursor-pointer w-full font-second text-white font-medium md:px-8 md:py-2.5 px-4 py-2 rounded"
          >
            Add Comment
          </button>
        </form>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-main mt-4 md:mt-6 cursor-pointer w-full font-second text-white font-medium md:px-8 md:py-2.5 px-4 py-2 rounded"
        >
          Please login to add a comment.
        </button>
      )}
    </div>
  );
};

export default Comments;






