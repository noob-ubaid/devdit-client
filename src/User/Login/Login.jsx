import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import Google from "../../shared/Google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle your login logic here (API call, Firebase auth, etc.)
    console.log("Logging in with:", email, password);
  };

  const handleGoogleLogin = () => {
    // Handle your Google login logic here (Firebase Google Auth, etc.)
    console.log("Logging in with Google");
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex items-center justify-center my-20">
        <div className="card-body dark:bg-white max-w-md border border-[#0F0F0F26] rounded-md">
          <h2 className="text-2xl font-semibold mt-4 mb-2 border-b border-b-[#0F0F0F26] pb-4 text-center">
            Login Your Account
          </h2>

          <Google></Google>
          <div className="divider">OR</div>
          <form>
            <label className="label text-[14px] font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full mb-2"
              placeholder="Email"
            />
            <label className="label text-[14px] font-medium mb-1">
              Password
            </label>
            <div className="">
              <input
                type="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                name="password"
                className="input w-full "
                placeholder="Password"
              />
            </div>
            <div className="mt-2 flex justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a className="link link-hover ">Forgot password?</a>
            </div>
            <button className={`btn btn-neutral mt-4 w-full`}>Login</button>
            <p className="text-center text-[14px] mt-2 font-medium">
              Don't have an account .{" "}
              <Link to={"/register"} className="text-red-400 underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
