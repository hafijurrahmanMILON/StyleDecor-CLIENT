import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ServiceCard from "../Components/ServiceCard";
import useDebounce from "../Hooks/useDebounce";
import { FaFilter, FaSearch } from "react-icons/fa";
import Loading from "../Components/Loading";

const Services = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const searchDebounce = useDebounce(searchText);
  const maxDebounce = useDebounce(maxBudget);
  const minDebounce = useDebounce(minBudget);

  const { data: allServices = [], isLoading } = useQuery({
    queryKey: [
      "allServices",
      searchDebounce,
      serviceType,
      maxDebounce,
      minDebounce,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-services?searchText=${searchDebounce}&serviceType=${serviceType}&maxBudget=${maxDebounce}&minBudget=${minDebounce}`
      );
      return res.data;
    },
  });

  const handleResetBudget = () => {
    setMinBudget("");
    setMaxBudget("");
  };

  return (
    <div className="w-10/12 mx-auto my-12">
      <div>
        <div className="mb-16 lg:mb-24 text-center relative px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-primary/5 blur-[100px] -z-10"></div>

          <div className="inline-block relative">
            <h2 className="text-5xl lg:text-7xl font-black text-primary tracking-tighter leading-tight">
              All{" "}
              <span className="text-accent italic font-serif tracking-normal">
                Services
              </span>
            </h2>
          </div>

        
          <div className="mt-6 max-w-xl mx-auto">
            <p className="text-[#6B705C] font-semibold text-sm lg:text-lg leading-relaxed tracking-wide">
              Discover an elite range of{" "}
              <span className="text-primary font-black italic">
                bespoke decoration
              </span>{" "}
              solutions tailored for your most significant milestones.
            </p>
          </div>
        </div>

        
        <div className="lg:hidden mb-6">
          <label
            htmlFor="filter-drawer"
            className="btn btn-primary btn-outline w-full gap-2"
          >
            <FaFilter />
            Filter Services
          </label>
        </div>

        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <div className="bg-white rounded-4xl shadow-[0_20px_60px_-15px_rgba(27,114,97,0.08)] border border-primary/5 p-8">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-black text-primary tracking-tight text-nowrap">
                  Filter
                </h2>
              </div>

              <div className="mb-10 group">
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-[0.2em] mb-3 ml-1">
                  Keywords
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 transition-opacity" />
                  <input
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="What are you looking for?"
                    className="w-full pl-12 pr-4 py-4 bg-[#fdfbf9] border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm font-semibold text-primary placeholder-[#6B705C]/40 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-[0.2em] mb-3 ml-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full py-4 px-4 bg-[#fdfbf9] border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-primary cursor-pointer shadow-inner"
                  >
                    <option value="">All Collections</option>
                    <option value="home">Bespoke Home</option>
                    <option value="office">Corporate Spaces</option>
                    <option value="wedding">Grand Weddings</option>
                    <option value="ceremony">Ceremonial</option>
                    <option value="seminar">Elite Seminars</option>
                    <option value="meeting">Private Meetings</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-[#6B705C] uppercase tracking-[0.2em] ml-1">
                    Budget (৳)
                  </label>
                  <button
                    type="button"
                    onClick={handleResetBudget}
                    className="text-[9px] font-black text-[#ddbea9] hover:text-primary uppercase tracking-widest transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      placeholder="Min"
                      className="w-full py-3 px-4 bg-[#fdfbf9] border-none rounded-xl text-xs font-bold text-primary shadow-inner focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      placeholder="Max"
                      className="w-full py-3 px-4 bg-[#fdfbf9] border-none rounded-xl text-xs font-bold text-primary shadow-inner focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="col-span-12 lg:col-span-9">
            {isLoading ? (
              <div className="min-h-[60vh] flex items-center justify-center bg-white rounded-[3rem]">
                <Loading />
              </div>
            ) : allServices.length === 0 ? (
              <div className="text-center min-h-[70vh] flex flex-col justify-center items-center py-12 bg-white rounded-[3rem] border border-primary/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.02)]">
                <div className="w-24 h-24 mb-6 bg-[#fdfbf9] rounded-full flex items-center justify-center shadow-inner text-[#ddbea9]">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-primary mb-2 tracking-tight italic">
                  No Match Found
                </h3>
                <p className="text-[#6B705C] font-semibold max-w-xs mx-auto">
                  We couldn't find any services matching your refined criteria.
                  Try broadening your selection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {allServices.map((service) => (
                  <div
                    key={service._id}
                    className="transition-all duration-500 hover:-translate-y-2"
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer drawer-end lg:hidden z-100">
        <input id="filter-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="filter-drawer"
            aria-label="close sidebar"
            className="drawer-overlay backdrop-blur-sm bg-black/20"
          ></label>

          <div className="bg-[#fdfbf9] min-h-full w-85 max-w-[320px] p-8 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-black text-primary tracking-tight">
                  Refine
                </h2>
                <div className="h-1 w-6 bg-[#ddbea9] rounded-full mt-1"></div>
              </div>
              <label
                htmlFor="filter-drawer"
                className="btn btn-ghost btn-circle bg-white shadow-sm text-primary hover:rotate-90 transition-transform duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            </div>

            <div className="grow space-y-8 overflow-y-auto">
              <div className="group">
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-[0.2em] mb-3 ml-1">
                  Search
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" />
                  <input
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Service name..."
                    className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm font-semibold text-primary shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-[0.2em] mb-3 ml-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full py-4 px-4 bg-white border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-primary shadow-sm"
                  >
                    <option value="">All Collections</option>
                    <option value="home">Home Decoration</option>
                    <option value="office">Office Decor</option>
                    <option value="wedding">Weddings</option>
                    <option value="ceremony">Ceremony</option>
                    <option value="seminar">Seminar</option>
                    <option value="meeting">Meeting</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-[#6B705C] uppercase tracking-[0.2em] ml-1">
                    Budget (৳)
                  </label>
                  <button
                    onClick={handleResetBudget}
                    className="text-[10px] font-bold text-[#ddbea9] underline underline-offset-4"
                  >
                    Reset
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="number"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    placeholder="Min Price"
                    className="w-full py-4 px-5 bg-white border-none rounded-xl text-sm font-bold text-primary shadow-sm focus:ring-1 focus:ring-primary/20"
                  />
                  <input
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="Max Price"
                    className="w-full py-4 px-5 bg-white border-none rounded-xl text-sm font-bold text-primary shadow-sm focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between  p-5 rounded-2xl shadow-xl shadow-primary/20">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Results Found
                </span>
                <span className="text-2xl font-black ">
                  {allServices.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
