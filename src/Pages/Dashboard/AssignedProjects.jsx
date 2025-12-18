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

  const getStatusMessage = (status) => {
    const messages = {
      "planning phase": "Project has been moved to planning phase!",
      "material prepared": "Materials have been prepared successfully!",
      "on the way to venue": "on the way to the venue!",
      "setup in progress": "Setup has started!",
      completed: "Project has been completed successfully!",
      "decorator assigned": "Thank you for accepting the assignment!",
    };
    return messages[status] || "Status updated successfully!";
  };

  const handleUpdateStatus = (booking, status) => {
    const statusInfo = { status: status, decoratorEmail: user?.email };
    axiosSecure
      .patch(`bookings/status/${booking._id}`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: getStatusMessage(status),
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
              refetch();
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
   <div className="p-4 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-black text-primary tracking-tight">
              Assigned Projects
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-0.5 w-8 bg-[#ddbea9]"></span>
              <p className="text-[#6B705C] font-bold uppercase text-[10px] tracking-[0.2em]">
                Workflow Management & Tracking
              </p>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_-20px rgba(0,0,0,0.04)] border border-primary/5 p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-8 rounded-4xl bg-linear-to-br from-white to-[#fdfbf9] shadow-xl flex items-center justify-center border border-primary/10">
                <span className="text-4xl text-primary">📂</span>
              </div>
              <h3 className="text-3xl font-black text-primary mb-4 tracking-tight">
                Project Horizon Clear
              </h3>
              <p className="text-[#6B705C] font-semibold max-w-sm mx-auto mb-10 leading-relaxed">
                Your assignment queue is currently empty. New premium projects
                will manifest here as they are assigned.
              </p>
              <Link
                to="/"
                className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 inline-flex items-center gap-3 uppercase text-xs tracking-widest"
              >
                Explore Marketplace
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px rgba(0,0,0,0.04)] border border-primary/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/2 border-b border-primary/5 text-xl">
                    {[
                      "#",
                      "Service Details",
                      "Venue",
                      "Timeline",
                      "Status",
                      "Control",
                      "Step Action",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-8 py-6 text-left text-[10px] font-black text-primary uppercase tracking-[0.2em]"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {bookings.map((booking, index) => {
                    const statusStyles = {
                      completed:
                        "bg-emerald-50 text-emerald-700 border-emerald-100",
                      "setup in progress":
                        "bg-blue-50 text-blue-700 border-blue-100",
                      "on the way to venue":
                        "bg-amber-50 text-amber-700 border-amber-100",
                      "material prepared":
                        "bg-purple-50 text-purple-700 border-purple-100",
                      "planning phase":
                        "bg-indigo-50 text-indigo-700 border-indigo-100",
                      "decorator assigned":
                        "bg-primary/5 text-primary border-primary/10",
                    };

                    return (
                      <tr
                        key={booking._id || index}
                      >
                        <td className="px-8 py-6 font-black text-">
                          #{index + 1}
                        </td>

                        <td className="px-8 py-6">
                          <div className="font-black text-primary text-lg leading-tight mb-1">
                            {booking.serviceName}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                            <span className="text-[10px] font-bold text-[#6B705C] uppercase tracking-tighter">
                              Premium Service
                            </span>
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-primary font-bold text-sm">
                            <svg
                              className="w-4 h-4 text-"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {booking.location || "Private Venue"}
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <div className="text-primary font-black text-sm mb-1">
                            {booking.date}
                          </div>
                          <div className="text-[10px] font-bold text- uppercase">
                            {booking.time}
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <div
                            className={`inline-flex items-center px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-sm ${
                              statusStyles[booking.status] ||
                              "bg-slate-50 text-slate-700"
                            }`}
                          >
                            {booking.status}
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleUpdateStatus(booking, "planning phase")
                              }
                              disabled={booking.status !== "decorator assigned"}
                              className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-primary/20 disabled:opacity-20 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(booking, "pending")}
                              disabled={booking.status !== "decorator assigned"}
                              className="px-4 py-2 border-2 border-[#6B705C]/20 text-[#6B705C] text-[10px] font-black uppercase rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-100 disabled:opacity-20 transition-all"
                            >
                              Reject
                            </button>
                          </div>
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
                                handleUpdateStatus(
                                  booking,
                                  "on the way to venue"
                                )
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedProjects;
