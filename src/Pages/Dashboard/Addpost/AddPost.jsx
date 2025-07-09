import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const AddPost = () => {
  const tags = [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Frontend",
    "Backend",
    "Fullstack",
    "Web Development",
    "UI/UX",
    "Firebase",
    "API Integration",
  ];
  const { user } = useAuth();
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const handleTag = (e) => {
    setTag(e.target.value);
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
    const data = {
      name,
      email,
      image,
      title,
      description,
      tag,
      UpVote : 0,
      DownVote : 0,
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
        toast.success("Successfully added food items");
      });
  };
  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl  lg:text-4xl font-semibold mt-8 md:mt-12">
        Share Your Thoughts
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-6 md:gap-6 gap-4 md:mt-10 w-full">
          <input
            className=" px-6 py-3 rounded dark:bg-gray-700 dark:text-white bg-gray-200 outline-none"
            type="text"
            name="title"
            placeholder="Enter your post title"
            required
          />
          <div className="flex items-center md:gap-8 gap-4 dark:bg-gray-700 rounded dark:text-white flex-col md:flex-row w-full">
            <select
              value={tag}
              onChange={handleTag}
              required
              className=" px-6 py-3 rounded w-full dark:bg-gray-700 dark:text-white bg-gray-200 outline-none"
            >
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
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
            className=" px-6  py-3 rounded dark:bg-gray-700 dark:text-white bg-gray-200 outline-none"
          ></textarea>

          <button
            type="submit"
            className="bg-main w-full text-white font-medium md:px-8 md:py-2.5 px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
