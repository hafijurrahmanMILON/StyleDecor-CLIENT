import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import { TbUserCancel, TbUserCheck } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import userImg from "../../assets/user.png";

const DecoratorRequests = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    data: decorators = [],
    refetch,
  } = useQuery({
    queryKey: ["decorators", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Decorator Requests
          </h1>
          <p className="text-gray-600 mt-2">
            Manage decorator applications and status
          </p>
          <div className="mt-4 p-3 bg-primary/10 text-primary font-medium rounded-lg inline-block">
            Total Requests: {decorators.length}
          </div>
        </div>

        {decorators.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center min-h-[60vh]">
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
                key={decorator._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4 min-h-[60px]">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      #{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {decorator.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-1">
                      {decorator.email}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden ml-3 flex-shrink-0">
                    <img
                      src={decorator.photoURL || userImg}
                      alt={decorator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mb-2">
                  <div className="space-y-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        decorator.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : decorator.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {decorator.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        decorator.workStatus === "available"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {decorator.workStatus || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Specialities</p>
                  <div className="flex flex-wrap gap-2 min-h-10">
                    {decorator.specialities.slice(0, 2).map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 mt-auto">
                  <button className="btn btn-soft btn-success rounded-md">
                    <TbUserCheck />
                    Approve
                  </button>
                  <button className="btn btn-soft btn-warning rounded-md">
                    <TbUserCancel />
                    Cancel
                  </button>
                  <button className="btn btn-soft btn-error rounded-md">
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
