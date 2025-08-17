import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/Loader";

const Tags = () => {
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["exploreByTags"],
    queryFn: async () => {
      const res = await axiosSecure("/tags");
      return res.data;
    },
  });
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2 className="text-center text-2xl dark:text-gray-300 md:text-3xl lg:text-4xl font-medium md:font-semibold font-main mt-10 md:mt-14">
        Explore by tags
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 my-6 md:my-10 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {tags.map((tag) => (
          <button
            key={tag._id}
            className="px-4 py-2 rounded-full font-second bg-blue-200 text-blue-900 font-medium hover:bg-blue-300 duration-300"
          >
            {tag.tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tags;
