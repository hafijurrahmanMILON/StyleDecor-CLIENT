import React from "react";
import {
  BarChart,
  Bar,
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
        <p className="">Monitor your business performance and metrics</p>
      </div>

      {/* Business Summury */}
      <div className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/80 p-10 mb-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2 bg-clip-text text-primary">
              Performance Snapshot
            </h2>
            <p className="  font-medium">
              Real-time business metrics and insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl opacity-5"></div>
            <div className="relative bg-gray-50/50 rounded-2xl border border-gray-100 p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  Metric
                </span>
              </div>
              <h3 className="font-bold   text-xs uppercase tracking-widest mb-1">
                Avg. Booking Value
              </h3>
              <div className="text-2xl font-black   mb-4 tracking-tight">
                ৳{(totalIncome / (totalBookings || 1)).toFixed(2)}
              </div>
              <div className="mt-auto">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-linear-to-r from-blue-600 to-indigo-400 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalIncome / (totalBookings || 1) / 50) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold   uppercase">
                  <span>Efficiency</span>
                  <span className="text-blue-600">
                    {totalIncome / (totalBookings || 1) > 100
                      ? "High"
                      : "Standard"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500 to-teal-600 rounded-3xl opacity-5"></div>
            <div className="relative bg-gray-50/50 rounded-2xl border border-gray-100 p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-200 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="font-bold   text-xs uppercase tracking-widest mb-1">
                Top Performer
              </h3>
              <div className="text-xl font-black   mb-4 truncate tracking-tight">
                {mostPopularService}
              </div>
              <div className="mt-auto">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-full"
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
                <div className="flex justify-between text-[10px] font-bold   uppercase">
                  <span>Market Share</span>
                  <span className="text-emerald-600">
                    {serviceChartData.length > 0
                      ? `${(
                          (Math.max(...serviceChartData.map((s) => s.booked)) /
                            totalBookings) *
                          100
                        ).toFixed(1)}%`
                      : "0%"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-purple-600 rounded-3xl opacity-5"></div>
            <div className="relative bg-gray-50/50 rounded-2xl border border-gray-100 p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-600 shadow-lg shadow-violet-200 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-bold   text-xs uppercase tracking-widest mb-1">
                Total Revenue
              </h3>
              <div className="text-2xl font-black   mb-4 tracking-tight">
                ৳{totalIncome.toLocaleString()}
              </div>
              <div className="mt-auto">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-linear-to-r from-violet-600 to-purple-400 rounded-full"
                    style={{
                      width: `${Math.min(100, (totalIncome / 10000) * 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold   uppercase">
                  <span>Currency</span>
                  <span className="text-violet-600 font-black">BDT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500 to-orange-600 rounded-3xl opacity-5"></div>
            <div className="relative bg-gray-50/50 rounded-2xl border border-gray-100 p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 shadow-lg shadow-amber-200 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-bold   text-xs uppercase tracking-widest mb-1">
                Total Bookings
              </h3>
              <div className="text-2xl font-black   mb-4 tracking-tight">
                {totalBookings}
              </div>
              <div className="mt-auto">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-linear-to-r from-amber-500 to-orange-400 rounded-full"
                    style={{
                      width: `${Math.min(100, (totalBookings / 100) * 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold   uppercase">
                  <span>Status</span>
                  <span className="text-amber-600 font-black">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100/60 relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 text-sm font-medium ">
            <div className="p-2 rounded-full bg-gray-50 ">
              <IoIosInformationCircleOutline className="w-5 h-5" />
            </div>
            <span>
              Data synchronized{" "}
              <span className="  font-bold">automatically</span> • Last update:
              Just now
            </span>
          </div>
          <div className="flex items-center gap-4 bg-gray-50/80 px-4 py-2 rounded-full border border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold   uppercase tracking-tighter">
                System Health:
              </span>
              <span className="text-xs font-black text-emerald-600 uppercase">
                Optimal
              </span>
            </div>
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
          </div>
        </div>
      </div>

      {/* service demand */}
      <div className="mb-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
          <div className="px-10 py-8 border-b border-gray-50 bg-linear-to-r from-gray-50/50 via-white to-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  <h2 className="text-3xl font-black tracking-tight text-primary">
                    Service Demand
                  </h2>
                </div>
                <p className="text-gray-500 font-medium ml-5">
                  Real-time booking distribution analytics
                </p>
              </div>

              <div className="flex items-center gap-4 ml-5 sm:ml-0">
                <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-gray-900 rounded-2xl shadow-lg shadow-gray-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">
                    Total Bookings
                  </span>
                </div>
                <div className="px-5 py-2.5 bg-primary/5 rounded-2xl border border-primary/10">
                  <span className="text-sm font-black text-primary">
                    {serviceChartData.length} active units
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10">
            {serviceChartData.length > 0 ? (
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={serviceChartData}
                      margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                      barSize={40}
                    >
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6B705C"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#6B705C"
                            stopOpacity={0.6}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="8 8"
                        stroke="#F3F4F6"
                        vertical={false}
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#9CA3AF",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                        tickFormatter={(value) => value.toLocaleString()}
                      />

                      <Tooltip
                        cursor={{ fill: "#F9FAFB", radius: 12 }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                                  {label}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-white text-lg font-black">
                                    {payload[0].value}
                                  </span>
                                  <span className="text-emerald-400 text-xs font-bold">
                                    Bookings
                                  </span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{
                          paddingTop: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#6B7280",
                        }}
                        payload={[
                          {
                            value: "Bookings",
                            type: "circle",
                            color: "#6B705C",
                          },
                        ]}
                      />
                      <Bar
                        dataKey="booked"
                        fill="url(#barGradient)"
                        radius={[12, 12, 4, 4]}
                        animationBegin={0}
                        animationDuration={2000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-4xl bg-gray-50/30">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                  <div className="relative w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                    <span className="text-4xl text-gray-300">📈</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                  Awaiting Market Data
                </h3>
                <p className="text-gray-500 text-center max-w-sm font-medium leading-relaxed px-6">
                  Detailed analytics will manifest here once your first customer
                  interaction is recorded.
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Real-time tracking
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Auto-Sync Active
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* service distrubution */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-10 gap-6 relative p-1">
            <div className="relative group">
              <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-linear-to-b from-primary to-[#ddbea9] rounded-full transform transition-transform duration-500 group-hover:scale-y-110"></div>

              <div className="flex flex-col gap-1">
                <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-primary leading-none">
                  Service Distribution
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/5 rounded-md border border-primary/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[10px] lg:text-xs font-black text-[#6B705C] uppercase tracking-[0.2em]">
                      Booking Share Analytics
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center lg:justify-end">
              <div className="relative overflow-hidden bg-white px-6 py-3 rounded-2xl shadow-[0_10px_30px_-10px_rgba(27,114,97,0.15)] border border-primary/5 flex items-center gap-4 transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(27,114,97,0.2)]">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#ddbea9]/10 blur-2xl rounded-full"></div>

                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-[#6B705C] uppercase tracking-[0.25em] leading-none mb-1">
                    Active Units
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">
                      {serviceChartData.length}
                    </span>
                    <span className="text-xs font-bold text-[#ddbea9]">
                      Services
                    </span>
                  </div>
                </div>

                <div className="h-8  bg-linear-to-b from-transparent via-primary/20 to-transparent"></div>

                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {serviceChartData.length > 0 ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full md:w-1/2 order-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => {
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

              <div className="w-full md:w-1/2 order-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold   mb-3">
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
                            <div className="text-sm font-semibold ">
                              {service.booked}
                            </div>
                            <div className="text-xs ">{percentage}%</div>
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
              <h3 className="text-lg font-semibold   mb-1">No Data Yet</h3>
              <p className="text-sm   text-center max-w-xs">
                Service distribution will appear here once bookings are
                available
              </p>
            </div>
          )}
        </div>
      </div>

      {/* service parformance */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-primary/5 overflow-hidden mb-12">
        <div className="bg-linear-to-r from-primary/5 via-white to-white px-10 py-8 border-b border-primary/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-primary tracking-tight mb-1">
                Service Performance
              </h2>
              <p className="text-[#6B705C] font-semibold flex items-center gap-2 uppercase text-[10px] tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#ddbea9]"></span>
                Intelligence Metrics per category
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-xs font-black text-white uppercase tracking-widest">
                  {totalBookings} Total Bookings
                </span>
              </div>
            </div>
          </div>
        </div>

        {serviceChartData.length > 0 ? (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="bg-primary/2">
                    <th className="text-left p-8 font-black text-primary text-xs uppercase tracking-[0.2em]">
                      Service Identifier
                    </th>
                    <th className="text-center p-8 font-black text-primary text-xs uppercase tracking-[0.2em]">
                      Volume
                    </th>
                    <th className="text-center p-8 font-black text-primary text-xs uppercase tracking-[0.2em]">
                      Market Share
                    </th>
                    <th className="text-center p-8 font-black text-primary text-xs uppercase tracking-[0.2em]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {serviceChartData.map((service, index) => {
                    const percentage = (
                      (service.booked / totalBookings) *
                      100
                    ).toFixed(1);
                    const isTopService =
                      service.booked ===
                      Math.max(...serviceChartData.map((s) => s.booked));
                    const color = CHART_COLORS[index % CHART_COLORS.length];

                    return (
                      <tr
                        key={index}
                        className="hover:bg-primary/1 transition-all duration-300 group"
                      >
                        <td className="p-8">
                          <div className="flex items-center gap-5">
                            <div className="relative">
                              <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg "
                                style={{ backgroundColor: color }}
                              >
                                {service.name.charAt(0).toUpperCase()}
                              </div>
                              {isTopService && (
                                <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-yellow-100">
                                  <span className="text-sm">👑</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-black text-lg text-primary">
                                  {service.name}
                                </span>
                                {isTopService && (
                                  <span className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-black rounded-lg uppercase tracking-wider border border-[#F59E0B]/20">
                                    Peak Performance
                                  </span>
                                )}
                              </div>
                              <p className="text-[#6B705C] text-sm font-bold opacity-80">
                                ID: SER-{1000 + index}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-8 text-center">
                          <div className="inline-flex flex-col items-center">
                            <span className="text-3xl font-black text-primary leading-none mb-1">
                              {service.booked}
                            </span>
                            <span className="text-[10px] font-bold text-[#ddbea9] uppercase tracking-widest">
                              Reservations
                            </span>
                          </div>
                        </td>

                        <td className="p-8 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-full max-w-[120px] h-2 bg-primary/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: color,
                                }}
                              ></div>
                            </div>
                            <span className="text-lg font-black text-primary">
                              {percentage}%
                            </span>
                          </div>
                        </td>

                        <td className="p-8 text-center">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border ${
                              parseFloat(percentage) > 20
                                ? "bg-[#10B981]/5 border-[#10B981]/20 text-[#10B981]"
                                : "bg-[#6B705C]/5 border-[#6B705C]/20 text-[#6B705C]"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                parseFloat(percentage) > 20
                                  ? "bg-[#10B981] animate-ping"
                                  : "bg-[#6B705C]"
                              }`}
                            ></div>
                            <span className="text-xs font-black uppercase tracking-widest">
                              {parseFloat(percentage) > 20
                                ? "High Growth"
                                : "Stable"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-primary/2 px-10 py-6 border-t border-primary/5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    <span className="text-xs font-bold text-[#6B705C] uppercase tracking-widest">
                      Market Leader
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                    <span className="text-xs font-bold text-[#6B705C] uppercase tracking-widest">
                      High Velocity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
              <div className="relative w-24 h-24 bg-white rounded-4xl shadow-2xl flex items-center justify-center border border-primary/10">
                <svg
                  className="w-10 h-10 text-primary/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-black text-primary mb-2 tracking-tight">
              System Ready
            </h3>
            <p className="text-[#6B705C] font-medium text-center max-w-sm leading-relaxed">
              Performance diagnostics will initialize automatically upon your
              first successful transaction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
