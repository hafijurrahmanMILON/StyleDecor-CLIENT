import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRegCreditCard,
  FaRegEdit,
  FaStickyNote,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlineCancelPresentation } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Loading from "../../Components/Loading";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const editModalRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
  });

  const serviceType = watch("serviceType");
  const unitCount = watch("unitCount");
  const unitPrice = selectedBooking
    ? selectedBooking.totalCost / selectedBooking.totalUnit
    : 0;
  const calculatedTotalCost = unitCount ? unitCount * unitPrice : 0;

  const today = new Date().toISOString().split("T")[0];

  const handleEditModal = (booking) => {
    setSelectedBooking(booking);
    editModalRef.current.showModal();
  };

  useEffect(() => {
    if (selectedBooking) {
      reset({
        serviceType: selectedBooking.serviceType,
        date: selectedBooking.date,
        time: selectedBooking.time,
        unitCount: selectedBooking.totalUnit,
        location: selectedBooking.location,
        notes: selectedBooking.notes,
      });
    }
  }, [selectedBooking, reset]);

  const handleEdit = (formData) => {
    const totalUnit = parseInt(formData.unitCount);
    // const unitCost = selectedBooking.totalCost / selectedBooking.totalUnit;
    const totalCost = totalUnit * unitPrice;

    const editedData = {
      serviceType: formData.serviceType,
      date: formData.date,
      time: formData.time,
      location: formData.serviceType === "on-site" ? formData.location : null,
      notes: formData.notes || null,
      totalUnit: totalUnit,
      totalCost: totalCost,
    };
    editModalRef.current.close();
    console.log(editedData);
    Swal.fire({
      title: "Are you confirm?",
      text: `Your cost would be ${totalCost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/bookings/${selectedBooking._id}`, editedData)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Confirmed!",
                text: "Booking Edited Successfully!",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to Edit Booking!",
              icon: "error",
            });
          });
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you confirm?",
      text: `You won't be able to revert this!!!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/bookings/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Booking Deleted Successfully!",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to Delete!",
              icon: "error",
            });
          });
      }
    });
  };

  const handlePayment = async (booking) => {
    const paymentInfo = {
      bookingId: booking._id,
      serviceName: booking.serviceName,
      customerEmail: booking.customerEmail,
      serviceCost: booking.totalCost,
    };
    const res = await axiosSecure.post(
      `/payment-checkout-session`,
      paymentInfo
    );
    console.log(res.data.url);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[80vh]">
          <h1 className="text-5xl font-bold text-primary">No Bookings Yet!</h1>
          <Link to="/" className="btn btn-secondary">
            {" "}
            <FaArrowLeft />
            Back to Homepage
          </Link>
        </div>
      ) : (
        <div>
          {/* main */}
          <div>
            <div className="space-y-3 my-4">
              <p>
                {bookings.length}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service Name</th>
                    <th>Cost</th>
                    <th>Service Status</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{booking.serviceName}</td>
                      <td>${booking.totalCost}</td>
                      <td>{booking.status || "N/A"}</td>
                      <td
                        className={`${
                          booking.paymentStatus === "paid"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {booking.paymentStatus}
                      </td>
                      <td>
                        {booking.paymentStatus === "unpaid" && (
                          <button
                            onClick={() => handlePayment(booking)}
                            className="btn  text-lg  btn-xs btn-ghost tooltip"
                            data-tip="Pay Now"
                          >
                            <FaRegCreditCard />
                          </button>
                        )}
                        <button
                          onClick={() => handleEditModal(booking)}
                          className="btn text-lg  btn-xs btn-ghost tooltip"
                          data-tip="Edit Booking"
                        >
                          <FaRegEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="btn text-lg  btn-xs btn-ghost tooltip"
                          data-tip="Cancel Booking"
                        >
                          <MdOutlineCancelPresentation />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* modal */}
          <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box w-11/12 max-w-5xl p-0">
              <div className="p-5 pb-0 flex justify-between items-center">
                <h3 className="text-2xl font-bold">Update Booking</h3>
                <button
                  onClick={() => editModalRef.current.close()}
                  className="btn btn-ghost btn-circle"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleSubmit(handleEdit)}
                className="p-6 space-y-6"
              >
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Service Type *
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label
                      className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${
                        serviceType === "in-studio"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="in-studio"
                        {...register("serviceType", { required: true })}
                        className="mr-2 radio-primary"
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
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="on-site"
                        {...register("serviceType", { required: true })}
                        className="mr-2"
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
                      <FaCalendarAlt className="text-gray-400" />
                      Date<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={today}
                      {...register("date", {
                        required: "Date is required",
                        min: {
                          value: today,
                          message: "Cannot select past date",
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                      Time<span className="text-red-500">*</span>
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
                            return "Select time between 9 AM - 8 PM";
                          return true;
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    {errors.time && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.time.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Total Units<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register("unitCount", {
                      required: "Unit count is required",
                      min: { value: 1, message: "Minimum 1 unit required" },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  {errors.unitCount && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.unitCount.message}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-blue-700 text-sm">
                      Working hours: 9:00 AM - 8:00 PM
                    </span>
                  </div>
                </div>

                {serviceType === "on-site" && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      Location<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("location", {
                        required:
                          serviceType === "on-site"
                            ? "Location is required"
                            : false,
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Any special requirements..."
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-800 mb-3">
                    Service Summary
                  </h5>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">
                        {selectedBooking?.serviceName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Unit Price: ${unitPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Cost</p>
                      <p className="text-2xl font-bold text-primary">
                        ${calculatedTotalCost.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 rounded-lg text-lg transition-colors"
                >
                  Update Booking
                </button>
              </form>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
