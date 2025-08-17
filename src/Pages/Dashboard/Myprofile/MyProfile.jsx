import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/Loader";
import PostCard from "./PostCard";
import { Link } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user } = useAuth();
  const [gender, setGender] = useState("");

  const { data: userInfo, isLoading: isInfoLoading , refetch} = useQuery({
  queryKey: ["userInfo", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/info/${user.email}`);
    return res.data; 
  },
});

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: posts = [], isLoading: isPostsLoading } = useQuery({
    queryKey: ["userPosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile/${user.email}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/info", formData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Form submitted successfully")
      refetch();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const number = e.target.number.value;
    const address = e.target.address.value;
    const data = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      number,
      address,
      gender,
      role: role.role,
    };
    mutation.mutate(data);
  };

  if (isRoleLoading || isPostsLoading || isInfoLoading) return <Loader />;

  if (!userInfo)
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-6 mt-10 rounded-md ">
        <h3 className="text-2xl md:text-3xl lg:text-4xl text-center font-main font-semibold mb-4 dark:text-gray-300">
          Update Your Profile
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1 font-main dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="number"
              name="number"
              placeholder="Enter your number"
              className="w-full p-2 rounded border outline-none font-main border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 font-main dark:text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              className="w-full p-2 rounded border font-main outline-none border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 font-main dark:text-gray-300">
              Gender
            </label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 rounded border font-main outline-none border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            >
              <option className="font-main" value="">
                Select Gender
              </option>
              <option className="font-main" value="male">
                Male
              </option>
              <option className="font-main" value="female">
                Female
              </option>
              <option className="font-main" value="other">
                Other
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-main text-white w-full px-6 py-2 rounded font-medium font-main hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    );

  return (
    <div>
      {/* Profile Section */}
      <div className="flex items-center flex-col dark:bg-gray-800 dark:text-gray-300 md:flex-row justify-between mt-6 md:mt-0 gap-5 bg-base-200 p-6 rounded-md">
        <div className="flex items-center gap-2 md:gap-4">
          <img
            className="size-14 md:size-16 rounded-full"
            src={user?.photoURL}
            alt={user?.displayName || "Profile"}
          />
          <div>
            <p className="text-xl font-main md:font-bold font-semibold">
              {user?.displayName}
            </p>
            <p className="text-lg font-main font-medium md:font-semibold">
              {user?.email}
            </p>
          </div>
        </div>
        <div>
          <p className="font-main font-medium text-center text-lg">{userInfo.number}</p>
          <p className="font-main font-medium text-center text-lg">{userInfo.address}</p>
        </div>
        <div>
          <button className="bg-main font-medium mt-3 md:mt-0 font-second px-3 py-1 rounded-full text-white">
            {role?.role === "user" ? "Bronze" : "Gold"}
          </button>
          <p className="font-medium text-lg font-main text-center mt-1">{userInfo.gender}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        {posts.length === 0 ? (
          <div className="bg-[rgba(15,15,15,0.05)] dark:bg-gray-800 dark:text-gray-300 w-full py-16 md:mb-28 text-center px-4 md:px-0 mt-6 md:mt-10 rounded-md">
            <h4 className="font-semibold font-main  text-2xl dark:text-gray-300  md:text-3xl text-[#141414]">
              You haven’t added any posts yet
            </h4>
            <p className="mt-4 font-second max-w-2xl text-center dark:text-gray-300  mx-auto text-[#141414B3]">
              Start building your presence by adding your first post, sharing
              your ideas with others, and growing your knowledge within the
              community.
            </p>
            <div className="mt-10">
              <Link
                to="/dashboard/addPost"
                className="bg-main mt-6 text-white font-second font-medium px-8 py-3 rounded-full"
              >
                Add Post
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-2xl dark:text-gray-300  md:text-3xl lg:text-4xl font-medium font-main mt-10 md:mt-14">
              My Recent posts
            </h2>
            <div className="grid grid-cols-1 mt-8 md:mt-12 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
