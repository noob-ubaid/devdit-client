import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const AddPost = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedTag, setSelectedTag] = useState("JavaScript");
  const [description, setDescription] = useState("");

  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["myPosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user?.email}`);
      return res.data;
    },
  });

  const addPostMutation = useMutation({
    mutationFn: async (newPost) => {
      const res = await axiosSecure.post("/add-post", newPost);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post added successfully!");
      queryClient.invalidateQueries({ queryKey: ["myPosts", user?.email] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const date = new Date().toDateString();

    const newPost = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      title,
      description,
      tag: selectedTag,
      date,
      UpVote: 0,
      DownVote: 0,
    };

    addPostMutation.mutate(newPost);
    form.reset();
    setSelectedTag("JavaScript");
    setDescription("");
  };

  const handleTag = (e) => setSelectedTag(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  if (tagsLoading || postsLoading) return <Loader />;

  if (posts.length >= 5) {
    return (
      <div className="bg-[rgba(15,15,15,0.05)] w-full py-16 text-center px-4 mt-6 rounded-md">
        <h4 className="font-semibold font-main text-2xl md:text-3xl text-[#141414]">
          Post Limit Reached
        </h4>
        <p className="mt-4 max-w-2xl font-second text-center mx-auto text-[#141414B3]">
          You have reached your 5-post limit for free users. Become a member to
          add unlimited posts and continue sharing your ideas with the
          community.
        </p>
        <div className="mt-8">
          <Link
            to="/membership"
            className="bg-main/90 hover:bg-main text-white font-medium px-8 py-3 rounded-full duration-300"
          >
            Become a Member
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-main md:text-3xl lg:text-4xl font-semibold mt-8 md:mt-12">
        Share Your Thoughts
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-6 md:gap-6 gap-4 md:mt-10 w-full">
          <input
            className="px-6 py-3 rounded bg-gray-200 outline-none"
            type="text"
            name="title"
            placeholder="Enter your post title"
            required
          />
          <div className="flex items-center md:gap-8 gap-4 rounded flex-col md:flex-row w-full">
            <select
              required
              onChange={handleTag}
              value={selectedTag}
              className="px-6 py-3 rounded w-full bg-gray-200 outline-none"
            >
              {tags.map((t) => (
                <option key={t._id} value={t.tag}>
                  {t.tag}
                </option>
              ))}
            </select>
          </div>
          <textarea
            name="description"
            rows="5"
            required
            onChange={handleDescription}
            placeholder="Description"
            value={description}
            className="px-6 py-3 rounded bg-gray-200 outline-none"
          ></textarea>
          <button
            type="submit"
            disabled={addPostMutation.isPending}
            className="bg-main w-full font-second text-white font-medium md:px-8 md:py-2.5 px-4 py-2 rounded"
          >
            {addPostMutation.isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
