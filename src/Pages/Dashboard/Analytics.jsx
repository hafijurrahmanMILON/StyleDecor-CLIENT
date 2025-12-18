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
import { IoIosInformationCircleOutline } from "react-icons/io";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useQuery({
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

  const CHART_COLORS = [
    "#1B7261",
    "#6B705C",
    "#ddbea9",
    "#A9D5BA",
    "#E8D5C4",
    "#F4A261",
  ];

  const CARD_COLORS = {
    primary: "#1B7261",
    secondary: "#6B705C",
    accent: "#ddbea9",
    warning: "#F59E0B",
    success: "#10B981",
  };

  const mostPopularService =
    serviceChartData.length > 0
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

      {/* Business Summury */}
      <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
   
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Performance Snapshot
            </h2>
            <p className="text-gray-600">
              Real-time business metrics and insights
            </p>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Average Booking Value */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-2xl blur transition-all duration-300 group-hover:blur-xl"></div>
            <div className="relative bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Avg. Booking Value
                    </h3>
                    <p className="text-xs text-gray-500">Per booking</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-medium">
                  $
                </div>
              </div>
              <div className="mt-4 grow">
                <div className="text-2xl font-bold text-primary mb-3">
                  ${(totalIncome / (totalBookings || 1)).toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (totalIncome / (totalBookings || 1) / 50) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    per unit
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Revenue efficiency</span>
                  <span className="font-medium text-blue-600">
                    {totalIncome / (totalBookings || 1) > 100
                      ? "High"
                      : "Standard"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Most Popular Service */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-emerald-500/5 rounded-2xl blur transition-all duration-300 group-hover:blur-xl"></div>
            <div className="relative bg-white rounded-xl border border-gray-200 p-6 hover:border-green-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-green-100 to-emerald-50 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Most Popular Service
                    </h3>
                    <p className="text-xs text-gray-500">Top performer</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-sm font-medium">
                  👑
                </div>
              </div>
              <div className="mt-4 grow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-bold text-primary mb-1">
                      {mostPopularService}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Market share</span>
                    <span className="font-medium text-green-600">
                      {serviceChartData.length > 0
                        ? `${(
                            (Math.max(
                              ...serviceChartData.map((s) => s.booked)
                            ) /
                              totalBookings) *
                            100
                          ).toFixed(1)}%`
                        : "0%"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full"
                      style={{
                        width: `${
                          serviceChartData.length > 0
                            ? (Math.max(
                                ...serviceChartData.map((s) => s.booked)
                              ) /
                                totalBookings) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl blur transition-all duration-300 group-hover:blur-xl"></div>
            <div className="relative bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-indigo-100 to-purple-50 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Total Revenue
                    </h3>
                    <p className="text-xs text-gray-500">All time</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-medium">
                  💰
                </div>
              </div>
              <div className="mt-4 grow">
                <div className="text-2xl font-bold text-primary mb-3">
                  ${totalIncome.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-indigo-500 to-purple-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (totalIncome / 10000) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    BDT
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Revenue growth</span>
                  <span className="font-medium text-indigo-600">+0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Bookings */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-linear-to-br from-teal-500/5 to-cyan-500/5 rounded-2xl blur transition-all duration-300 group-hover:blur-xl"></div>
            <div className="relative bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-teal-100 to-cyan-50 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Total Bookings
                    </h3>
                    <p className="text-xs text-gray-500">All time</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm font-medium">
                  📅
                </div>
              </div>
              <div className="mt-4 grow">
                <div className="text-2xl font-bold text-primary mb-3">
                  {totalBookings}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-teal-500 to-cyan-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (totalBookings / 100) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    bookings
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Booking growth</span>
                  <span className="font-medium text-teal-600">+0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <IoIosInformationCircleOutline />
              <span>Last updated: Just now • Data refreshes automatically</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-primary">Performance:</span>
                <span className="ml-2 text-green-600">Optimal ✓</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Demand Chart - Full Width */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1">
                  Service Demand Chart
                </h2>
                <p className="text-gray-600">
                  Visual representation of booking volume across all services
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-[#6B705C]"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Total Bookings
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-sm font-medium text-blue-700">
                    {serviceChartData.length} Services
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {serviceChartData.length > 0 ? (
              <div className="relative">
                <div className="h-[420px] rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={serviceChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={false}
                        axisLine={true}
                        stroke="#D1D5DB"
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <Tooltip
                        formatter={(value) => [`${value} bookings`, "Bookings"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          fontSize: "14px",
                          padding: "16px",
                        }}
                        labelStyle={{
                          fontWeight: "600",
                          color: "#1F2937",
                          marginBottom: "8px",
                        }}
                        itemStyle={{ color: "#6B705C", fontWeight: "500" }}
                        cursor={{ fill: "rgba(107, 112, 92, 0.05)" }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        iconSize={12}
                        iconType="circle"
                        formatter={(value) => (
                          <span className="text-gray-700 font-medium text-sm">
                            {value}
                          </span>
                        )}
                      />
                      <Bar
                        dataKey="booked"
                        fill="#6B705C"
                        radius={[6, 6, 0, 0]}
                        name="Bookings"
                        className="hover:opacity-90 transition-opacity duration-200"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Booking Data Available
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Booking statistics will appear here once services are booked
                  by customers. Start promoting your services to see data here.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span>Waiting for first booking</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span>Data will update automatically</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Distribution - Full Width */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 gap-2 lg:gap-0">
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-primary">
                Service Distribution
              </h2>
              <span className="text-xs lg:text-sm text-gray-500">
                Booking share percentage
              </span>
            </div>
            <div className="text-center lg:text-right">
              <span className="text-xs lg:text-sm text-gray-500 font-medium">
                Total Services: {serviceChartData.length}
              </span>
            </div>
          </div>

          {serviceChartData.length > 0 ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              {/* Pie Chart Container - Always first */}
              <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full md:w-1/2 order-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => {
                        // Show shorter labels on all screens
                        return `${name.split(" ")[0]}: ${(
                          percent * 100
                        ).toFixed(0)}%`;
                      }}
                      outerRadius="80%"
                      innerRadius="40%"
                      paddingAngle={2}
                      dataKey="booked"
                      cornerRadius={5}
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
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                        fontSize: "14px",
                        padding: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend Container - Always below/right of pie chart */}
              <div className="w-full md:w-1/2 order-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Service Breakdown
                  </h3>
                  <div className="space-y-2 max-h-[200px] md:max-h-[300px] overflow-y-auto pr-2">
                    {serviceChartData.map((service, index) => {
                      const percentage = (
                        (service.booked / totalBookings) *
                        100
                      ).toFixed(1);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 hover:bg-white rounded transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  CHART_COLORS[index % CHART_COLORS.length],
                              }}
                            />
                            <span className="text-sm font-medium text-primary truncate max-w-[120px]">
                              {service.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">
                              {service.booked}
                            </div>
                            <div className="text-xs text-gray-500">
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[250px] sm:h-[300px] flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-200 p-8">
              <span className="text-4xl lg:text-5xl mb-4 animate-pulse">
                🥧
              </span>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                No Data Yet
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-xs">
                Service distribution will appear here once bookings are
                available
              </p>
            </div>
          )}
        </div>
      </div>

      {/* service parformance */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
        <div className="bg-linear-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">
                Service Performance
              </h2>
              <p className="text-gray-600">
                Detailed metrics for each service category
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4A5D5A]"></div>
                <span className="text-sm text-gray-600">Booking Count</span>
              </div>
              <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Total: {totalBookings} Bookings
                </span>
              </div>
            </div>
          </div>
        </div>

        {serviceChartData.length > 0 ? (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-4 bg-[#4A5D5A] rounded"></div>
                        Service Name
                      </div>
                    </th>
                    <th className="text-center p-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Bookings
                    </th>
                    <th className="text-center p-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="text-center p-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {serviceChartData.map((service, index) => {
                    const percentage = (
                      (service.booked / totalBookings) *
                      100
                    ).toFixed(1);
                    const isTopService =
                      service.booked ===
                      Math.max(...serviceChartData.map((s) => s.booked));

                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                                style={{
                                  backgroundColor:
                                    CHART_COLORS[index % CHART_COLORS.length],
                                }}
                              >
                                {service.name.charAt(0).toUpperCase()}
                              </div>
                              {isTopService && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                                  <span className="text-xs">🔥</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary">
                                  {service.name}
                                </span>
                                {isTopService && (
                                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                    Most Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {service.booked === 1
                                  ? "1 booking"
                                  : `${service.booked} bookings`}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-6 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="relative">
                              <div className="text-2xl font-bold text-primary">
                                {service.booked}
                              </div>
                              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                                <div className="text-lg">
                                  {service.booked ===
                                    Math.max(
                                      ...serviceChartData.map((s) => s.booked)
                                    ) && "🏆"}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                              total
                            </span>
                          </div>
                        </td>

                        <td className="p-6 text-center">
                          <div className="inline-flex items-center justify-center px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg">
                            <span
                              className={`text-2xl font-bold ${
                                parseFloat(percentage) > 30
                                  ? "text-green-600"
                                  : parseFloat(percentage) > 10
                                  ? "text-blue-600"
                                  : "text-gray-700"
                              }`}
                            >
                              {percentage}%
                            </span>
                            <div className="ml-2 w-0.5 h-6 bg-gray-300"></div>
                            <div className="ml-2 text-left">
                              <div className="text-xs text-gray-600">
                                of total
                              </div>
                              <div className="text-xs font-medium text-gray-700">
                                {(
                                  (totalBookings * parseFloat(percentage)) /
                                  100
                                ).toFixed(0)}{" "}
                                bookings
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-6 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-2">
                              {parseFloat(percentage) > 20 ? (
                                <div className="text-green-500 text-xl">📈</div>
                              ) : parseFloat(percentage) > 10 ? (
                                <div className="text-blue-500 text-xl">➡️</div>
                              ) : (
                                <div className="text-gray-500 text-xl">📊</div>
                              )}
                            </div>
                            <span className="text-xs font-medium text-gray-700 capitalize">
                              {parseFloat(percentage) > 20
                                ? "High Demand"
                                : parseFloat(percentage) > 10
                                ? "Moderate"
                                : "Standard"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 bg-linear-to-r from-gray-50 to-white px-8 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-700">
                      Most Popular Service
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-700">
                      High Demand (&gt;20%)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-primary">
                      {serviceChartData.length}
                    </span>{" "}
                    services
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Statistics Available
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Service performance data will appear here once bookings are made
              across different services.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span>Waiting for bookings</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span>No data to display</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
