import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { FaDollarSign, FaCheckCircle, FaChartBar } from "react-icons/fa";

const Earnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["decorator-earnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator/earnings?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const { totalEarnings = 0, totalCompletedJobs = 0 } = data;
  const avgEarning =
    totalCompletedJobs > 0
      ? (totalEarnings / totalCompletedJobs).toFixed(2)
      : 0;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="relative">
          <h2 className="text-4xl lg:text-5xl font-black text-primary tracking-tight mb-2">
            Earning Summary
          </h2>
          <p className="text-[#6B705C] font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ddbea9] animate-pulse"></span>
            Financial Intelligence Dashboard
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
              <h3 className="text-3xl font-bold text-primary">
                ৳{totalEarnings.toFixed(2)}
              </h3>
            </div>
            <FaDollarSign className="w-8 h-8 text-primary/40" />
          </div>
          <p className="text-xs text-gray-500 mt-2">From completed jobs</p>
        </div>

        <div className="p-6 rounded-xl bg-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Completed Jobs</p>
              <h3 className="text-3xl font-bold text-secondary">
                {totalCompletedJobs}
              </h3>
            </div>
            <FaCheckCircle className="w-8 h-8 text-secondary/40" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Projects delivered</p>
        </div>

        <div className="p-6 rounded-xl bg-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Avg Per Job</p>
              <h3 className="text-3xl font-bold text-accent">৳{avgEarning}</h3>
            </div>
            <FaChartBar className="w-8 h-8 text-accent/40" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Average earnings per job</p>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
