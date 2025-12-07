import React from "react";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../ServiceCard";
import useAxiosInstance from "../../Hooks/useAxiosInstance";

const OurServices = () => {
  const axiosInstance = useAxiosInstance();

  const { data: featuredServices = [] } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/featured-services`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <div className="text-center space-y-2">
        <p className="text-primary text-lg font-semibold">Our Services</p>
        <h1 className="text-5xl text-secondary font-bold"> We're Providing Best Services</h1>
        
        <div className="container mx-auto py-6">
          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
