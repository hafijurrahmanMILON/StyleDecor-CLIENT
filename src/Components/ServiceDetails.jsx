import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../Hooks/useAxiosInstance";

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary">
            Service not found
          </h2>
          <p className="text-gray-600 mt-2">
            The service you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">
              {service.service_name}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={
                  service.image ||
                  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop"
                }
                alt={service.service_name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10"></div>
          </div>

          {/* Right side - Details */}
          <div className="space-y-6">
            {/* Category badge */}
            <div>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  service.service_category === "ceremony"
                    ? "bg-primary text-white"
                    : service.service_category === "home"
                    ? "bg-secondary text-white"
                    : "bg-accent text-gray-800"
                }`}
              >
                {service.service_category.charAt(0).toUpperCase() +
                  service.service_category.slice(1)}{" "}
                Service
              </span>
            </div>

            {/* Service name */}
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              {service.service_name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                ${service.cost}
              </span>
              <span className="text-gray-600 text-lg">/{service.unit}</span>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Service Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Service provider info */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Service Provider
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {service.createdByEmail?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Professional Decorator
                  </p>
                  <p className="text-gray-600 text-sm">
                    {service.createdByEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Created date */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Service created on:{" "}
                <span className="font-medium">
                  {new Date(service.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>

            {/* Book Now Button */}
            <div className="pt-8">
              <button className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                Book This Service Now
              </button>

              {/* Additional info */}
              <p className="text-center text-gray-600 mt-4 text-sm">
                Book now to schedule your{" "}
                {service.service_category.toLowerCase()} decoration
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Need Help?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about this service? Our decoration experts are
              available to help you choose the perfect package for your needs.
            </p>
            <button className="mt-6 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-lg transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
