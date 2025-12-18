import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiTag } from "react-icons/fi";

const ServiceCard = ({ service }) => {
  const {
    _id,
    service_name,
    cost,
    unit,
    service_category,
    description,
    image,
  } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-4xl overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(27,114,97,0.1)]"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={service_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute top-4 left-4 z-10">
          <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-md text-primary shadow-sm">
            <FiTag className="text-accent" />
            {service_category}
          </span>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        </div>
      </div>

      <div className="p-7">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif font-semibold text-[#2D2D2D] group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {service_name}
          </h3>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-2 line-clamp-2 min-h-10">
          {description}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">Starting from</span>
            <div className="flex items-baseline gap-1">
               <span className="text-2xl font-bold text-primary">৳{cost}</span>
               <span className="text-gray-400 text-xs font-medium">/{unit}</span>
            </div>
          </div>

          <Link
            to={`/service-details/${_id}`}
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-500 group/btn"
          >
            <FiArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            
            <span className="absolute -top-10 scale-0 group-hover/btn:scale-100 transition-all bg-[#2D2D2D] text-white text-[10px] py-1 px-3 rounded-md">
              Details
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;