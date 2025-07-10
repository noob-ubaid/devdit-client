import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/LOader";
import { Link } from "react-router";

const MyPost = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/posts/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [user]);
  if (loading) return <Loader />;
  if (!posts || posts.length === 0) {
  return (
     <div className="bg-[rgba(15,15,15,0.05)] w-full py-16 md:mb-28 text-center px-4 md:px-0 mt-6 md:mt-10 rounded-md">
      <h4 className="font-semibold font-main text-2xl md:text-3xl text-[#141414]">
        You haven’t added any posts yet
      </h4>
      <p className="mt-4 font-second max-w-2xl text-center mx-auto text-[#141414B3]">
 Start building your presence by adding your first post, sharing your ideas with others, and growing your knowledge within the community.      </p>
      <div className="mt-10">
        <Link
          to="/dashboard/addPost"
          className="bg-main mt-6 text-white font-second font-medium px-8 py-3 rounded-full"
        >
          Add Post
        </Link>
      </div>
    </div>
  );
}
  return (
    <div>
      <h2 className="text-center font-medium font-main text-2xl md:text-3xl mt-3">
        My Posts
      </h2>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra border border-gray-300 rounded w-full">
          {/* Table Head */}
          <thead className="bg-base-200 text-base font-medium">
            <tr>
              <th className="text-center font-second">#</th>
              <th className="text-center font-second">Post Title</th>
              <th className="text-center font-second">Up Votes</th>
              <th className="text-center font-second">Down Votes</th>
              <th className="text-center font-second">Comments</th>
              <th className="text-center font-second">Delete Post</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <td className="text-center">{index + 1}</td>
                <td className="max-w-[200px] font-second font-medium text-center truncate">
                  {post.title}
                </td>
                <td className="text-center font-second">{post.UpVote}</td>
                <td className="text-center font-second">{post.DownVote}</td>
                <td className="text-center">
                  <p className="md:px-3 px-2 font-second py-1 border-main mx-auto border w-fit rounded-full cursor-pointer hover:text-white  md:font-medium hover:bg-main duration-300">
                    View Comments
                  </p>
                </td>
                <td className="text-center">
                  <p className="md:px-3 px-2 font-second py-1 mx-auto border-red-600 border w-fit rounded-full cursor-pointer hover:text-white  md:font-medium hover:bg-red-600 duration-300">
                    Delete Post
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPost;
