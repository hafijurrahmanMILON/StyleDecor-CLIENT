import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const BookingManagement = () => {
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const assignDecoratorModal = React.useRef();
  const axiosSecure = useAxiosSecure();

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
    queryKey: ["decorators", "available"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/available-decorators?workStatus=available`
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
        {/* Header */}
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

        {/* Main Content */}
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
            <table className="table table-zebra text-center">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Cost</th>
                  <th>Service Type</th>
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
                    <td>{booking.serviceType || "N/A"}</td>
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
                      {booking.status !== "pending" ? (
                        <span className="text-sm text-green-500">
                          {booking?.status}
                        </span>
                      ) : booking.paymentStatus === "unpaid" ? (
                        <span className="text-sm text-warning/80">
                          Payment Pending
                        </span>
                      ) : booking.serviceType === "on-site" &&
                        booking.paymentStatus === "paid" ? (
                        <button
                          onClick={() => handleAssignDecoratorModal(booking)}
                          className="btn btn-outline btn-primary btn-sm"
                        >
                          Select Decorator
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">
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
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-500">
                            Available
                          </span>
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
