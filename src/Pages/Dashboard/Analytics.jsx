import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: analyticsData, isLoading, isError } = useQuery({
    queryKey: ["adminAnalytics"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/analytics");
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-primary">Failed to load analytics data</p>
      </div>
    );
  }

  const { totalIncome, totalBookings, serviceWise } = analyticsData;

  const serviceChartData = serviceWise.map((item) => ({
    name: item._id,
    booked: item.totalBooked,
  }));

  const CHART_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
  const CARD_COLORS = {
    primary: "#1B7261",
    secondary: "#6B705C",
    accent: "#3B82F6",
    warning: "#F59E0B",
    success: "#10B981",
  };

  const mostPopularService = serviceChartData.length > 0 
    ? serviceChartData.reduce((prev, current) => 
        prev.booked > current.booked ? prev : current
      ).name 
    : "N/A";

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor your business performance and metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
              <p className="text-sm text-gray-500">From all paid bookings</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              ${totalIncome.toLocaleString()}
            </span>
            <span className="text-gray-500">BDT</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Average: ${(totalIncome / (totalBookings || 1)).toFixed(2)} per booking
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Bookings</h2>
              <p className="text-sm text-gray-500">All appointment requests</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              {totalBookings}
            </span>
            <span className="text-gray-500">Services</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Across {serviceChartData.length} different services
            </div>
          </div>
        </div>
      </div>

      {/* Service Demand Chart - Full Width */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Service Demand Chart</h2>
            <span className="text-sm text-gray-500">Bookings per service</span>
          </div>
          {serviceChartData.length > 0 ? (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis 
                    dataKey="name"
                    tick={false} // Remove service names from bottom
                    axisLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} bookings`, "Bookings"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="booked"
                    fill={CARD_COLORS.accent}
                    radius={[4, 4, 0, 0]}
                    name="Bookings"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
              <span className="text-4xl mb-4">📊</span>
              <p className="text-gray-500">No booking data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Service Distribution - Full Width */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Service Distribution</h2>
            <span className="text-sm text-gray-500">Booking share percentage</span>
          </div>
          {serviceChartData.length > 0 ? (
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={150}
                    innerRadius={70}
                    paddingAngle={3}
                    dataKey="booked"
                  >
                    {serviceChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} bookings`, "Count"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px ",
                    }}
                  />
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: "30px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
              <span className="text-4xl mb-4">🥧</span>
              <p className="text-gray-500">No distribution data available</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">Service Statistics</h2>
          <p className="text-gray-600 text-sm mt-1">Detailed breakdown by service</p>
        </div>
        {serviceChartData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">Service Name</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Bookings</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Share</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {serviceChartData.map((service, index) => {
                  const percentage = ((service.booked / totalBookings) * 100).toFixed(1);
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-primary">{service.name}</td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          {service.booked}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center font-semibold text-gray-700">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center">
            <span className="text-4xl mb-4">📋</span>
            <p className="text-gray-500">No service statistics available</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-2">Business Summary</h2>
          <p className="text-gray-600">Key performance indicators</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                <span>📊</span>
              </div>
              <h3 className="font-medium text-gray-700">Avg. Booking Value</h3>
            </div>
            <p className="text-2xl font-bold text-primary mt-2">
              ${(totalIncome / (totalBookings || 1)).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-1">Per booking</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                <span>⭐</span>
              </div>
              <h3 className="font-medium text-gray-700">Most Popular</h3>
            </div>
            <p className="text-xl font-bold text-primary mt-2 truncate">
              {mostPopularService}
            </p>
            <p className="text-sm text-gray-600 mt-1">Highest bookings</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                <span>📦</span>
              </div>
              <h3 className="font-medium text-gray-700">Services Offered</h3>
            </div>
            <p className="text-2xl font-bold text-primary mt-2">
              {serviceChartData.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Unique services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;