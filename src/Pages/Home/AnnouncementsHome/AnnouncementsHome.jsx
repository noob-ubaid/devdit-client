import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/Loader";

const AnnouncementsHome = () => {
  const { data: announcement = [], isLoading } = useQuery({
    queryKey: ["announcementHome"],
    queryFn: async () => {
      const res = await axiosSecure("/announcement");
      return res.data;
    },
  });
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium md:font-semibold font-main mt-10 md:mt-14">
        Recent announcements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-6 md:my-10  lg:grid-cols-3 gap-6 md:gap-8">
        {announcement.map((announce) => (
          <div key={announce._id} className="bg-gray-200 rounded-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b border-gray-400 pb-4">
              <div className="flex items-center  gap-2 md:gap-4">
                <img
                  className="rounded-full size-10 md:size-14"
                  src={announce.authorImage}
                  alt={announce.title}
                />
                <p className="text-xl md:text-2xl font-medium font-main">
                  {announce.authorName}
                </p>
              </div>
              <div>
                <p className="bg-blue-200 font-medium sm:px-3 py-1 px-2 rounded-full text-blue-800">Admin</p>
              </div>
            </div>
            <div className="my-4">
              <p className="text-xl md:text-2xl md:text-left font-main font-semibold">
                {announce.title}
              </p>
              <p className="text-lg md:text-left font-second font-medium">
                {announce.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsHome;
