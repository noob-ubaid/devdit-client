import React from "react";

const NoPosts = ({search}) => {
  return (
    <div className="w-full bg-gray-100 rounded-md my-6 md:my-10 py-8 md:py-12 ">
      <p className="font-main font-semibold text-2xl md:text-3xl text-center">
        🚫 No Posts Found
      </p>
      <p className="font-main font-medium text-xl mt-4 text-gray-800 md:text-2xl text-center">
        We couldn’t find any posts matching <span className="font-bold">{search}</span>. Try a different tag or keyword.
      </p>
    </div>
  );
};

export default NoPosts;
