import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  Button,
} from "@headlessui/react";

const Modal = ({ isOpen, close, comment, profile, name, time }) => {
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
                <div className="flex items-center pb-3 border-b border-gray-300 justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full size-8 md:size-12"
                      src={profile}
                      alt={name}
                    />
                    <p className="text-xl font-medium font-main">{name}</p>
                  </div>
                  <p className="font-main text-base font-medium text-gray-500">{time}</p>
                </div>
                <p className="mt-4 text-gray-800 font-main whitespace-pre-wrap">
                  {comment}
                </p>
                <div className="mt-6">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-white font-semibold hover:bg-gray-600 transition"
                    onClick={close}
                  >
                    Got it, thanks!
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

export default Modal;
