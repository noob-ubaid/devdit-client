import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Google from "../../shared/Google";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { UserInDb } from "../../Utils/utils";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation()
  const { register: signUp, setUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    signUp(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        updateUser({ displayName: data.name, photoURL: data.photo })
          .then(() => {
            toast.success("Successfully logged in");
            setUser({ ...user, displayName: data.name, photoURL: data.photo });
          })
          .then((error) => {
            setUser(user);
            toast(error);
          });
        navigate(`${location.state ? location.state : "/"}`)
        const userData = {
          name: data.name,
          email: data.email,
          image: data.photo,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLoggedIn: new Date().toISOString(),
        };
        await UserInDb(userData);
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-20  px-4 md:px-0">
      <div className="flex items-center justify-center">
        <div className="card-body max-w-md border dark:bg-white border-[#0F0F0F26] rounded-md">
          <h2 className="text-2xl font-semibold mt-4 mb-2 border-b border-b-[#0F0F0F26] pb-4 text-center">
            Register Your Account
          </h2>

          <Google />
          <div className="divider">OR</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label text-[14px] font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input w-full"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            <label className="label text-[14px] mt-2 font-medium mb-1">
              Choose Your Profile Photo
            </label>
            <input
              type="text"
              placeholder="Enter your photo url"
              {...register("photo", { required: "Profile photo is required" })}
              className="input w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}

            <label className="label text-[14px] mt-2 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            <label className="label text-[14px] mt-2 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "Must contain upper and lower case, min 6 characters",
                },
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Register
            </button>

            <p className="text-center text-[14px] mt-2 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-red-400 underline">
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
