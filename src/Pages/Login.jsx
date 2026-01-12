import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline, IoLogInOutline } from "react-icons/io5";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FiShield, FiUser } from "react-icons/fi";

const Login = () => {
  const { signInFunc, googleLogin } = useAuth();
  const [show, setShow] = useState(false);
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

 const handleDemoFillAdmin = () => {
  setValue("email", import.meta.env.VITE_DEMO_ADMIN_EMAIL || "");
  setValue("password", import.meta.env.VITE_DEMO_ADMIN_PASS || "");
  toast.success("Demo credentials filled!");
};
  const handleDemoFillUser = () => {
  setValue("email", import.meta.env.VITE_DEMO_USER_EMAIL || "");
  setValue("password", import.meta.env.VITE_DEMO_USER_PASS || "");
  toast.success("Demo credentials filled!");
};

  const handleLogin = (data) => {
    console.log(data);
    signInFunc(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(from);
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/invalid-email") {
          toast.error("Invalid email format. Please check and try again.");
        } else if (errorCode === "auth/user-disabled") {
          toast.error(
            "This account has been disabled. Contact support for help."
          );
        } else if (errorCode === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (errorCode === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (errorCode === "auth/too-many-requests") {
          toast.error("Too many attempts. Please wait and try again later.");
        } else if (errorCode === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Sign-in failed. Please try again.");
        }
        console.log(error.message);
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
        axiosSecure.post(`/users`, userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user push success", res.data);
            toast.success("sign In successful");
          }
        });
        toast.success("Google login successful");
        console.log(res.user);
        navigate(from);
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
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 w-full max-w-[500px] overflow-hidden border border-gray-100">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tighter text-primary mb-2">
              Style<span className="text-accent">Decor</span>
            </h1>
            <p className="text-gray-400 font-medium italic text-sm">
              Welcome back to your aesthetic home
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">Sign In</h2>
          <p className="text-gray-500 mb-6 font-medium text-sm">
            Manage your decoration appointments effortlessly.
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="hello@example.com"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300 text-gray-700 placeholder:text-gray-300 outline-none shadow-sm"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 ml-1">
                  Email is required
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300 text-gray-700 placeholder:text-gray-300 outline-none shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {show ? (
                    <IoEyeOutline size={18} />
                  ) : (
                    <IoEyeOffOutline size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1">
                  Password is required
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full btn btn-primary hover:bg-secondary text-white font-bold px-4 py-6 text-lg rounded-2xl mt-2"
            >
              <IoLogInOutline size={18} />
              Login
            </button>
           <div className="flex gap-4 mt-6">
  <button
    type="button"
    onClick={handleDemoFillAdmin}
    className="group flex-1 flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 active:scale-95"
  >
    <FiShield className="text-lg opacity-60 group-hover:opacity-100 transition-opacity" />
    <span>Admin Access</span>
  </button>

  <button
    type="button"
    onClick={handleDemoFillUser}
    className="group flex-1 flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 active:scale-95"
  >
    <FiUser className="text-lg opacity-60 group-hover:opacity-100 transition-opacity" />
    <span>User Access</span>
  </button>
</div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-bold tracking-[0.2em]">
                OR
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-100 rounded-2xl text-gray-600 font-bold hover:bg-gray-50 transition-all hover:cursor-pointer duration-300 active:scale-[0.98]"
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
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-500 font-medium text-sm">
            New here?{" "}
            <Link
              to="/register"
              className="text-primary font-bold hover:underline decoration-accent decoration-2 underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
