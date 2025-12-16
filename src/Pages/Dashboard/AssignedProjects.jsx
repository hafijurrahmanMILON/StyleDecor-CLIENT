import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";

const AssignedProjects = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator?decoratorEmail=${user?.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const handleUpdateStatus = (booking, status) => {
    const statusInfo = { status: status };
    axiosSecure
      .patch(`bookings/status/${booking._id}`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you for accepting!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleReject = (booking, status) => {
    const statusInfo = { status: status };
    Swal.fire({
      title: "Are you Confirm?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`bookings/status/${booking._id}`, statusInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                title: "Rejected!",
                text: "Assignment has been rejected",
                icon: "success",
              });
            }
          });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl text-primary font-bold">
        Assigned Projects
      </h1>
      <div>
        {bookings.length === 0 ? (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  No Projects Assigned
                </h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  You don't have any active projects. Check back soon for new
                  assignments.
                </p>
              </div>

              <Link
                to="/"
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Location</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id || index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td>
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap">
                      <div>
                        {booking.serviceName}
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="text-sm">{booking.location || "N/A"}</div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{booking.date}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.time}
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : booking.status === "setup in progress"
                            ? "bg-blue-100 text-blue-600"
                            : booking.status === "on the way to venue"
                            ? "bg-yellow-100 text-yellow-600"
                            : booking.status === "material prepared"
                            ? "bg-purple-100 text-purple-600"
                            : booking.status === "planning phase"
                            ? "bg-indigo-100 text-indigo-600"
                            : booking.status === "decorator assigned"
                            ? "bg-cyan-100 text-cyan-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap space-x-2">
                      
                        <button
                          onClick={() =>
                            handleUpdateStatus(booking, "planning phase")
                          }
                          className="btn btn-success btn-sm btn-outline"
                          disabled={booking.status !== "decorator assigned"}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(booking, "pending")}
                          disabled={booking.status !== "decorator assigned"}
                          className="btn btn-error btn-sm  btn-outline"
                        >
                          Reject
                        </button>
                    </td>
                    <td className="whitespace-nowrap">
                      {booking.status === "planning phase" && (
                        <button
                          className="btn btn-sm btn-success btn-soft"
                          onClick={() =>
                            handleUpdateStatus(booking, "material prepared")
                          }
                        >
                          Mark as Prepared
                        </button>
                      )}
                      {booking.status === "material prepared" && (
                        <button
                          className="btn btn-sm btn-success btn-soft"
                          onClick={() =>
                            handleUpdateStatus(booking, "on the way to venue")
                          }
                        >
                          On the Way
                        </button>
                      )}
                      {booking.status === "on the way to venue" && (
                        <button
                          className="btn btn-sm btn-success btn-soft"
                          onClick={() =>
                            handleUpdateStatus(booking, "setup in progress")
                          }
                        >
                          Start Setup
                        </button>
                      )}
                      {booking.status === "setup in progress" && (
                        <button
                          className="btn btn-sm btn-success btn-soft"
                          onClick={() =>
                            handleUpdateStatus(booking, "completed")
                          }
                        >
                          Complete
                        </button>
                      )}
                      {booking.status === "completed" && (
                        <span className="text-green-600 text-sm font-medium">
                          ✓ Done
                        </span>
                      )}
                      {booking.status === "decorator assigned" && (
                        <span className="text-gray-400 text-sm">
                          Pending acceptance
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
    </div>
  );
};

export default AssignedProjects;
