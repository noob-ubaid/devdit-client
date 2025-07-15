import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  Button,
} from "@headlessui/react";
const ReportModal = ({ isOpen, close }) => {
  const [report, setReport] = useState(null);
  const feedbackOptions = ["Inappropriate language", "Child abuse", "Spam"];
  console.log(report);
  const handleClose = () => {
    // close();
    console.log("report done");
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-900"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-900"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <div className="w-full mt-4">
                  <select
                    onChange={(e) => setReport(e.target.value)}
                    className="border outline-none font-medium  border-gray-300 rounded p-2 font-main w-full text-center"
                  >
                    {feedbackOptions.map((feedback, index) => (
                      <option key={index} value={feedback}>
                        {feedback}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-6">
                  <Button
                    className={`w-full gap-2 font-semibold rounded-md  px-4 py-2 text-white ${
                      !report
                        ? "bg-gray-300 cursor-not-allowed"
                        : " bg-main cursor-pointer"
                    }`}
                    onClick={handleClose}
                    disabled={!report}
                  >
                    Report
                  </Button>
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
