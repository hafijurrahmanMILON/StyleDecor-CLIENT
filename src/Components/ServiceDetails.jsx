import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import Loading from "./Loading";
import { useRef } from "react";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
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

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const watchServiceType = watch("serviceType");

  const { data: service, isLoading } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    },
  });

  const handleBookServiceModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    bookServiceModalRef.current.showModal();
  };

  const handleBookSubmit = (formData) => {
    const bookingData = {
      ...formData,
      serviceId: service._id,
      serviceName: service.service_name,
      serviceCost: service.cost,
      serviceUnit: service.unit,
      bookingDateTime: selectedDate
        ? new Date(
            selectedDate.setHours(
              selectedTime?.getHours() || 0,
              selectedTime?.getMinutes() || 0
            )
          )
        : null,
    };
    console.log("Booking Data:", bookingData);

    

    bookServiceModalRef.current.close();
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
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
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
          <div className="space-y-6">
            <div>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
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

        {/*  modal */}
        <dialog
          ref={bookServiceModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
            <div className=" p-6 rounded-t-2xl">
              <div className="flex justify-end">
                <form method="dialog">
                  <button className="btn btn-circle btn-sm border-0">✕</button>
                </form>
              </div>
            </div>

            <div className="p-8">
              <form
                onSubmit={handleSubmit(handleBookSubmit)}
                className="space-y-8"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Select Service Type
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 ${
                        watchServiceType === "in-studio"
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        value="in-studio"
                        {...register("serviceType", {
                          required: "Please select a service type",
                        })}
                        className="absolute opacity-0"
                      />
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            watchServiceType === "in-studio"
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">
                            In-Studio Consultation
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">
                            Visit our studio for personalized consultation
                          </p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 ${
                        watchServiceType === "on-site"
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        value="on-site"
                        {...register("serviceType", {
                          required: "Please select a service type",
                        })}
                        className="absolute opacity-0"
                      />
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            watchServiceType === "on-site"
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <FaMapMarkerAlt className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">
                            On-Site Service
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">
                            Our team will come to your venue for decoration
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                  {errors.serviceType && (
                    <p className="text-red-600 text-sm mt-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.serviceType.message}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6">
                    Your Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <FaUser className="text-gray-500" />
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue={user?.displayName || ""}
                          {...register("customerName", { required: true })}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white transition-all"
                          placeholder="Enter your full name"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaUser />
                        </div>
                      </div>
                      {errors.customerName && (
                        <p className="text-red-600 text-sm mt-2">
                          {errors.customerName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <FaEnvelope className="text-gray-500" />
                        Your Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          defaultValue={user?.email || ""}
                          {...register("customerEmail", {
                            required: true,
                          })}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white transition-all"
                          placeholder="Enter your email address"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaEnvelope />
                        </div>
                      </div>
                      {errors.customerEmail && (
                        <p className="text-red-600 text-sm mt-2">
                          {errors.customerEmail.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6">
                    Schedule Appointment
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        Select Date
                      </label>
                      <div className="relative">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          minDate={new Date()}
                          dateFormat="MMMM d, yyyy"
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white cursor-pointer"
                          placeholderText="Choose a date"
                          calendarClassName="!rounded-xl !border !border-gray-200 !shadow-xl"
                          wrapperClassName="w-full"
                          popperClassName="!z-50"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaCalendarAlt />
                        </div>
                      </div>
                      {selectedDate && (
                        <p className="text-sm text-primary mt-3 font-medium">
                          Selected:{" "}
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <FaClock className="text-gray-500" />
                        Select Time
                      </label>
                      <div className="relative">
                        <DatePicker
                          selected={selectedTime}
                          onChange={(time) => setSelectedTime(time)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={30}
                          timeCaption="Time"
                          timeFormat="h:mm aa"
                          dateFormat="h:mm aa"
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white cursor-pointer"
                          placeholderText="Choose a time"
                          popperClassName="!z-50"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaClock />
                        </div>
                      </div>
                      {selectedTime && (
                        <p className="text-sm text-primary mt-3 font-medium">
                          Selected:{" "}
                          {selectedTime.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Our working hours: 9:00 AM - 8:00 PM (Sunday - Friday)
                    </p>
                  </div>
                </div>

                {watchServiceType === "on-site" && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-600" />
                      Service Location
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Where do you need our service?
                      </label>
                      <div className="relative">
                        <textarea
                          {...register("location", {
                            required:
                              "Location is required for on-site service",
                          })}
                          rows={4}
                          placeholder="Enter full address with house number, street, area, city..."
                          className="w-full px-4 py-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none"
                        />
                        <div className="absolute left-4 top-4 text-gray-400">
                          <FaMapMarkerAlt />
                        </div>
                      </div>
                      {errors.location && (
                        <p className="text-red-600 text-sm mt-3">
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 p-4 bg-white/80 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        💡 <span className="font-medium">Tip:</span> Provide
                        detailed address for accurate service delivery. Include
                        landmarks if available.
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-xl p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6">
                    Service Summary
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">Service</h5>
                          <p className="text-lg font-semibold text-secondary mt-1">
                            {service?.service_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                        <div className="w-16 h-16 rounded-lg bg-green-50 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">Price</h5>
                          <p className="text-2xl font-bold text-primary mt-1">
                            ${service?.cost}
                            <span className="text-lg text-gray-600">
                              /{service?.unit}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <FaStickyNote className="text-gray-500" />
                        Additional Notes (Optional)
                      </label>
                      <div className="relative">
                        <textarea
                          {...register("notes")}
                          rows={5}
                          placeholder="Any specific requirements, special instructions, color preferences, theme ideas, or additional details..."
                          className="w-full px-4 py-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white resize-none"
                        />
                        <div className="absolute left-4 top-4 text-gray-400">
                          <FaStickyNote />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        Let us know about your preferences. This helps us
                        prepare better for your service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-6 pb-2 border-t border-gray-200 -mx-8 px-8">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Confirm & Book Service
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Close on backdrop click */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ServiceDetails;
