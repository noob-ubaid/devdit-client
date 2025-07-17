import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/Loader";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const MyPost = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
const [currentPage, setCurrentPage] = useState(0);
  const { data: posts = {result : [],count : 0}, isLoading } = useQuery({
    queryKey: ["myPosts", user?.email,currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user.email}?page=${currentPage}`);
      return res.data;
    },
  });
  const count = posts?.count;
  const numberOfPages = Math.ceil(count / 5);
  const pages = [...Array(numberOfPages).keys()];
  const handlePrevPage = () => setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/post/${id}`);
      return res.data;
    },
    onSuccess: (_, id) => {
      Swal.fire("Deleted!", "Your post has been deleted.", "success");
      queryClient.setQueryData(["myPosts", user?.email], (oldData) =>
        oldData.filter((post) => post._id !== id)
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostMutation.mutate(id);
      }
    });
  };


  if (isLoading) return <Loader />;

  if ( posts.result.length === 0) {
    return (
      <div className="bg-[rgba(15,15,15,0.05)] w-full py-16 md:mb-28 text-center px-4 md:px-0 mt-6 md:mt-10 rounded-md">
        <h4 className="font-semibold font-main text-2xl md:text-3xl text-[#141414]">
          You haven’t added any posts yet
        </h4>
        <p className="mt-4 font-second max-w-2xl text-center mx-auto text-[#141414B3]">
          Start building your presence by adding your first post, sharing your
          ideas with others, and growing your knowledge within the community.
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
    );
  }

  return (
    <div>
      <h2 className="text-center font-medium font-main text-2xl md:text-3xl lg:text-4xl mt-3">
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
            {posts.result.map((post, index) => (
              <tr key={post._id}>
                <td className="text-center">{index + 1}</td>
                <td className="max-w-[200px] font-second font-medium text-center truncate">
                  {post.title}
                </td>
                <td className="text-center font-second">{post.UpVote}</td>
                <td className="text-center font-second">{post.DownVote}</td>
                <td className="text-center">
                  <Link to={`/comments/${post._id}`} className="md:px-3 px-2 font-second py-1 border-main mx-auto border w-fit rounded-full cursor-pointer hover:text-white md:font-medium hover:bg-main duration-300">
                     Comments
                  </Link>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="md:px-3 px-2 font-second py-1 mx-auto border-red-600 border w-fit rounded-full cursor-pointer hover:text-white md:font-medium hover:bg-red-600 duration-300"
                  >
                    Delete 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-6 md:mt-10 items-center justify-center ">
        <div>
          {numberOfPages > 1 && (
            <div className="flex items-center mb-6 md:mb-10 justify-center">
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  disabled={currentPage < 1}
                  onClick={handlePrevPage}
                  className={`bg-gray-300 px-3 py-2 rounded font-medium font-main ${
                    currentPage < 1
                      ? "cursor-not-allowed bg-gray-100"
                      : "cursor-pointer"
                  }`}
                >
                  Prev
                </button>
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-main px-4 font-medium py-2 cursor-pointer rounded text-white "
                        : "bg-gray-300 font-medium px-4 cursor-pointer py-2 rounded text-black "
                    }
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === pages.length - 1}
                  onClick={handleNextPage}
                  className={`bg-gray-300 px-3 py-2 rounded font-medium font-main ${
                    currentPage === pages.length - 1
                      ? "cursor-not-allowed bg-gray-100"
                      : "cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
