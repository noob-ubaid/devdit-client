// import { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import utc from "dayjs/plugin/utc";

// dayjs.extend(relativeTime);
// dayjs.extend(utc);

// const useTimeAgo = (timestamp) => {
//     const [timeAgo, setTimeAgo] = useState("Loading...");

//     useEffect(() => {
//         if (!timestamp) {
//             setTimeAgo("Just now");
//             return;
//         }

//         const update = () => {
//             const time = dayjs.utc(timestamp).fromNow(); 
//             setTimeAgo(time);
//         };
//         update(); 
//         const interval = setInterval(update, 30000); 

//         return () => clearInterval(interval);
//     }, [timestamp]);

//     return timeAgo;
// };

// export default useTimeAgo;








import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

/**
 * useTimeAgo
 * @param {string|Date} timestamp - ISO string or Date object
 * @returns {string} - e.g., "2 hours ago"
 */
const useTimeAgo = (timestamp) => {
  const getTimeAgo = () => {
    if (!timestamp) return "Just now";
    // If you want local time:
    // return dayjs(timestamp).fromNow();
    // If you want consistent UTC display:
    return dayjs.utc(timestamp).fromNow();
  };

  const [timeAgo, setTimeAgo] = useState(getTimeAgo);

  useEffect(() => {
    setTimeAgo(getTimeAgo()); // Ensure immediate update on mount

    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo());
    }, 30000); // update every 30s

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
};

export default useTimeAgo;
