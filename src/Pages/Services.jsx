import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ServiceCard from "../Components/ServiceCard";
import useDebounce from "../Hooks/useDebounce";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import ServiceCardSkeleton from "../Components/ServiceCardSkeleton";
import { BiFilterAlt } from "react-icons/bi";

const Services = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const searchDebounce = useDebounce(searchText);
  const minDebounce = useDebounce(minBudget);
  const maxDebounce = useDebounce(maxBudget);

  const { data: allServices = [], isLoading } = useQuery({
    queryKey: [
      "allServices",
      searchDebounce,
      serviceType,
      minDebounce,
      maxDebounce,
      sortPrice,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-services?searchText=${searchDebounce}&serviceType=${serviceType}&minBudget=${minDebounce}&maxBudget=${maxDebounce}&sortPrice=${sortPrice}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchDebounce, serviceType, minDebounce, maxDebounce]);

  const totalItems = allServices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedServices = allServices.slice(startIndex, endIndex);

  const handleResetBudget = () => {
    setMinBudget("");
    setMaxBudget("");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filter Content Component (Reused for both Mobile and Desktop to keep code clean)
  const FilterContent = () => (
    <>
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
      <div className="mb-10">
        <label className="block text-[10px] font-black text-[#6B705C] uppercase tracking-[0.2em] mb-3 ml-1">
          Sort by Price
        </label>

        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="w-full py-4 px-4 bg-[#fdfbf9] border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-primary shadow-inner"
        >
          <option value="">Default</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="w-full md:w-10/12 mx-auto my-12 px-4 md:px-0 relative">
      {/* header */}
      <div className="mb-16 lg:mb-24 text-center relative px-4">
        <h2 className="text-5xl lg:text-7xl font-black text-primary">
          All <span className="text-accent italic font-serif">Services</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-[#6B705C] font-semibold">
          Discover bespoke decoration solutions for your milestones.
        </p>
      </div>

      {/* mobile filter Button */}
      <div className="lg:hidden mb-6 sticky top-20 z-40 bg-white/80 backdrop-blur-md py-2">
        <label
          htmlFor="filter-drawer"
          className="btn btn-primary btn-outline rounded-4xl w-full gap-2 shadow-lg"
        >
          <BiFilterAlt /> Filter Services
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-28 h-fit">
          <div className="bg-white rounded-4xl shadow-[0_20px_60px_-15px_rgba(27,114,97,0.08)] border border-primary/5 p-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              <h2 className="text-2xl font-black text-primary tracking-tight text-nowrap">
                Filter
              </h2>
            </div>
            {/* Using the Shared Filter Component */}
            <FilterContent />
          </div>
        </div>

        {/* right Content Area */}
        <div className="lg:col-span-9">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          ) : paginatedServices.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-bold">
              No services found matching your criteria.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>

              {/* pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-20">
                  <div className="flex items-center gap-3 p-2 bg-white border border-gray-100 shadow-xl shadow-primary/5 rounded-full">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:cursor-pointer 
          ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-primary hover:bg-primary hover:text-white shadow-sm"
          }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`min-w-12 hover:cursor-pointer h-12 px-4 rounded-full text-sm font-black transition-all duration-300 
              ${
                currentPage === i + 1
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-500 hover:bg-gray-50 hover:text-primary"
              }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:cursor-pointer
          ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-primary hover:bg-primary hover:text-white shadow-sm"
          }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Fixed at page level with Z-Index) */}
      <div className="drawer drawer-end z-50">
        <input id="filter-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="filter-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="p-6 w-80 min-h-full bg-white text-base-content">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-black text-primary tracking-tight">
                  Filters
                </h2>
              </div>
              <label htmlFor="filter-drawer" className="btn btn-ghost btn-sm btn-circle">
                <FaTimes />
              </label>
            </div>
            
            {/* Drawer Content (Reusing the same filters) */}
            <FilterContent />

            <div className="mt-4">
                <label htmlFor="filter-drawer" className="btn btn-primary w-full rounded-2xl">Apply Filters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;