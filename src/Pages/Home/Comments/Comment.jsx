// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import useTimeAgo from "../../../hooks/useTimeAgo";
// import Modal from "../../../Pages/Home/Modal/Modal";
// import { Button } from "@headlessui/react";
// import { HiDotsVertical } from "react-icons/hi";
// import ReportModal from "../Modal/ReportModal";

// const dropdownVariants = {
//   hidden: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
// };

// const Comment = ({ comment }) => {
//   const isLong = comment.comment.length > 20;
//   const displayText = isLong ? comment.comment.slice(0, 100) : comment.comment;
//   const time = useTimeAgo(comment.createdAt);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isReport, setIsReport] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef();

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   function open() {
//     setIsOpen(true);
//   }

//   function close() {
//     setIsOpen(false);
//   }
//   function ReportOpen() {
//     setIsReport(true);
//   }

//   function ReportClose() {
//     setIsReport(false);
//   }

//   return (
//     <div className="bg-white p-3 md:p-4 rounded relative">
//       <div className="flex items-center pb-3 border-b border-gray-300 justify-between">
//         <div className="flex items-center gap-2 md:gap-4">
//           <img
//             className="rounded-full mx-auto size-12 md:size-14"
//             src={comment.commenterImage}
//             alt={comment.commenterName}
//           />
//           <div>
//             <p className="text-lg md:text-xl font-medium font-main">
//               {comment.commenterName}
//             </p>
//             <p className="font-main text-lg md:text-xl font-medium">{time}</p>
//           </div>
//         </div>
//         <div>
//           <div className=" relative" ref={dropdownRef}>
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="focus:outline-none cursor-pointer p-2 duration-300 transition-all hover:bg-gray-200 rounded-full"
//               aria-label="More options"
//             >
//               <HiDotsVertical size={20} />
//             </button>

//             <AnimatePresence>
//               {dropdownOpen && (
//                 <motion.div
//                   initial="hidden"
//                   animate="visible"
//                   exit="hidden"
//                   variants={dropdownVariants}
//                   className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-md z-10"
//                 >
//                   <ul>
//                     <li
//                       onClick={ReportOpen}
//                       className="px-4 py-2 font-main text-center font-medium hover:bg-gray-100 cursor-pointer"
//                     >
//                       Report
//                     </li>
//                   </ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       <div className=" mt-3 ">
//         <p className="font-main font-medium text-gray-700 ">
//           {displayText}
//           {isLong && (
//             <Button
//               onClick={open}
//               className="font-semibold cursor-pointer text-gray-900"
//             >
//               Read more...
//             </Button>
//           )}
//         </p>
//       </div>

//       {isOpen && (
//         <Modal
//           close={close}
//           comment={comment.comment}
//           profile={comment.commenterImage}
//           name={comment.commenterName}
//           isOpen={isOpen}
//           time={time}
//         />
//       )}
//       {isReport && <ReportModal close={ReportClose} isOpen={isReport} />}
//     </div>
//   );
// };

// export default Comment;










import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTimeAgo from "../../../hooks/useTimeAgo";
import Modal from "../../../Pages/Home/Modal/Modal";
import { Button } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";
import ReportModal from "../Modal/ReportModal";

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

const Comment = ({ comment }) => {
  const isLong = comment.comment.length > 20;
  const displayText = isLong ? comment.comment.slice(0, 100) : comment.comment;
  const time = useTimeAgo(comment.createdAt);
  const [isOpen, setIsOpen] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  function ReportOpen() {
    setIsReport(true);
  }
  function ReportClose() {
    setIsReport(false);
  }

  return (
    <div className="bg-white p-3 md:p-4 rounded relative">
      <div className="flex items-center pb-3 border-b border-gray-300 justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <img
            className="rounded-full mx-auto size-12 md:size-14"
            src={comment.commenterImage}
            alt={comment.commenterName}
          />
          <div>
            <p className="text-lg md:text-xl font-medium font-main">
              {comment.commenterName}
            </p>
            <p className="font-main text-lg md:text-xl font-medium">{time}</p>
          </div>
        </div>
        <div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none cursor-pointer p-2 transition-all hover:bg-gray-200 rounded-full"
              aria-label="More options"
            >
              <HiDotsVertical size={20} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-md z-10"
                >
                  <ul>
                    <li
                      onClick={ReportOpen}
                      className="px-4 py-2 font-main text-center font-medium hover:bg-gray-100 cursor-pointer"
                    >
                      Report
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="font-main font-medium text-gray-700">
          {displayText}
          {isLong && (
            <Button
              onClick={open}
              className="font-semibold cursor-pointer text-gray-900 ml-1"
            >
              Read more...
            </Button>
          )}
        </p>
      </div>

      {isOpen && (
        <Modal
          close={close}
          comment={comment.comment}
          profile={comment.commenterImage}
          name={comment.commenterName}
          isOpen={isOpen}
          time={time}
        />
      )}
      {isReport && (
        <ReportModal
          close={ReportClose}
          isOpen={isReport}
          commentId={comment._id} // Pass for backend reporting
        />
      )}
    </div>
  );
};

export default Comment;
