import React, { useState, useEffect } from "react"; // useEffect যোগ করা হয়েছে
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { IoCloudUploadOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null); // ইমেজ প্রিভিউয়ের জন্য স্টেট
  const { createUserFunc, googleLogin, updateProfileFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    watch, // ইনপুট অবজার্ভ করার জন্য
    formState: { errors },
  } = useForm();

  // ফটো সিলেক্ট করলে সেটা ট্র্যাক করার জন্য
  const selectedPhoto = watch("photo");

  useEffect(() => {
    if (selectedPhoto && selectedPhoto[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedPhoto[0]);
    }
  }, [selectedPhoto]);

  const handleSubmitRegister = (data) => {
    // আপনার চাওয়া কোডটুকু এখানে যোগ করা হলো
    const profileImage = data.photo?.[0];
    if (!profileImage) {
      return toast.error("Please upload a profile photo.");
    }

    createUserFunc(data.email, data.password)
      .then((res) => {
        const firebaseUser = res.user;
        const formData = new FormData();
        formData.append("image", profileImage);

        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
            formData
          )
          .then((res) => {
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
                toast.success('Sign In successful');
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
        // ... আপনার আগের সব error handling লজিক এখানে থাকবে ...
        if (errorCode === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else {
          toast.error("Signup failed. Please try again.");
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
        axiosSecure.post("/users", userInfo).then(() => {
          toast.success("Google SignIn successful");
          navigate(from);
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google Sign-in failed.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 w-full max-w-[550px] overflow-hidden border border-gray-100">
        
        <div className="p-10 md:p-14">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black tracking-tighter text-primary mb-2">
              Style<span className="text-accent">Decor</span>
            </h1>
            <p className="text-gray-400 font-medium italic">Begin your aesthetic journey</p>
          </div>

          <form onSubmit={handleSubmit(handleSubmitRegister)} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">Full Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="John Doe"
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300 text-gray-700 outline-none shadow-sm"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">Name is required</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">Profile Identity</label>
              <div className="relative group">
                <input
                  type="file"
                  {...register("photo")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full px-5 py-6 bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                  {preview ? (
                    <img src={preview} alt="Profile Preview" className="w-20 h-20 object-cover rounded-full border-2 border-primary mb-2" />
                  ) : (
                    <IoCloudUploadOutline className="text-2xl text-primary mb-2" />
                  )}
                  <span className="text-sm font-semibold text-primary">
                    {preview ? "Change photo" : "Click to upload photo"}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase mt-1">PNG, JPG up to 5MB</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">Email Address</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="hello@example.com"
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300 text-gray-700 outline-none shadow-sm"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">Email is required</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300 text-gray-700 outline-none shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {show ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">Min. 6 characters required</p>}
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary  hover:bg-[#145a4d] text-white font-bold py-7 text-xl rounded-2xl  mt-2"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-[0.2em]">OR</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 border border-gray-100 rounded-2xl text-gray-600 font-bold hover:bg-gray-50 transition-all hover:cursor-pointer duration-300 active:scale-[0.98]"
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

          <p className="text-center mt-10 text-gray-500 font-medium">
            Already a member? <Link to="/login" className="text-primary font-bold hover:underline decoration-accent decoration-2 underline-offset-4">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;