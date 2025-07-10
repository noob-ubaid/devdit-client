import React from "react";

const PostCard = ({ post }) => {
  const { name, tag, title, image, date, _id, UpVote, DownVote } = post;
  return (
    <div>
      <div className="flex items-center border justify-between ">
        <div className="flex items-center gap-2 md:gap-3">
          <img className="size-8 md:size-10 rounded-full" src={image} alt="" />
          <div>
            <p className="md:text-xl text-lg font-main md:font-bold font-semibold ">
              {name}
            </p>
          </div>
        </div>
        <p className="md:text-xl text-lg font-main md:font-bold font-semibold ">
          {date}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
