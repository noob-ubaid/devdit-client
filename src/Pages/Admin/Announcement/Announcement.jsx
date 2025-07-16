import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Announcement = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const data = {
      authorImage: user.photoURL,
      authorName: user.displayName,
      title,
      description,
    };
    fetch(`${import.meta.env.VITE_API_URL}/announcement`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Announcement posted successfully!");
      });
  };
  return (
    <div>
      <h1 className="text-center text-2xl font-main md:text-3xl  lg:text-4xl font-semibold mt-8 md:mt-12">
        Create Announcement
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-6 md:gap-6 gap-4 md:mt-10 w-full">
          <input
            className=" px-6 py-3 rounded bg-gray-200 outline-none"
            type="text"
            name="title"
            placeholder="Enter your announcement title"
            required
          />

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

export default Announcement;
