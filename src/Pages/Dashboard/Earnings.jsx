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
      <h2 className="text-3xl font-bold text-primary mb-6">Earning Summary</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
              <h3 className="text-3xl font-bold text-primary">
                ${totalEarnings}
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
              <h3 className="text-3xl font-bold text-accent">${avgEarning}</h3>
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
