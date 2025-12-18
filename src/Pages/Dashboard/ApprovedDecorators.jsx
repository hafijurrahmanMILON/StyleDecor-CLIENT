import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { TbUserCancel, TbUserCheck } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import userImg from "../../assets/user.png";
import Swal from "sweetalert2";
import { FiUserMinus } from "react-icons/fi";

const ApprovedDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: decorators = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["decorators", "approved"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators?status=approved`);
      return res.data;
    },
  });

  // Calculate pagination
  const totalPages = Math.ceil(decorators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDecorators = decorators.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDemoteToUser = (decorator) => {
    const removeInfo = {
      status: "removed",
      email: decorator?.email,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove decorator access permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/decorators/${decorator?._id}`, removeInfo)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: `${decorator?.name} is now a regular user.!`,
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
          <h1 className="text-4xl text-primary font-bold">Decorators</h1>
          <p className="text-gray-600 mt-2">Manage decorators</p>
          <div className="mt-4 p-3 bg-primary/10 text-primary font-medium rounded-lg inline-block">
            Total Approved: {decorators.length}
          </div>
        </div>

        {decorators.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                No Approved Decorators!
              </h1>
              <p className="text-gray-600 mt-2">
                No approved decorators at the moment.
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDecorators.map((decorator, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">
                        #{startIndex + index + 1}
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
                          ? "bg-blue-100 text-blue-800"
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
                          ? "bg-green-100 text-green-800"
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
                      onClick={() => handleDemoteToUser(decorator)}
                      className="flex-1 btn btn-soft btn-error rounded-md text-sm px-2 py-1"
                    >
                      <FiUserMinus />
                      Remove from Decorator
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApprovedDecorators;
