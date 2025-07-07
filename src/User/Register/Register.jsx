import React from 'react';
import { Link } from 'react-router';
import Google from '../../shared/Google';

const Register = () => {
    return (
         <div className=" my-20">
      <div className="flex items-center justify-center ">
        <div className="card-body max-w-md border dark:bg-white border-[#0F0F0F26] rounded-md">
          <h2 className="text-2xl font-semibold mt-4 mb-2 border-b border-b-[#0F0F0F26] pb-4 text-center">
            Register Your Account
          </h2>

          <Google></Google>
            <div className="divider">OR</div>
          <form  className="">
            {/* Name  */}
            <label className="label text-[14px] font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Enter your name"
            />
            {/* photo */}
            <label className="label text-[14px] mt-2 font-medium mb-1">
              Choose Your Profile Photo
            </label>
            <input
              type="file"
              name="photo"
              className="bg-gray-200 p-2 w-full"
            />
            {/* email  */}
            <label className="label text-[14px] mt-2 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
            />
            {/* password  */}
            <label className="label text-[14px] mt-2 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                type="password"
                name="password"
                className="input w-full"
                placeholder="Password"
              />
              <button type="button" className="cursor-pointer"></button>
            </div>
            <button type="submit" className="btn btn-neutral w-full mt-4">
              Register
            </button>
            <p className="text-center text-[14px] mt-2 font-medium">
              Already have an account .{" "}
              <Link to={"/login"} className="text-red-400 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Register;