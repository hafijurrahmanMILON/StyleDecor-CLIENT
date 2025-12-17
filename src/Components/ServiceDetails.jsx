import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import Loading from "./Loading";
import { useRef } from "react";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaStickyNote,
} from "react-icons/fa";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const bookServiceModalRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const serviceType = watch("serviceType");

  const { data: service, isLoading } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    },
  });

  const totalUnit = parseInt(watch("unitCount")) || 1;
  const totalCost = totalUnit * (service?.cost || 0);

  const { data: availableDecorators = [] } = useQuery({
    queryKey: ["available", service?.service_category],
    queryFn: async () => {
      const res = await axiosInstance(
        `/available-decorators?speciality=${service?.service_category}`
      );
      console.log(res.data);
      return res.data;
    },
    enabled: !!service?.service_category,
  });

  const today = new Date().toISOString().split("T")[0];
  const handleBookServiceModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    bookServiceModalRef.current.showModal();
  };

  const handleBookSubmit = (formData) => {
    const bookingData = {
      serviceId: service._id,
      serviceName: service.service_name,
      serviceType: formData.serviceType,
      serviceCategory: service.service_category,
      totalUnit,
      totalCost,
      customerId: user.uid || user._id,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      date: formData.date,
      time: formData.time,
      location: formData.serviceType === "on-site" ? formData.location : null,
      notes: formData.notes || null,
      paymentStatus: "unpaid",
      status: "pending",
    };
    console.log("Booking Data:", bookingData);
    bookServiceModalRef.current.close();
    Swal.fire({
      title: "Are you confirm?",
      text: `total cost would be ${totalCost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .post(`/bookings`, bookingData)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              navigate("/dashboard/my-bookings");
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Service Booked Successfully! Proceed to Pay!",
                showConfirmButton: false,
                timer: 1500,
              });
            } else if (res.data.message) {
              Swal.fire({
                title: "Already Booked!",
                text: res.data.message,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to book service!",
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary">
            Service not found
          </h2>
          <p className="text-gray-600 mt-2">
            The service you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">
              {service.service_name}
            </span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10"></div>
          </div>

          {/* Right side */}
          <div className="space-y-3">
            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  service.service_category === "ceremony"
                    ? "bg-primary text-white"
                    : service.service_category === "home"
                    ? "bg-secondary text-white"
                    : "bg-accent text-gray-800"
                }`}
              >
                {service.service_category.charAt(0).toUpperCase() +
                  service.service_category.slice(1)}{" "}
                Service
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              {service.service_name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                ${service.cost}
              </span>
              <span className="text-gray-600 text-lg">/{service.unit}</span>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Service Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Service Provider
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {service.createdByEmail?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Professional Decorator
                  </p>
                  <p className="text-gray-600 text-sm">
                    {service.createdByEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Service created on:{" "}
                <span className="font-medium">
                  {new Date(service.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handleBookServiceModal(service)}
                className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Book This Service Now
              </button>
              <p className="text-center text-gray-600 mt-4 text-sm">
                Book now to schedule your{" "}
                {service.service_category.toLowerCase()} decoration
              </p>
            </div>
          </div>
        </div>
        {/* available decorators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Available Decorators
            </h3>
          </div>

          {availableDecorators.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No decorators available at the moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDecorators.map((decorator, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  {/* Decorator Image and Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={decorator.photoURL}
                        alt={decorator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {decorator.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-500 capitalize">
                          {decorator.workStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specialities */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Specialities:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {decorator.specialities.map((speciality, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {speciality}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Need Help?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about this service? Our decoration experts are
              available to help you choose the perfect package for your needs.
            </p>
            <button className="mt-6 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-lg transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>

        {/* Modal */}
        <dialog
          ref={bookServiceModalRef}
          className="modal backdrop:bg-black/30"
        >
          <div className="modal-box w-11/12 max-w-5xl p-0">
            <div className="p-5 pb-0 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Book Service</h3>
                <p className="">Complete your booking details</p>
              </div>
              <button
                onClick={() => bookServiceModalRef.current.close()}
                className="btn btn-ghost btn-circle"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleBookSubmit)}
              className="p-6 space-y-8"
            >
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  Service Type *
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <label
                    className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${
                      serviceType === "in-studio"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value="in-studio"
                      {...register("serviceType", { required: true })}
                      className="hidden"
                    />
                    <div className="font-medium text-gray-800">In-Studio</div>
                    <div className="text-sm text-gray-600">
                      Visit our studio for consultation
                    </div>
                  </label>

                  <label
                    className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${
                      serviceType === "on-site"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value="on-site"
                      {...register("serviceType", { required: true })}
                      className="hidden"
                    />
                    <div className="font-medium text-gray-800">On-Site</div>
                    <div className="text-sm text-gray-600">
                      We come to your venue
                    </div>
                  </label>
                </div>
                {errors.serviceType && (
                  <p className="text-red-600 text-sm mt-2">
                    Please select service type
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    {...register("customerName")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    Email *
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    {...register("customerEmail")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    Date *
                  </label>
                  <input
                    type="date"
                    min={today}
                    {...register("date", {
                      required: "Date is required",
                      min: { value: today, message: "Cannot select past date" },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.date && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    Time *
                  </label>
                  <input
                    type="time"
                    min="09:00"
                    max="20:00"
                    {...register("time", {
                      required: "Time is required",
                      validate: (value) => {
                        const hour = parseInt(value.split(":")[0]);
                        if (hour < 9 || hour >= 20)
                          return "Select time between 09:00 - 20:00";
                        return true;
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.time && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-blue-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-700 text-sm">
                    Working hours: 09:00 - 20:00
                  </span>
                </div>
              </div>
              <div>
                <label>Unit</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  {...register("unitCount", {
                    required: "Unit count required",
                    min: { value: 1, message: "Minimum 1 unit required" },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                />
              </div>

              {serviceType === "on-site" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    Location *
                  </label>
                  <textarea
                    {...register("location", {
                      required:
                        serviceType === "on-site" ? "Location required" : false,
                    })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter full address..."
                  />
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaStickyNote className="text-gray-400" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any special requirements or notes for the decorator..."
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  Service Summary
                </h5>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      {service?.service_name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {service?.service_category} Service
                    </p>
                  </div>

                  <div>
                    <p className="text-md font-md text-secondary">
                      ${service?.cost}
                      <span className="text-gray-600 text-sm font-normal ml-1">
                        /{service?.unit}
                      </span>
                    </p>

                    <p className="text-xl font-bold text-primary">
                      {" "}
                      ${totalCost}
                      <span className="text-gray-600 text-sm font-normal ml-1">
                        /totalPrice
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 rounded-lg text-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Confirm Booking
              </button>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ServiceDetails;
