import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-main"></div>
    </div>
  );
};

export default Loader;
