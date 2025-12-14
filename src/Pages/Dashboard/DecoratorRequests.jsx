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
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="table">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-gray-700 font-semibold">#</th>
                  <th className="text-gray-700 font-semibold">Candidate</th>
                  <th className="text-gray-700 font-semibold">Status</th>
                  <th className="text-gray-700 font-semibold">Specialities</th>
                  <th className="text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {decorators.map((decorator, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="font-medium text-gray-600">{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src={decorator.photoURL || userImg}
                              alt={decorator.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">
                            {decorator.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {decorator.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`items-center px-3 py-1 rounded-full text-xs font-medium ${
                          decorator.status ===  "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {decorator.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {decorator.specialities?.map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <div className="tooltip" data-tip="Approve">
                          <button
                            onClick={() => handleApprove(decorator)}
                            className="btn btn-soft btn-success btn-sm"
                          >
                            <TbUserCheck className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Cancel">
                          <button
                            onClick={() => handleCancel(decorator)}
                            className="btn btn-soft btn-warning btn-sm"
                          >
                            <TbUserCancel className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Delete">
                          <button
                            onClick={() => handleDelete(decorator)}
                            className="btn btn-soft btn-error btn-sm"
                          >
                            <AiOutlineUserDelete className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
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

export default DecoratorRequests;
