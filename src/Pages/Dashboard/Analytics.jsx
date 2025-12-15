import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaCalendarAlt, FaTag, FaChartBar } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Loading from "../../Components/Loading";
import { MdCollectionsBookmark } from "react-icons/md";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/analytics`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const pieChartData =
    data?.serviceWise?.map((item, index) => ({
      name: item._id,
      value: item.totalBooked,
      color: [
        "#1B7261",
        "#6B705C",
        "#ddbea9",
        "#3B82F6",
        "#8B5CF6",
        "#F97316",
        "#22C55E",
      ][index % 7],
    })) || [];
  return (
    <div className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Business performance overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Income</p>
                <p className="text-3xl font-bold text-primary">
                  ${data?.totalIncome.toFixed(2) || 0}
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-sm text-gray-500 mt-4">From paid bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-primary">
                  {data?.totalBookings || 0}
                </p>
              </div>
              <MdCollectionsBookmark className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-sm text-gray-500 mt-4">All service bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Service Types</p>
                <p className="text-3xl font-bold text-primary">
                  {data?.serviceWise?.length || 0}
                </p>
              </div>
              <FaTag className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Different service categories
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg Booking Value</p>
                <p className="text-3xl font-bold text-primary">
                  $
                  {data?.totalBookings
                    ? Math.round(data.totalIncome / data.totalBookings)
                    : 0}
                </p>
              </div>
              <FaChartBar className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-sm text-gray-500 mt-4">Per booking average</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Service Distribution</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} bookings`, "Bookings"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Service-wise Bookings Details</h2>
            <p className="text-gray-600 text-sm mt-1">
              Detailed breakdown by service type
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra text-center">
              <thead>
                <tr className="bg-gray-50">
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Total Bookings</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {data?.serviceWise?.map((service, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <th>{index + 1}</th>
                    <td className="px-6 py-4">
                      <div className="font-medium">{service._id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">
                        {service.totalBooked}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-700">
                        {(
                          (service.totalBooked / data.totalBookings) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(!data?.serviceWise || data.serviceWise.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">No booking data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
