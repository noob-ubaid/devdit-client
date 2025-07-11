import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import { Link } from "react-router";

const AddPost = () => {
  const { user } = useAuth();
  const [tag, setTag] = useState([]);
  const [selectedTag,setSelectedTag] = useState("JavaScript")
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tags`)
      .then((res) => res.json())
      .then((data) => setTag(data));
  }, []);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/posts/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
        setReFetch(true);
      });
  }, [user, reFetch]);
  if (loading) return <Loader />;
  const handleTag = (e) => {
    setSelectedTag(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const image = user?.photoURL;
    const title = form.title.value;
    const date = new Date().toDateString();
    const data = {
      name,
      email,
      image,
      title,
      description,
      tag:selectedTag,
      date,
      UpVote: 0,
      DownVote: 0,
    };
    // post method
    fetch(`${import.meta.env.VITE_API_URL}/add-post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Post added successfully!");
        setReFetch(!reFetch)
      });
  };
  if (posts.length > 4)
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

  return (
    <div>
      <h1 className="text-center text-2xl font-main md:text-3xl  lg:text-4xl font-semibold mt-8 md:mt-12">
        Share Your Thoughts
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-6 md:gap-6 gap-4 md:mt-10 w-full">
          <input
            className=" px-6 py-3 rounded bg-gray-200 outline-none"
            type="text"
            name="title"
            placeholder="Enter your post title"
            required
          />
          <div className="flex items-center md:gap-8 gap-4  rounded flex-col md:flex-row w-full">
            <select
              required
              onChange={handleTag}
              value={selectedTag}
              className=" px-6 py-3 rounded w-full  bg-gray-200 outline-none"
            >
              {tag.map((tags) => (
                <option key={tags._id} value={tags.tag}>
                  {tags.tag}
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
            className=" px-6  py-3 rounded bg-gray-200 outline-none"
          ></textarea>

          <button
            type="submit"
            className="bg-main w-full font-second text-white font-medium md:px-8 md:py-2.5 px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
