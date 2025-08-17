import React, { Fragment, useState } from "react";
import { Dialog, DialogPanel, Transition, Button } from "@headlessui/react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";

const ReportModal = ({ isOpen, close, commentId }) => {
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const feedbackOptions = ["Inappropriate language", "Child abuse", "Spam"];
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  }

  const handleReport = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/reportComment/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ feedback: report, userEmail: user.email }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Reported successfully.");
        close();
      } else {
        toast.error(data.message || "You have already reported this comment.");
        close();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      close();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-700 p-6 shadow-lg">
                <Dialog.Title className="text-lg dark:text-gray-300 font-main font-semibold mb-4">
                  Report this comment
                </Dialog.Title>
                <select
                  onChange={(e) => setReport(e.target.value)}
                  className="border outline-none font-medium border-gray-300 dark:text-white rounded p-2 font-main w-full text-center"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  {feedbackOptions.map((feedback, index) => (
                    <option key={index} className="dark:text-black" value={feedback}>
                      {feedback}
                    </option>
                  ))}
                </select>

                <div className="mt-6">
                 {
                  user ?  <Button
                    className={`w-full font-semibold rounded-md px-4 py-2 text-white ${
                      !report
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-main cursor-pointer"
                    }`}
                    onClick={handleReport}
                    disabled={!report}
                  >
                    Report
                  </Button> :  <button
                    className={`w-full font-semibold rounded-md font-main px-4 py-2 text-white bg-main cursor-pointer`}
                    onClick={handleLogin}
                 
                  >
                    Login to report the comment
                  </button>
                 }
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReportModal;
