import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";

const Explore = () => {
  const [clickedTag, setClickedTag] = useState("");
  const { data: tags = [], isPending } = useQuery({
    queryKey: ["exploreTags"],
    queryFn: async () => {
      const res = await axiosSecure(`/tags`);
      return res.data;
    },
  });
  const { data: posts = [], isPending: loading } = useQuery({
    queryKey: ["exploreTags", clickedTag],
    queryFn: async () => {
      if (!clickedTag) return [];
      const res = await axiosSecure(`/posts?tag=${clickedTag}`);
      return res.data;
    },
    enabled: !!clickedTag,
  });
  const handleTag = (tag) => {
    setClickedTag(tag);
  };
  if (isPending) return <Loader />;
  return (
    <div className="py-14 md:py-20">
      <h4 className="text-2xl font-semibold font-main md:text-3xl lg:text-4xl text-center">
        Explore by tags
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 my-8 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {tags.map((tag) => (
          <div
            onClick={() => handleTag(tag.tag)}
            key={tag._id}
            className="bg-blue-200 rounded-md cursor-pointer hover:shadow-md duration-300 text-blue-900 py-16"
          >
            <p className="text-center text-xl font-semibold font-main">
              {tag.tag}
            </p>
          </div>
        ))}
      </div>
      {clickedTag === "" && (
        <div className="bg-gray-100 rounded-md w-full py-12">
          <p className="text-center text-2xl font-medium font-main md:text-3xl">
            Select tag to get the selected posts
          </p>
        </div>
      )}
    </div>
  );
};

export default Explore;
