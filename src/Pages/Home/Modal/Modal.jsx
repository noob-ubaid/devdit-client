import React from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
const Modal = ({ isOpen, close, comment, profile, name, time }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-black/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="flex items-center pb-3 border-b border-gray-400 justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full mx-auto size-8 md:size-12"
                  src={profile}
                  alt={name}
                />
                <p className="text-xl font-medium font-main">
                  {name}
                </p>
              </div>
              <div>
                <p className="font-main text-xl font-medium">
                  {time}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm/6 text-black font-main font-medium">
              {comment}
            </p>
            <div className="mt-2">
              <Button
                className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                onClick={close}
              >
                Got it, thanks!
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
