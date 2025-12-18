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
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Add New Service
          </h1>
          <p className="text-gray-600 mt-1">Create a new decoration service</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <form onSubmit={handleSubmit(handleAddService)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  {...register("service_name", { required: true })}
                  placeholder="Enter service name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.service_name?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">
                    Service name is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost (BDT) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">৳</span>
                  <input
                    type="number"
                    {...register("cost", { required: true })}
                    placeholder="Enter cost"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                {errors.cost?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">Cost is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  {...register("unit", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue="Select unit"
                >
                  <option disabled>Select unit</option>
                  <option value="per hour">per hour</option>
                  <option value="per day">per day</option>
                  <option value="per event">per event</option>
                  <option value="per sqrt-ft">per sqrt-ft</option>
                  <option value="per floor">per floor</option>
                  <option value="per meter">per meter</option>
                  <option value="per project">per project</option>
                </select>
                {errors.unit?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">Unit is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register("service_category", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue="Select category"
                >
                  <option disabled>Select category</option>
                  <option value="home">Home</option>
                  <option value="wedding">Wedding</option>
                  <option value="office">Office</option>
                  <option value="seminar">Seminar</option>
                  <option value="meeting">Meeting</option>
                  <option value="ceremony">Ceremony</option>
                </select>
                {errors.service_category?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">
                    Category is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  {...register("image")}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  {...register("description", { required: true })}
                  placeholder="Enter description of the service"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.description?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">
                    Description is required
                  </p>
                )}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-200">
              <button type="submit" className="w-full text-lg btn btn-primary">
                <FaPlus />
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
