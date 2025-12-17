import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { SlLocationPin } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";

const TodaysSchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["today-schedule", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator/today?email=${user.email}`
      );
      return res.data;
    },
  });

    if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">
        Today's Schedule
      </h2>

      {bookings.length === 0 ? (
        <div className=" flex flex-col items-center justify-center px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <p className="text-3xl text-center">🎉</p>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No work scheduled
            </h3>
            <p className="text-gray-600 mb-6">
              You have no bookings scheduled for today!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full">
                  #{index + 1}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <h3 className="font-bold text-lg  mb-3">{booking.serviceName}</h3>

              <div className="flex gap-8 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <SlLocationPin />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">
                      {booking.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <FaRegClock />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-800">{booking.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysSchedule;
