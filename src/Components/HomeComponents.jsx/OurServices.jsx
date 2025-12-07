import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../ServiceCard";

const OurServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredServices = [] } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/featured-services`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <div className="text-center space-y-2">
        <p className="text-primary text-lg font-semibold">Our Services</p>
        <h1 className="text-5xl font-bold"> We're Providing Best Services</h1>
        <p>{featuredServices.length}</p>
        <div className="container mx-auto px-4">
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
