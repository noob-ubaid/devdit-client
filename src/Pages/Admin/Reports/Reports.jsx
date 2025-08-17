import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/Loader";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
const Reports = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    data: reports = { reports: [], count: 0 },
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["reports", currentPage],
    queryFn: async () => {
      const res = await axiosSecure(`/reports?page=${currentPage}`);
      return res.data;
    },
  });
  const count = reports?.count;
  const numberOfPages = Math.ceil(count / 5);
  const pages = [...Array(numberOfPages).keys()];
  const handlePrevPage = () => setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/deleteReportedComment/${id}`);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "The reported comment has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
        }
        refetch();
      }
    });
  };
  if (isPending) return <Loader />;
  return (
    <div>
      <h2 className="text-2xl md:text-3xl dark:text-gray-300 font-semibold text-center mb-4">
        Reported Comments
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table w-full">
          <thead className="bg-base-200 text-base">
            <tr className="text-center font-main dark:bg-gray-800 dark:text-gray-300">
              <th>#</th>
              <th>Commenter Email</th>
              <th>Reporter Email</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports?.reports.map((report, idx) => (
              <tr key={report._id} className="text-center dark:text-gray-300">
                <td>{idx + 1}</td>
                <td className="font-medium font-main text-base md:text-lg">
                  {report.commenterEmail}
                </td>
                <td className="font-medium font-main text-base md:text-lg">
                  {report.reporterEmail}
                </td>
                <td className="font-medium font-main text-base md:text-lg">
                  {report.feedback}
                </td>
                <td className="font-medium font-main ">
                  <span
                    className={`${
                      report.status === "Pending"
                        ? "bg-red-200 text-red-600"
                        : "bg-green-100 text-green-800"
                    } w-fit rounded-full px-4 py-1 block mx-auto`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="font-medium  font-main text-base md:text-lg">
                  {report.status === "Resolved" ? (
                    <span className="text-green-800">Deleted</span>
                  ) : (
                    <button onClick={() => handleDelete(report._id)}>
                      <MdDelete className="mx-auto cursor-pointer" size={25} />
                    </button>
                  )}
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

export default Reports;
