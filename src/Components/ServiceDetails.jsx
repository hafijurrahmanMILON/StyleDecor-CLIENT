import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
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
  FaCheckCircle,
} from "react-icons/fa";
import { GoGift } from "react-icons/go";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
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
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  const totalUnit = parseInt(watch("unitCount")) || 1;
  const totalCost = totalUnit * (service?.cost || 0);

  const { data: availableDecorators = [] } = useQuery({
    queryKey: ["available", service?.service_category],
    queryFn: async () => {
      const res = await axiosSecure(
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
        axiosSecure
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
          <p className=" mt-2">The service you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <nav className="text-sm ">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-all duration-500"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white p-2">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-[500px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:pl-4">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${
                    service.service_category === "ceremony"
                      ? "bg-primary text-white"
                      : service.service_category === "home"
                      ? "bg-secondary text-white"
                      : "bg-accent text-secondary"
                  }`}
                >
                  {service.service_category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-secondary leading-tight tracking-tight">
                {service.service_name}
              </h1>

              <div className="flex items-baseline gap-2 bg-gray-50 w-fit px-6 py-3 rounded-2xl border border-gray-100">
                <span className="text-4xl font-black text-primary">
                  ৳{service.cost}
                </span>
                <span className=" font-medium">/{service.unit}</span>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-xs font-bold  uppercase tracking-[0.2em] mb-4">
                  The Experience
                </h3>
                <p className="text-lg  leading-relaxed font-light italic">
                  "{service.description}"
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-inner">
                      <span className="text-white text-xl font-bold">
                        {service.createdByEmail?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary uppercase tracking-tight">
                      Verified Specialist
                    </p>
                    <p className=" text-sm font-medium">
                      {service.createdByEmail}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-right text-xs ">
                  Created on <br />
                  <span className="font-bold ">
                    {new Date(service.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleBookServiceModal(service)}
                  className="group relative w-full bg-primary overflow-hidden text-white font-bold py-3 px-6 rounded-2xl text-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                >
                  <span className="relative flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                    Book This Service Now
                  </span>
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 ">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                  <p className="text-xs font-semibold uppercase tracking-widest">
                    Secure Booking Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* available decorators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="mb-8">
            <h3 className="text-2xl font-bold  mb-3">Available Decorators</h3>
          </div>

          {availableDecorators.length === 0 ? (
            <div className="text-center py-8">
              <p className="">No decorators available at the moment</p>
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
                      <h4 className="font-bold ">{decorator.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs  capitalize">
                          {decorator.workStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specialities */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium ">Specialities:</p>
                    <div className="flex flex-wrap gap-2">
                      {decorator.specialities.map((speciality, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100  text-xs rounded-full"
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
            <p className=" max-w-2xl mx-auto">
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
          className="modal modal-bottom sm:modal-middle transition-all"
        >
          <div className="modal-box w-11/12 max-w-4xl p-0 shadow-2xl border overflow-hidden rounded-3xl">
            <div className="relative p-8 overflow-hidden">
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl backdrop-blur-lg flex items-center justify-center shadow-inner">
                    <GoGift className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold tracking-tight">
                      Book Service
                    </h3>
                    <p className="text-sm opacity-90 mt-1">
                      Experience excellence in every detail
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => bookServiceModalRef.current.close()}
                  className="btn btn-circle btn-sm"
                >
                  ✕
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full -ml-12 -mb-12 blur-2xl"></div>
            </div>

            <form
              onSubmit={handleSubmit(handleBookSubmit)}
              className="p-8 space-y-8 max-h-[75vh] overflow-y-auto"
            >
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-[0.2em]  ml-1">
                  Select Experience <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-5">
                  {["in-studio", "on-site"].map((type) => (
                    <label
                      key={type}
                      className={`relative border-2 p-6 rounded-2xl cursor-pointer ${
                        serviceType === type
                          ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                          : "border-gray-100 bg-gray-50/50 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div
                            className={`font-bold text-xl mb-1 ${
                              serviceType === type ? "text-primary" : ""
                            }`}
                          >
                            {type === "in-studio" ? "In-Studio" : "On-Site"}
                          </div>
                          <p className="text-sm  leading-relaxed">
                            {type === "in-studio"
                              ? "Visit our luxury suite"
                              : "We bring the studio to you"}
                          </p>
                        </div>
                        <input
                          type="radio"
                          value={type}
                          {...register("serviceType", { required: true })}
                          className="radio radio-primary radio-sm mt-1"
                        />
                      </div>
                    </label>
                  ))}
                </div>
                {errors.serviceType && (
                  <p className="text-red-500 text-xs font-semibold ml-1 italic">
                    Please select a service type to proceed
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="space-y-2">
                  <label className="text-sm font-bold  flex items-center gap-2">
                    <FaUser className="text-primary/60 text-xs" /> Customer Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    {...register("customerName")}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl  font-medium cursor-not-allowed italic"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold  flex items-center gap-2">
                    <FaEnvelope className="text-primary/60 text-xs" /> Email
                    Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    {...register("customerEmail")}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl  font-medium cursor-not-allowed italic"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ">Booking Date</label>
                  <input
                    type="date"
                    min={today}
                    {...register("date", { required: "Date is required" })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Preferred Time</label>
                  <input
                    type="time"
                    min="09:00"
                    max="20:00"
                    {...register("time", { required: "Time is required" })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-medium"
                  />
                  {errors.time && (
                    <p className="text-red-500 text-xs font-semibold ml-1 italic">
                      {errors.time.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold ">
                    Duration ({service.unit})
                  </label>
                  <input
                    type="number"
                    {...register("unitCount", { required: true, min: 1 })}
                    defaultValue={1}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-medium"
                  />
                </div>
              </div>

              <div className="bg-blue-600/5 border border-blue-200/50 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                  <FaClock className="text-blue-600" />
                </div>
                <p className="text-sm text-blue-800 leading-relaxed font-medium">
                  Concierge available from{" "}
                  <span className="font-bold">09:00 AM to 08:00 PM</span>.
                  Bookings outside these hours will be processed the next
                  business morning.
                </p>
              </div>

              <div className="space-y-6">
                {serviceType === "on-site" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold  flex items-center gap-2 font-mono">
                      <FaMapMarkerAlt className="text-primary" /> EVENT VENUE
                      LOCATION
                    </label>
                    <textarea
                      {...register("location", {
                        required: serviceType === "on-site",
                      })}
                      rows={3}
                      placeholder="Full address, floor, or landmark..."
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold ">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={2}
                    placeholder="Any specific aesthetic preferences or requirements?"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <h5 className=" text-xs font-bold uppercase tracking-widest mb-1">
                      Service Tier
                    </h5>
                    <p className="text-2xl font-bold tracking-tight">
                      {service?.service_name}
                    </p>
                    <div className="flex items-center gap-2 mt-2 opacity-80">
                      <span className="px-2 py-0.5 bg-white/10 rounded-md text-[10px] border border-white/20 uppercase font-bold tracking-tighter">
                        Premium Category
                      </span>
                      <span className="text-sm">
                        ৳{service?.cost} / {service?.unit}
                      </span>
                    </div>
                  </div>

                  <div className="h-px md:h-12 w-full md:w-px bg-white/10"></div>

                  <div className="text-center md:text-right">
                    <h5 className=" text-xs font-bold uppercase tracking-widest mb-1">
                      Grand Total
                    </h5>
                    <div className="flex items-baseline gap-2 justify-center md:justify-end">
                      <span className="text-4xl font-black text-white italic">
                        ৳{totalCost}
                      </span>
                      <span className="text-xs font-bold  uppercase tracking-widest">
                        BDT
                      </span>
                    </div>
                    <p className="text-[10px]  mt-1 uppercase font-bold tracking-widest">
                      Secure Reservation
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
              </div>

              <button
                type="submit"
                className="group relative w-full h-18 py-5 bg-primary overflow-hidden rounded-2xl flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <FaCheckCircle className="text-white text-xl" />
                <span className="relative text-white font-black text-xl tracking-wider uppercase">
                  Finalize Reservation
                </span>
              </button>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop bg-gray-900/60">
            <button className="cursor-default">close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ServiceDetails;
