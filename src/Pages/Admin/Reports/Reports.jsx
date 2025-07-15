import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/Loader";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
const Reports = () => {
  const {
    data: reports,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure(`/reports`);
      return res.data;
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
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
        Reported Comments
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base">
            <tr className="text-center font-main ">
              <th>#</th>
              <th>Commenter Email</th>
              <th>Reporter Email</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={report._id} className="text-center">
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
                  {report.status === 'Resolved' ? <span className="text-green-800">Deleted</span> : <button onClick={() => handleDelete(report._id)}>
                    <MdDelete className="mx-auto cursor-pointer" size={25} />
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
