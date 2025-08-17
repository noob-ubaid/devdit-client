import React from "react";
import toast from "react-hot-toast";

const AddTag = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const tag = e.target.tag.value;
    const data = {
      tag
    }
    fetch(`${import.meta.env.VITE_API_URL}/tags`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Tag Added Successfully");
        e.target.reset()
      });
  };
  return (
    <div>
      <h1 className="text-center text-2xl dark:text-gray-300 font-main md:text-3xl  lg:text-4xl font-semibold mt-8 md:mt-12">
        Add tags
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-6 md:gap-6 gap-4 md:mt-10 w-full">
          <input
            className=" px-6 py-3 rounded bg-gray-200 dark:bg-gray-800 dark:text-gray-300 outline-none"
            type="text"
            name="tag"
            placeholder="Enter your tag name"
            required
          />
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

export default AddTag;
