import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Google from "../../shared/Google";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { UserInDb } from "../../Utils/utils";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {login,user} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const onSubmit =(data) => {
    login(data.email,data.password)
    .then(async(userCredential) => {
        const user = userCredential.user;
        toast.success("Successfully logged in")
        navigate(`${location.state ? location.state : "/"}`)
        const userData = {
          name : user.displayName,
          email : user.email,
          image : user.photoURL,
          role : 'user',
          createdAt : new Date().toISOString(),
          lastLoggedIn : new Date().toISOString()
        }
        await UserInDb(userData)
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-0">
      <div className="flex items-center justify-center my-20">
        <div className="card-body dark:bg-white max-w-md border border-[#0F0F0F26] rounded-md">
          <h2 className="text-2xl font-semibold mt-4 mb-2 border-b border-b-[#0F0F0F26] pb-4 text-center">Login Your Account</h2>

          <Google />
          <div className="divider">OR</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label text-[14px] font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input w-full mb-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

            <label className="label text-[14px] font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Must contain upper and lower case, min 6 characters" } })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

            <div className="mt-2 flex justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-neutral mt-4 w-full">Login</button>

            <p className="text-center text-[14px] mt-2 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-red-400 underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
