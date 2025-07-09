import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/LOader";
import { FaComments, FaTrash } from "react-icons/fa";

const MyPost = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [user]);
  if (loading) return <Loader />;
  return (
    <div>
      <h2 className="text-center font-medium text-2xl md:text-3xl mt-3">
        My Posts
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-200 text-base font-medium">
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Post Title</th>
              <th className="text-center">Votes</th>
              <th className="text-center">Comments</th>
              <th className="text-center">Delete Post</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <td className="text-center">{index + 1}</td>
                <td className="max-w-[200px] font-medium text-center truncate">
                  {post.title}
                </td>
                <td className="text-center">213</td>
                <td className="text-center">
                  <p className="px-3 py-1 border-main mx-auto border w-fit rounded-full cursor-pointer hover:text-white font-medium hover:bg-main duration-300">
                    View Comments
                  </p>
                </td>
                <td className="text-center">
                  <p className="px-3 py-1 mx-auto border-red-600 border w-fit rounded-full cursor-pointer hover:text-white font-medium hover:bg-red-600 duration-300">
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
