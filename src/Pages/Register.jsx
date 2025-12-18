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
            {/* Name Field */}
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

            {/* Photo Upload with Preview Section */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">Profile Identity</label>
              <div className="relative group">
                <input
                  type="file"
                  {...register("photo")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full px-5 py-6 bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                  {/* প্রিভিউ দেখানোর লজিক */}
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

            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500 ml-1">Secret Password</label>
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
              className="w-full bg-primary hover:bg-[#145a4d] text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 active:scale-[0.98] mt-4"
            >
              Create Account
            </button>
          </form>

          {/* ... Divider & Google Login (আপনার কোড অনুযায়ী) ... */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-[0.2em]">Social Access</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 border border-gray-100 rounded-2xl text-gray-600 font-bold hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
          >
            {/* Google SVG */}
            Continue with Google
          </button>

          <p className="text-center mt-10 text-gray-500 font-medium">
            Already a member? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;