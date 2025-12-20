import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useState } from "react";

const BookingManagement = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const assignDecoratorModal = useRef();
  const axiosSecure = useAxiosSecure();
  // console.log(selectedBooking)

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators", "approved", selectedBooking?.serviceCategory],
    enabled: !!selectedBooking?.serviceCategory,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorators/select?speciality=${selectedBooking?.serviceCategory}&status=approved`
      );
      return res.data;
    },
  });

  const handleAssignDecoratorModal = (booking) => {
    setSelectedBooking(booking);
    assignDecoratorModal.current.showModal();
  };

  const handleAssignDecorator = (decorator) => {
    const assignInfo = {
      decoratorId: decorator?._id,
      decoratorName: decorator?.name,
      decoratorEmail: decorator?.email,
    };
    assignDecoratorModal.current.close();
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to assign ${decorator?.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Assign!",
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();
        axiosSecure
          .patch(
            `/bookings/assign-decorator/${selectedBooking._id}`,
            assignInfo
          )
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Decorator Assigned!",
                text: `${decorator?.name} has been Assigned!`,
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track all service bookings
          </p>
          <div className="mt-4 p-3 bg-primary/10 text-primary font-medium rounded-lg inline-block">
            Total Bookings: {bookings.length}
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                No Bookings Yet!
              </h1>
              <p className="text-gray-600 mt-2">
                No booking requests at the moment.
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-lg transition-colors duration-300"
            >
              <FaArrowLeft />
              Back to Homepage
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider whitespace-nowrap">
                    #
                  </th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider whitespace-nowrap min-w-[150px]">
                    Service Name
                  </th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider whitespace-nowrap">
                    Category
                  </th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider whitespace-nowrap">
                    Cost
                  </th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider whitespace-nowrap">
                    Service Type
                  </th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider whitespace-nowrap">
                    Payment Status
                  </th>
                  <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider whitespace-nowrap min-w-[150px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="p-4 font-medium whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="p-4">
                      <div className="font-medium truncate">
                        {booking.serviceName}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 rounded-full whitespace-nowrap">
                        {booking.serviceCategory}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {booking.totalCost}
                        </span>
                        <span className="text-xs">BDT</span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            booking.serviceType === "on-site"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                        <span>{booking.serviceType || "N/A"}</span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            booking.paymentStatus === "paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span
                          className={`font-medium ${
                            booking.paymentStatus === "paid"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {booking.paymentStatus.charAt(0).toUpperCase() +
                            booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {booking.status !== "pending" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium text-green-600">
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>
                      ) : booking.paymentStatus === "unpaid" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                          <span className="text-sm font-medium text-yellow-600">
                            Payment Pending
                          </span>
                        </div>
                      ) : booking.serviceType === "on-site" &&
                        booking.paymentStatus === "paid" ? (
                        <button
                          onClick={() => handleAssignDecoratorModal(booking)}
                          className="btn btn-sm btn-primary btn-soft rounded-xl whitespace-nowrap"
                        >
                          Select Decorator
                        </button>
                      ) : (
                        <span className="text-sm italic whitespace-nowrap">
                          Not Applicable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Decorator Modal */}
      <dialog
        ref={assignDecoratorModal}
        className="modal modal-bottom sm:modal-middle "
      >
        <div className="modal-box max-w-4xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-3xl md:text-4xl text-secondary font-bold">
                Assign Decorator
              </h3>
              <p className="">
                Select decorator for {selectedBooking?.serviceName}
              </p>
            </div>
            <button
              onClick={() => assignDecoratorModal.current.close()}
              className="btn btn-ghost btn-circle"
            >
              ✕
            </button>
          </div>

          <div>
            {decorators.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No available decorators at the moment
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decorators.map((decorator, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between border border-gray-200 rounded-lg p-3 "
                  >
                    <div className=" gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={decorator?.photoURL}
                          alt={decorator?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">
                          {decorator?.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {decorator.workStatus === "available" ? (
                            <>
                              <div className="p-1 py-0 rounded-full bg-green-200">
                                <p className="text-xs text-green-600">
                                  {decorator.workStatus}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="p-2 py-0 rounded-full bg-gray-200">
                                <p className="text-xs text-gray-600">
                                  {decorator.workStatus === "assigned" ? (
                                    <span>working on another project</span>
                                  ) : (
                                    decorator.workStatus
                                  )}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {decorator.specialities?.map((speciality, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {speciality}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAssignDecorator(decorator)}
                      className="w-full btn btn-secondary btn-outline rounded-lg"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BookingManagement;
