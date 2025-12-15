import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const [show, setShow] = useState(false);
  const { createUserFunc, googleLogin, updateProfileFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitRegister = (data) => {
    // console.log("hello", data.photo[0]);
    const profileImage = data.photo[0];
    createUserFunc(data.email, data.password)
      .then((res) => {
        const firebaseUser = res.user;
        console.log(res);
        const formData = new FormData();
        formData.append("image", profileImage);

        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_API
            }`,
            formData
          )
          .then((res) => {
            // console.log("after image upload", res.data.data.url);
            const photoURL = res.data.data.url;

            const updateData = {
              displayName: data.name,
              photoURL: photoURL,
            };

            updateProfileFunc(updateData)
              .then(() => {
                const userInfo = {
                  displayName: data.name,
                  email: firebaseUser.email,
                  photoURL: photoURL,
                };
                axiosSecure.post(`/users`, userInfo).then((res) => {
                  if (res.data.insertedId) {
                    console.log("user push success", res.data);
                  }
                });
                console.log("updated success");
                toast.success('sign In successful')
                navigate(from);
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;

        if (errorCode === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Try signing in instead."
          );
        } else if (errorCode === "auth/invalid-email") {
          toast.error(
            "The email address is not valid. Please check and try again."
          );
        } else if (errorCode === "auth/weak-password") {
          toast.error(
            "Password is too weak. Use at least 6 characters with uppercase and lowercase letters."
          );
        } else if (errorCode === "auth/invalid-profile-attribute") {
          toast.error("photo URL is too long");
        } else if (errorCode === "auth/operation-not-allowed") {
          toast.error(
            "Email/password signup is currently disabled. Please contact support."
          );
        } else if (errorCode === "auth/network-request-failed") {
          toast.error(
            "Network error. Please check your internet connection and try again."
          );
        } else if (errorCode === "auth/internal-error") {
          toast.error(
            "Something went wrong on our end. Please try again later."
          );
        } else {
          toast.error("Signup failed. Please try again or contact support.");
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const userInfo = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("google user push success,", res.data);
          }
          console.log(res.data);
          toast.success("Google SignIn successful");
          navigate(from);
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in popup was closed before completion.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Google Sign-in failed. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden w-full max-w-xl">
        <div className="bg-primary text-white p-6 text-center">
          <h1 className="text-3xl font-bold">StyleDecor</h1>
          <p className="opacity-90 mt-1">Create your decoration account</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-secondary mb-1">
            Create Account
          </h2>
          <p className="text-gray-600 mb-6">
            Register to book decoration services
          </p>

          <form
            onSubmit={handleSubmit(handleSubmitRegister)}
            className="space-y-5"
          >
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your full name"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoComplete="name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600">Name is required</p>
              )}
            </div>

            {/* Photo Upload Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                {...register("photo")}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a photo for your profile
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="your@email.com"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="Create a password"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="hover:cursor-pointer absolute right-3 top-3  z-10"
                >
                  {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Create StyleDecor Account
            </button>
          </form>

          <div className="divider my-8 text-gray-400">Or</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full gap-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Register with Google
          </button>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link
              state={location?.state}
              to="/login"
              className="text-primary hover:text-secondary font-medium transition-colors duration-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
