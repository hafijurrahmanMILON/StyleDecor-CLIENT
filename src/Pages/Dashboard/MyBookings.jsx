import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import {
  FaCalendarAlt,
  FaCheckCircle,
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
import Loading from "../../Components/Loading";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const editModalRef = useRef();

  // Pagination State
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

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

  // Pagination Logic
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = bookings.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bookings.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bookings.length;
    setItemOffset(newOffset);
  };

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
    <div className="my-12">
      <h1 className="text-4xl font-bold text-primary">My Bookings</h1>
      <p className="text-gray-600 mt-1">Manage and payment bookings</p>
      <div className="mt-4 p-3 bg-primary/10 text-primary font-medium rounded-lg inline-block">
        Total Bookings: {bookings.length}
      </div>

      <div className="mt-6">
        {bookings.length === 0 ? (
          <div className="p-12 text-center flex flex-col justify-center items-center min-h-[50vh]">
            <h3 className="text-lg font-semibold mb-2">No Bookings Found</h3>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-primary/5 to-secondary/5 border-b border-gray-200">
                    <th className="text-center p-4">#</th>
                    <th className="text-left p-4">Service Name</th>
                    <th className="text-center p-4">Cost</th>
                    <th className="text-center p-4">Service Status</th>
                    <th className="text-center p-4">Payment Status</th>
                    <th className="text-center p-4">Tracking ID</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <td className="text-center p-4 font-medium">
                        {itemOffset + index + 1}
                      </td>
                      <td className="text-left p-4">
                        <div className="font-medium">{booking.serviceName}</div>
                        <div className="text-xs text-gray-400">
                          ID: {booking._id?.slice(-8)}
                        </div>
                      </td>
                      <td className="text-center p-4 font-semibold">
                        {booking.totalCost} BDT
                      </td>
                      <td className="text-center p-4 capitalize">
                        {booking.status || "Pending"}
                      </td>
                      <td className="text-center p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            booking.paymentStatus === "paid"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {booking.paymentStatus || "unpaid"}
                        </span>
                      </td>
                      <td className="text-center p-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {booking.trackingId || "N/A"}
                        </span>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex gap-1 justify-center">
                          {booking.paymentStatus === "unpaid" && (
                            <button
                              onClick={() => handlePayment(booking)}
                              className="btn btn-sm btn-primary btn-soft text-lg tooltip"
                              data-tip="Pay Now"
                            >
                              <FaRegCreditCard />
                            </button>
                          )}
                          {booking.paymentStatus !== "paid" ? (
                            <>
                              <button
                                onClick={() => handleEditModal(booking)}
                                className="btn btn-sm btn-warning btn-soft text-lg tooltip"
                                data-tip="Edit"
                              >
                                <FaRegEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(booking._id)}
                                className="btn btn-sm btn-error btn-soft text-lg tooltip"
                                data-tip="Cancel"
                              >
                                <MdOutlineCancelPresentation />
                              </button>
                            </>
                          ) : (
                            <span className="text-green-600 flex items-center gap-1 text-sm">
                              <FaCheckCircle /> Paid
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bookings.length > itemsPerPage && (
              <div className="mt-8 flex justify-center">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel="< Previous"
                  renderOnZeroPageCount={null}
                  containerClassName="flex items-center gap-2 list-none"
                  pageLinkClassName="px-4 py-2 border rounded-md hover:bg-primary hover:text-white transition-colors"
                  activeLinkClassName="bg-primary text-white border-primary"
                  previousLinkClassName="px-4 py-2 border rounded-md hover:bg-gray-100"
                  nextLinkClassName="px-4 py-2 border rounded-md hover:bg-gray-100"
                  disabledClassName="opacity-50 cursor-not-allowed"
                  breakLinkClassName="px-4 py-2"
                />
              </div>
            )}
          </>
        )}
      </div>
      <dialog
        ref={editModalRef}
        className="modal modal-bottom sm:modal-middle backdrop-blur-md transition-all duration-300"
      >
        <div className="modal-box w-11/12 max-w-5xl p-0  shadow-2xl border border-white/20 overflow-hidden rounded-3xl">
          <div className="relative p-6 ">
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight">
                  Update Booking
                </h3>
                <p className=" text-sm opacity-90 mt-1">
                  Refine your service details and preferences
                </p>
              </div>
              <button
                onClick={() => editModalRef.current.close()}
                className="btn btn-circle btn-sm bg-white/20 border-none hover:bg-white/40 text-white transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleEdit)} className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">
                Service Type <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-5">
                {["in-studio", "on-site"].map((type) => (
                  <label
                    key={type}
                    className={`relative border-2 p-5 rounded-2xl cursor-pointer transition-all duration-300 group flex flex-col gap-2 ${
                      serviceType === type
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-gray-100 bg-gray-50/50 hover:border-gray-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-lg font-bold ${
                          serviceType === type
                            ? "text-primary"
                            : "text-gray-700"
                        }`}
                      >
                        {type === "in-studio" ? "In-Studio" : "On-Site"}
                      </span>
                      <input
                        type="radio"
                        value={type}
                        {...register("serviceType", { required: true })}
                        className="radio radio-primary radio-sm"
                      />
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {type === "in-studio"
                        ? "Visit our professional studio with full equipment access."
                        : "Enjoy the comfort of your own venue; we bring the service to you."}
                    </p>
                  </label>
                ))}
              </div>
              {errors.serviceType && (
                <p className="text-red-500 text-xs font-medium animate-pulse">
                  Please select a service type
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-primary/70" /> Booking Date
                </label>
                <input
                  type="date"
                  min={today}
                  {...register("date", { required: "Date is required" })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaClock className="text-primary/70" /> Preferred Time
                </label>
                <input
                  type="time"
                  {...register("time", { required: "Time is required" })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Total Units
                </label>
                <input
                  type="number"
                  min="1"
                  {...register("unitCount", { required: true })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                />
              </div>
            </div>

            {serviceType === "on-site" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary/70" /> Event Location
                </label>
                <textarea
                  {...register("location", {
                    required: serviceType === "on-site",
                  })}
                  rows={2}
                  placeholder="Provide full address or landmark..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FaStickyNote className="text-primary/70" /> Special
                Instructions
              </label>
              <textarea
                {...register("notes")}
                rows={2}
                placeholder="Anything else we should know?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-inner">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                    <FaRegCreditCard className="text-primary" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Pricing Plan
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {selectedBooking?.serviceName}
                  </p>
                  <p className="text-xs text-gray-500 font-medium italic">
                    Unit Price: {unitPrice} BDT
                  </p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                  Estimated Total
                </p>
                <div className="flex items-baseline gap-1 justify-center md:justify-end">
                  <span className="text-3xl font-black text-primary">
                    ৳{calculatedTotalCost.toFixed(0)}
                  </span>
                  <span className="text-sm font-bold text-gray-400">BDT</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full h-16 bg-primary overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.4)] active:scale-95"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative text-white font-bold text-xl tracking-wide">
                Confirm & Update Changes
              </span>
            </button>
          </form>
        </div>

        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-sm"
        >
          <button className="cursor-default">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyBookings;
