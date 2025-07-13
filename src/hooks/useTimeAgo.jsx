import { useState, useEffect } from "react";

const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    return `${months} month${months !== 1 ? 's' : ''} ago`;
};

const useTimeAgo = (timestamp) => {
    const [timeAgo, setTimeAgo] = useState(() => calculateTimeAgo(timestamp));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(calculateTimeAgo(timestamp));
        }, 60000); // update every 1 minute

        return () => clearInterval(interval);
    }, [timestamp]);

    return timeAgo;
};

export default useTimeAgo;
