import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import ServiceCard from "../Components/ServiceCard";
import useDebounce from "../Hooks/useDebounce";

const Services = () => {
  const axiosInstance = useAxiosInstance();

  const [searchText, setSearchText] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  
  const searchDebounce = useDebounce(searchText);
  const maxDebounce = useDebounce(maxBudget);
  const minDebounce = useDebounce(minBudget);
  
  const { data: allServices = [] } = useQuery({
    queryKey: [
      "allServices",
      searchDebounce,
      serviceType,
      maxDebounce,
      minDebounce,
    ],
    queryFn: async () => {
      const res = await axiosInstance.get(
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
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-secondary">
            All Services
          </h1>
          <p className="text-gray-600 mt-2">
            Find the perfect decoration service for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-8">
           {/* Left Side  */}
          <div className="col-span-3">
            <div className="bg-base-100 rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-secondary mb-6">Filters</h2>
              
            
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Services
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search by service name..."
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

         
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Category
                </label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="home">Home Decoration</option>
                  <option value="office">Office Decoration</option>
                  <option value="wedding">Wedding Decoration</option>
                  <option value="ceremony">Ceremony Decoration</option>
                </select>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Budget Range
                  </label>
                  <button
                    type="button"
                    onClick={handleResetBudget}
                    className="text-sm text-primary hover:text-secondary font-medium transition-colors"
                  >
                    Reset
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Min Budget ($)</label>
                    <input
                      type="number"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      placeholder="0"
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Max Budget ($)</label>
                    <input
                      type="number"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      placeholder="1000"
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

             
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-primary">{allServices.length}</span> services found
                </p>
              </div>
            </div>
          </div>

        
          <div className="col-span-9">
            {allServices.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No services found</h3>
                <p className="text-gray-500">Try adjusting your filters to find more services</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;