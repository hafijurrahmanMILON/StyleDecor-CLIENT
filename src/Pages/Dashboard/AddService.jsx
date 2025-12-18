import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleAddService = (data) => {
    const newService = {
      ...data,
      createdByEmail: user?.email || "",
      createdAt: new Date(),
    };
    console.log(newService);
    axiosSecure.post(`/services`, newService).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Service added!",
          text: "Service Added Successfully!",
          icon: "success",
          showConfirmButton: true,
        });
        navigate("/dashboard/service-management");
      }
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
              Create{" "}
              <span className="italic font-serif text-accent">Service</span>
            </h1>
            <div className="h-1.5 w-20 bg-accent rounded-full mt-2 hidden md:block"></div>
          </div>
          <p className="text-gray-500 font-medium uppercase tracking-[0.2em] text-xs">
            Service Management Portal
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(handleAddService)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Official Service Designation *
                  </label>
                  <input
                    type="text"
                    {...register("service_name", {
                      required: "Service name is required",
                    })}
                    placeholder="Ex: Royal Garden Wedding Decor"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-gray-800 placeholder:text-gray-300"
                  />
                  {errors.service_name && (
                    <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                      {errors.service_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Base Investment (BDT) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-bold">
                      ৳
                    </span>
                    <input
                      type="number"
                      {...register("cost", {
                        required: "Service cost is required",
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: "Cost must be greater than 0",
                        },
                      })}
                      placeholder="0.00"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  {errors.cost && (
                    <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                      {errors.cost.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Billing Cycle *
                  </label>
                  <select
                    {...register("unit", {
                      required: "Billing unit is required",
                    })}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-bold text-primary appearance-none cursor-pointer shadow-sm shadow-black/5"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select unit
                    </option>
                    <option value="per hour">per hour</option>
                    <option value="per day">per day</option>
                    <option value="per event">per event</option>
                    <option value="per sqrt-ft">per sqrt-ft</option>
                    <option value="per floor">per floor</option>
                    <option value="per meter">per meter</option>
                    <option value="per project">per project</option>
                  </select>
                  {errors.unit && (
                    <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                      {errors.unit.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Service Collection *
                  </label>
                  <select
                    {...register("service_category", {
                      required: "Service category is required",
                    })}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-bold text-primary appearance-none cursor-pointer shadow-sm shadow-black/5"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="home">Home</option>
                    <option value="wedding">Wedding</option>
                    <option value="office">Office</option>
                    <option value="seminar">Seminar</option>
                    <option value="meeting">Meeting</option>
                    <option value="ceremony">Ceremony</option>
                  </select>
                  {errors.service_category && (
                    <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                      {errors.service_category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Visual Content Link *
                  </label>
                  <input
                    type="text"
                    {...register("image", {
                      required: "Image URL is required",
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message:
                          "Please enter a valid URL starting with http:// or https://",
                      },
                    })}
                    placeholder="https://visuals.com/image.jpg"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-gray-800"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                      {errors.image.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Service Narrative & Highlights *
                  </label>
                  <textarea
                    rows={5}
                    {...register("description", {
                      required: "Service description is required",
                      minLength: {
                        value: 20,
                        message: "Description must be at least 20 characters",
                      },
                    })}
                    placeholder="Describe the aesthetic and scope of this service..."
                    className="w-full px-6 py-5 bg-gray-50 border-none rounded-4xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-gray-800 resize-none leading-relaxed"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-gray-50 flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 w-full hover:cursor-pointer md:w-auto"
                >
                  <FaPlus className="text-xs" />
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
