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
    <div className="p-4 lg:p-6 min-h-screen">
      <div className="flex items-center justify-between mb-12 relative">
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black text-primary tracking-tight">
            Today's Schedule
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="h-0.5 w-8 bg-[#ddbea9]"></span>
            <p className="text-[#6B705C] font-bold uppercase text-[10px] tracking-[0.3em]">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="max-w-2xl mx-auto py-20">
          <div className="relative bg-white rounded-[3rem] p-12 text-center border border-primary/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fdfbf9] rounded-full -mr-32 -mt-32"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-8 bg-primary/5 rounded-4xl flex items-center justify-center text-4xl">
                ✨
              </div>
              <h3 className="text-3xl font-black text-primary mb-3 tracking-tight">
                A Moment of Calm
              </h3>
              <p className="text-[#6B705C] font-medium max-w-xs mx-auto mb-8 leading-relaxed">
                Your itinerary is clear for today. Use this time to refine your
                craft or prepare for future masterpieces.
              </p>
              <div className="inline-block px-6 py-2 border-2 border-[#ddbea9] text-[#ddbea9] text-[10px] font-black uppercase tracking-widest rounded-full">
                No Active Engagements
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, index) => {
            const statusConfig = {
              completed: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
              "in-progress": "bg-primary/5 text-primary border-primary/10",
              pending: "bg-amber-50 text-amber-700 border-amber-100/50",
            };

            return (
              <div
                key={booking._id}
                className="relative bg-white rounded-[2.5rem] p-8 border border-primary/5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-4xl font-black text-primary/30 italic">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-[0.15em] mb-8 shadow-sm ${
                      statusConfig[booking.status] ||
                      "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {booking.status}
                  </div>

                  <h3 className="text-2xl font-black text-primary mb-8 leading-[1.1]">
                    {booking.serviceName}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#fdfbf9] rounded-xl flex items-center justify-center border border-primary/5 text-primary">
                        <SlLocationPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-[#6B705C] uppercase tracking-widest leading-none mb-1">
                          Venue Location
                        </p>
                        <p className="font-bold text-primary text-sm italic line-clamp-1">
                          {booking.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#fdfbf9] rounded-xl flex items-center justify-center border border-primary/5 text-[#ddbea9]">
                        <FaRegClock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-[#6B705C] uppercase tracking-widest leading-none mb-1">
                          Appointment
                        </p>
                        <p className="font-black text-primary text-sm">
                          {booking.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodaysSchedule;
