import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import { TbUserCancel, TbUserCheck } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import userImg from "../../assets/user.png";
import Swal from "sweetalert2";

const DecoratorRequests = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    data: decorators = [],
    refetch,
  } = useQuery({
    queryKey: ["decorators", "pending", "cancelled"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators?status=pending,cancelled`);
      return res.data;
    },
  });

  const handleUpdateDecorator = (decorator, status) => {
    const updateInfo = {
      status,
      email: decorator?.email,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/decorators/${decorator?._id}`, updateInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: `Decorator request has been ${status}!`,
                icon: "success",
                showConfirmButton: true,
              });
            }
          });
      }
    });
  };

  const handleApprove = (decorator) => {
    handleUpdateDecorator(decorator, "approved");
  };
  const handleCancel = (decorator) => {
    handleUpdateDecorator(decorator, "cancelled");
  };
  const handleDelete = (decorator) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/decorators/${decorator?._id}/delete`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: `Decorator request has been Deleted!`,
                icon: "success",
                showConfirmButton: true,
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
    <div className="px-2 md:px-4 py-8">
      <div>
        <div className="mb-8">
          <h1 className="text-4xl text-primary font-bold">
            Decorator Requests
          </h1>
          <p className="text-gray-600 mt-2">Manage decorator applications</p>
          <div className="mt-4 p-3 bg-primary/10 text-primary font-medium rounded-lg inline-block">
            Total Requests: {decorators.length}
          </div>
        </div>

        {decorators.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                No Request Yet!
              </h1>
              <p className="text-gray-600 mt-2">
                No pending decorator applications at the moment.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decorators.map((decorator, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      #{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {decorator.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{decorator.email}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden ml-3 shrink-0">
                    <img
                      src={decorator.photoURL || userImg}
                      alt={decorator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <span
                    className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      decorator.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : decorator.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {decorator.status}
                  </span>
                  <span
                    className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      decorator.workStatus === "available"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {decorator.workStatus || "N/A"}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Specialities</p>
                  <div className="flex flex-wrap gap-2">
                    {decorator.specialities?.slice(0, 2).map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 mt-auto">
                  <button
                    onClick={() => handleApprove(decorator)}
                    className="flex-1 btn btn-soft btn-success rounded-md text-sm px-2 py-1"
                  >
                    <TbUserCheck />
                    Approve
                  </button>
                  <button
                    onClick={() => handleCancel(decorator)}
                    className="flex-1 btn btn-soft btn-warning rounded-md text-sm px-2 py-1"
                  >
                    <TbUserCancel />
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(decorator)}
                    className="flex-1 btn btn-soft btn-error rounded-md text-sm px-2 py-1"
                  >
                    <AiOutlineUserDelete />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoratorRequests;
