import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import "../Membership/checkoutForm.css";
import { ClipLoader } from "react-spinners";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getClientSecret = async () => {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: 200,
      });
      setClientSecret(data.clientSecret);
    };
    getClientSecret();
  }, []);
  const handleNavigate = () => {
    navigate("/login");
  };
  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setProcessing(false);
      return;
    } else {
      setError(null);
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    if (result?.error) {
      setError(result?.error?.message);
      return;
    }
    if (result?.paymentIntent?.status === "succeeded") {
      try {
        const { data } = await axiosSecure.patch(
          `/becomeMember/${user?.email}`
        );
        if (data.modifiedCount > 0) {
          toast.success("You have become a member!");
        } else {
          toast.error("Membership upgrade failed");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setProcessing(false);
        setError(null);
      }
    }
  };

  return (
    <form
      className="max-w-md mx-auto my-8 md:my-12 rounded-md bg-gray-200 p-5"
      onSubmit={handleSubmit}
    >
      <h2 className="font-medium font-main text-2xl md:text-3xl text-center my-4">
        Become a member
      </h2>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#111",
              "::placeholder": {
                color: "#111",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && (
        <p className="text-red-500 font-medium font-main mb-2">{error}</p>
      )}
      {user ? (
        <button
          className="w-full bg-main rounded font-main text-center py-2 text-white  font-semibold"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? (
            <ClipLoader size={25} color="white" className="mt-2" />
          ) : (
            "Pay 200$"
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNavigate}
          className="w-full bg-main rounded font-main text-center py-2 text-white  font-medium"
        >
          Login to become a member
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
