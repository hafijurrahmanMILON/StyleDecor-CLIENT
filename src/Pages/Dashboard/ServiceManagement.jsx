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
    editModalRef.current.close()
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
        axiosSecure.patch(`/services/${selectedService?._id}/update`, data).then((res) => {
          if (res.data.modifiedCount) {
            refetch()
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
            <h1 className="text-3xl font-bold text-gray-800">
              Services Management
            </h1>
            <p className="text-gray-600 mt-1">Manage all decoration services</p>
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
            <div className="text-gray-400 mb-4">
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
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No services found
            </h3>
            <p className="text-gray-500">
              Add your first decoration service to get started
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden p-2 md:p-4">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-gray-700 font-semibold">#</th>
                    <th className="text-gray-700 font-semibold">Service</th>
                    <th className="text-gray-700 font-semibold">Price</th>
                    <th className="text-gray-700 font-semibold">Category</th>
                    <th className="text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service?._id}>
                      <td className="font-medium">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-gray-800">
                              {service?.service_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-primary">
                          ${service?.cost}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {service?.unit}
                        </div>
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
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {service?.service_category}
                        </span>
                      </td>
                      <td>
                        <div className="flex">
                          <button
                            onClick={() => handleEditModal(service)}
                            className="btn btn-success btn-ghost btn-sm tooltip"
                            data-tip="Edit Service"
                          >
                            <FaRegEdit className="text-lg" />
                          </button>
                          <button
                            className="btn btn-error btn-ghost btn-sm  tooltip"
                            data-tip="Delete Service"
                          >
                            <FiTrash className="text-lg" />
                          </button>
                        </div>
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
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] p-8">
          <div className="">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl md:text-3xl text-primary  font-bold">
                  Edit Service
                </h3>
                <p>Update service details</p>
              </div>
              <button
                onClick={() => editModalRef.current.close()}
                className="btn btn-ghost btn-circle"
              >
                ✕
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleEditService)} className="mt-4">
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
                  Cost (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
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
                  defaultValue="Select unit"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option disabled={true}>Select unit</option>
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
                  <option disabled={true}>Select category</option>
                  <option value="home">Home</option>
                  <option value="wedding">Wedding</option>
                  <option value="office">Office</option>
                  <option value="seminar">Seminar</option>
                  <option value="meeting">Meeting</option>
                  <option value="ceremony">Ceremony</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                </select>
                {errors.service_category?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">
                    Category is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL *
                </label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.image?.type === "required" && (
                  <p className="text-red-600 text-sm mt-1">
                    Image URL is required
                  </p>
                )}
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

            <div className="flex gap-4 pt-8 mt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => editModalRef.current.close()}
                className="btn btn-outline flex-1 py-3"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary flex-1 py-3">
                Update Service
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceManagement;
