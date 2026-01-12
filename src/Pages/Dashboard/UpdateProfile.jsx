import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { FaCamera, FaUserEdit, FaArrowLeft } from "react-icons/fa";
import Loading from "../../Components/Loading";

const UpdateProfile = () => {
  const { user, loading, updateProfileFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });

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

  const handleUpdate = async (data) => {
    setIsUpdating(true);
    let photoURL = user?.photoURL;

    try {
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
          formData
        );
        photoURL = res.data.data.url;
      }

      const updateData = {
        displayName: data.name,
        photoURL: photoURL,
      };
      await updateProfileFunc(updateData);

      const userInfo = {
        displayName: data.name,
        photoURL: photoURL,
      };
      const dbRes = await axiosSecure.patch(`/users/${user?.email}`, userInfo);

      if (dbRes.data.modifiedCount > 0 || dbRes.status === 200) {
        toast.success("Profile updated successfully!");
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10 relative">
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-8 text-gray-400 hover:text-primary transition-colors"
        >
          <FaArrowLeft size={18} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-primary tracking-tight">Update Profile</h2>
          <p className="text-gray-400 text-sm font-medium italic mt-1">Refine your aesthetic identity</p>
        </div>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full p-1 bg-accent to-primary">
                <img
                  src={preview || user?.photoURL || "/default-user.png"}
                  alt="Preview"
                  className="w-full h-full rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>
              <label className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 border border-gray-100 text-primary">
                <FaCamera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("photo")}
                />
              </label>
            </div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mt-4 tracking-widest">Profile Picture</p>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300 outline-none font-bold text-gray-700 shadow-sm"
                placeholder="Enter your name"
              />
              <FaUserEdit className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>
            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-2 opacity-60">
            <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-5 py-4 bg-gray-100 border-none rounded-2xl cursor-not-allowed font-bold text-gray-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white transition-all shadow-lg 
              ${isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90 shadow-primary/20 active:scale-95"}`}
          >
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;