import React from "react";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const {_id, service_name, cost, unit, service_category, description, image } =
    service;

  return (
    <div className="group bg-base-100 rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=400&fit=crop"
          }
          alt={service_name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              service_category === "ceremony"
                ? "bg-primary text-white"
                : service_category === "home"
                ? "bg-secondary text-white"
                : "bg-accent text-gray-800"
            }`}
          >
            {service_category.charAt(0).toUpperCase() +
              service_category.slice(1)}
          </span>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {service_name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {description}
        </p>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-primary">${cost}</span>
            <span className="text-gray-500 text-sm ml-1">{unit}</span>
          </div>

          <Link to={_id} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-secondary transition-all duration-300 hover:scale-105 active:scale-95">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
