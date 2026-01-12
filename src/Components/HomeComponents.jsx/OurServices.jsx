import React from "react";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../ServiceCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { Link } from "react-router";

const OurServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredServices = [] } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/featured-services`);
      return res.data;
    },
  });

  return (
    <section>
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-accent"></span>
            <p className="text-accent text-sm md:text-base font-bold uppercase tracking-[0.3em]">
              Exquisite Offerings
            </p>
            <span className="w-8 h-0.5 bg-accent"></span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary font-black tracking-tighter leading-tight">
            Elevate Your Space with <br />
            <span className="text-secondary italic font-medium">
              Bespoke Services
            </span>
          </h1>

          <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
            From minimalist modernism to classic elegance, we provide
            professional decor solutions tailored to your unique lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {featuredServices.length > 0 ? (
            featuredServices.map((service, index) => (
              <div key={index} className="flex justify-center">
                <ServiceCard service={service} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 italic">
                Curating our finest services for you...
              </p>
            </div>
          )}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 px-8 py-3.5   text-sm btn btn-outline btn-primary font-bold rounded-full  transition-all duration-300 active:scale-95"
          >
            View All Services
            <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
