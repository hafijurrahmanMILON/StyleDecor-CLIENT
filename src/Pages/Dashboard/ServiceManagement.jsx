import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { useRef } from "react";
import { FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";

const ServiceManagement = () => {
  const axiosSecure = useAxiosSecure();
  const editModalRef = useRef();
  const [selectedService, setSelectedService] = useState(null);

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-services"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-services`);
      return res.data;
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleEditModal = (service) => {
    setSelectedService(service);
    editModalRef.current.showModal();
  };

  useEffect(() => {
    if (selectedService) {
      reset({
        service_name: selectedService.service_name,
        image: selectedService.image,
        service_category: selectedService.service_category,
        unit: selectedService.unit,
        cost: selectedService.cost,
        description: selectedService.description,
      });
    }
  }, [selectedService, reset]);

  const handleEditService = (data) => {
    editModalRef.current.close();
    Swal.fire({
      title: "Confirm?",
      text: "Do you want to update this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/services/${selectedService?._id}/update`, data)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: "Service has been Updated!",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleDeleteService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}/delete`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Service has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-8">
      {/* service table */}
      <div>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Services Management
            </h1>
            <p className=" mt-1">Manage all decoration services</p>
          </div>
          <Link
            to="/dashboard/add-service"
            className="btn btn-secondary rounded-lg text-lg"
          >
            <FaPlus />
            Add New Service
          </Link>
        </div>

        {/* Services Table */}
        {services.length === 0 ? (
          <div className="text-center mt-0 md:mt-12 py-16">
            <div className=" mb-4">
              <svg
                className="w-20 h-20 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium  mb-2">No services found</h3>
            <p className="">Add your first decoration service to get started</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden p-2 md:p-4">
            <div className="overflow-x-auto">
              <table className="table table-zebra text-center">
                <thead>
                  <tr className="bg-gray-50">
                    <th>#</th>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service?._id}>
                      <td className="font-medium">{index + 1}</td>
                      <td className="font-medium ">{service?.service_name}</td>
                      <td>
                        <div className="font-bold text-primary">
                          ৳{service?.cost}
                        </div>
                        <div className=" text-sm">{service?.unit}</div>
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            service?.service_category === "ceremony"
                              ? "bg-primary/10 text-primary"
                              : service?.service_category === "home"
                              ? "bg-secondary/20 text-secondary"
                              : service?.service_category === "wedding"
                              ? "bg-pink-100 text-pink-700"
                              : service?.service_category === "office"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 "
                          }`}
                        >
                          {service?.service_category}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEditModal(service)}
                          className="btn btn-success btn-ghost btn-sm tooltip"
                          data-tip="Edit Service"
                        >
                          <FaRegEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="btn btn-error btn-ghost btn-sm  tooltip"
                          data-tip="Delete Service"
                        >
                          <FiTrash className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* edit modal */}
      <dialog
        ref={editModalRef}
        className="modal modal-bottom sm:modal-middle transition-all duration-500"
      >
        <div className="modal-box w-11/12 max-w-4xl p-0 overflow-hidden rounded-[2.5rem] shadow-2xl border border-primary/5">
          <div className="bg-white px-8 py-6 flex justify-between items-center border-b border-primary/5">
            <div className="flex items-center gap-4">
              <div className="w-2 h-10 bg-primary rounded-full"></div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                  Edit{" "}
                  <span className="text-[#ddbea9] italic font-serif">
                    Service
                  </span>
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B705C] mt-1">
                  Refine your service excellence
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => editModalRef.current.close()}
              className="btn btn-ghost btn-circle"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(handleEditService)} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-widest mb-2 ml-1">
                  Service Designation
                </label>
                <input
                  type="text"
                  {...register("service_name", {
                    required: "Service name is required",
                  })}
                  placeholder="Enter service name"
                  className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-primary shadow-sm"
                />
                {errors.service_name && (
                  <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                    {errors.service_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-widest mb-2 ml-1">
                  Investment (BDT)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-bold">
                    ৳
                  </span>
                  <input
                    type="number"
                    {...register("cost", {
                      required: "Service cost is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Cost must be greater than 0" },
                    })}
                    className="w-full pl-10 pr-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-primary shadow-sm"
                  />
                </div>
                {errors.cost && (
                  <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                    {errors.cost.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-widest mb-2 ml-1">
                  Billing Unit
                </label>
                <select
                  {...register("unit", {
                    required: "Billing unit is required",
                  })}
                  className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-bold text-primary shadow-sm appearance-none"
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
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-widest mb-2 ml-1">
                  Collection Category
                </label>
                <select
                  {...register("service_category", {
                    required: "Service category is required",
                  })}
                  className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-bold text-primary shadow-sm appearance-none"
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
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-widest mb-2 ml-1">
                  Visual Identity (URL)
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
                  className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-primary shadow-sm"
                />
                {errors.image && (
                  <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                    {errors.image.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-widest mb-2 ml-1">
                  Service Narrative
                </label>
                <textarea
                  rows={3}
                  {...register("description", {
                    required: "Service description is required",
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters",
                    },
                  })}
                  className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-primary shadow-sm resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-[11px] mt-2 ml-1 font-bold">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-8 mt-8 border-t border-primary/5">
              <button
                type="button"
                onClick={() => editModalRef.current.close()}
                className="flex-1 py-4 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-[#6B705C]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-2 py-4 px-6 rounded-2xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Update Service Detail
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop bg-black/30">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceManagement;
