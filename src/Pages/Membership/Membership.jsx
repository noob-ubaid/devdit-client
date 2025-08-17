import React from "react";
import PaymentForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useRole from "../../hooks/useRole";
import { useNavigate } from "react-router";
import Loader from "../../shared/Loader";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Membership = () => {
  const [role, isPending] = useRole();
  const navigate = useNavigate();
  if (role === "member") {
    return (
      <div className="max-w-xl mx-auto my-20 py-12 px-12 md:py-16 bg-green-100 dark:bg-gray-800 rounded-md text-center">
        <h2 className="text-2xl md:text-3xl dark:text-gray-300 font-semibold text-green-800 font-main">
          🎉 You are already a member!
        </h2>
        <p className="mt-4 text-green-700 dark:text-gray-300 font-second">
          Thank you for supporting us. As a member, you can post unlimited
          content, access exclusive resources, and contribute more actively to
          our community.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-main hover:bg-main/90 text-white font-semibold px-6 py-3 rounded-full cursor-pointer duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }
  if (isPending) return <Loader />;
  return (
    <div className="my-16">
      <h4 className="text-2xl md:text-3xl font-semibold dark:text-gray-300 font-main text-center mt-10">
        Become a Member and Unlock More Features
      </h4>
      <p className="font-main md:text-xl text-lg font-medium dark:text-gray-300 text-center my-6 max-w-3xl mx-auto">
        Become a valued member of our forum community to post unlimited content,
        receive a Gold Badge, and support the platform.
      </p>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Membership;
