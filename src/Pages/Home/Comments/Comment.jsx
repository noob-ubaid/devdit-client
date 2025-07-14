import React, { useState } from "react";
import useTimeAgo from "../../../hooks/useTimeAgo";
import Modal from "../../../Pages/Home/Modal/Modal";
import { Button } from "@headlessui/react";
const Comment = ({ comment }) => {
  const isLong = comment.comment.length > 20;
  const displayText = isLong ? comment.comment.slice(0, 120) : comment.comment;
  const time = useTimeAgo(comment.createdAt);
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
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
      <div className=" ">
        <p className="font-main font-medium text-gray-700 mt-2 ">
          {displayText}
          {isLong && (
            <Button
              onClick={open}
              className="font-semibold ml-1 cursor-pointer text-gray-900"
            >
              Read more...
            </Button>
          )}
        </p>
      </div>
      {isOpen && (
        <Modal
          close={close}
          comment={comment.comment}
          profile={comment.commenterImage}
          name={comment.commenterName}
          isOpen={isOpen}
          time={time}
        />
      )}
    </div>
  );
};

export default Comment;
