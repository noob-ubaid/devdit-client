import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (emailData) => {
      const res = await axiosSecure.post("/subscribers", emailData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thank you for subscribing!");
      setEmail("");
    },
    onError: () => {
      toast.error("Failed to subscribe. Try again later.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    const emailData = {
      email,
      subscribedAt: new Date(),
    };

    mutation.mutate(emailData);
  };

  return (
    <div className=" rounded-md p-8 mt-10 md:mt-14 text-center">
      <h2 className="text-3xl md:text-4xl font-main font-bold dark:text-gray-300">
        Stay Updated with Devdit
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 font-main md:text-lg">
        Get weekly updates on trending discussions, new features, and community news.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4"
      >
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-3 w-full sm:w-80 font-main rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 outline-none"
        />
        <button
          type="submit"
          className="bg-main text-white cursor-pointer px-6 py-3 rounded-md font-medium font-main hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSection;
