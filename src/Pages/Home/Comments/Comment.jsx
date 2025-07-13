import React from "react";
import useTimeAgo from "../../../hooks/useTimeAgo";
const Comment = ({ comment }) => {
  const time = useTimeAgo(comment.createdAt);
  return (
    <div className="bg-white p-2 md:p-4 rounded">
      <div className="flex items-center pb-3 border-b border-gray-300 justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <img
            className="rounded-full mx-auto size-8 md:size-12"
            src={comment.commenterImage}
            alt={comment.commenterName}
          />
          <p className="md:text-xl lg:text-2xl font-medium font-main">
            {comment.commenterName}
          </p>
        </div>
        <div>
          <p className="font-main md:text-xl lg:text-2xl font-medium">{time}</p>
        </div>
      </div>
      <div>
        <p className="font-main font-medium text-gray-700 mt-2 ">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
