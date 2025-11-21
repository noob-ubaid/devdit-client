import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/Loader";
import PostCard from "./PostCard";
import { Link } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiPlus,
  FiAward,
} from "react-icons/fi";

const MyProfile = () => {
  const { user } = useAuth();
  const [gender, setGender] = useState("");

  const {
    data: userInfo,
    isLoading: isInfoLoading,
    refetch,
  } = useQuery({
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
      toast.success("Profile updated successfully! 🎉");
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FiUser className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 dark:from-gray-100 dark:to-blue-400 bg-clip-text text-transparent">
                Complete Your Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Let's get to know you better
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="number"
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                </div>

                <div className="relative">
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Complete Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );

  return (
    <div className="py-8 px-4">
      {/* Profile Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* User Info */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  className="size-24 rounded-2xl border-4 border-white dark:border-gray-700 shadow-lg"
                  src={user?.photoURL}
                  alt={user?.displayName || "Profile"}
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white dark:border-gray-800">
                  <div className="size-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 dark:from-gray-100 dark:to-blue-400 bg-clip-text text-transparent">
                  {user?.displayName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                  <FiUser className="text-sm" />
                  {user?.email}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    <FiAward className="text-sm" />
                    {role?.role === "user" ? "Bronze Member" : "Gold Member"}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {userInfo.gender}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <FiPhone className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-semibold">{userInfo.number}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <FiMapPin className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="font-semibold">{userInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="text-center">
              <div className="bg-main rounded-2xl p-6 text-white shadow-lg">
                <div className="text-3xl font-bold">{posts.length}</div>
                <div className="text-sm opacity-90">Total Posts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          {posts.length === 0 ? (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl border border-white/20 dark:border-gray-700/20">
              <div className="max-w-md mx-auto">
                <h4 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Start Your Journey
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Share your first post and begin building your digital
                  presence. Your ideas matter, and the community is waiting to
                  hear from you.
                </p>
                <Link
                  to="/dashboard/addPost"
                  className="inline-flex items-center gap-2 bg-main text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <FiPlus className="text-lg" />
                  Create First Post
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 dark:from-gray-100 dark:to-blue-400 bg-clip-text text-transparent mb-4">
                  My Creative Space
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Your thoughts, ideas, and contributions to the community
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="transform hover:scale-105 transition-transform duration-200"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/dashboard/addPost"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <FiPlus className="text-lg" />
                  Add New Post
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
