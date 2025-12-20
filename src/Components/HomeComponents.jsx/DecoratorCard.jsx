import { motion } from "framer-motion";
import { FaStar, FaAward } from "react-icons/fa";
import React from "react";

const DecoratorCard = ({ decorator, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-secondary/30 transition-all duration-500"
    >
      <div className="absolute -top-3 right-8 px-4 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
        Top Talent
      </div>

      <div className="relative mb-8 text-center">
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 border border-dashed border-primary/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1.5 border border-secondary/20 rounded-full"
          />
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
            <img
              src={decorator.photoURL}
              alt={decorator.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            className="absolute -bottom-1 -right-1 w-10 h-10 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg z-20"
          >
            <FaAward size={14} />
          </motion.div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif font-semibold text-[#2D2D2D] group-hover:text-primary transition-colors duration-300">
          {decorator.name}
        </h3>
        <p className="text-xs font-medium text-secondary uppercase tracking-[0.2em] mt-1">
          Master Decorator
        </p>
      </div>

      <motion.div
        className="flex items-center justify-center gap-3 py-3 px-4 bg-[#FDFCFB] rounded-2xl border border-gray-50 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        <div className="flex gap-1">
          {[...Array(5)].map((_, starIndex) => (
            <FaStar
              key={starIndex}
              className={`w-3 h-3 ${
                starIndex < Math.floor(decorator.ratings)
                  ? "text-secondary"
                  : "text-gray-200"
              }`}
            />
          ))}
        </div>
        <div className="h-3 w-px bg-gray-300" />
        <span className="text-sm font-bold text-[#2D2D2D]">
          {decorator.ratings}
        </span>
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center">
        {decorator.specialities?.slice(0, 3).map((specialty, specIndex) => (
          <span
            key={specIndex}
            className="px-4 py-1.5 bg-white border border-gray-100 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
          >
            {specialty}
          </span>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-100 rounded-full group-hover:w-16 group-hover:bg-secondary/40 transition-all duration-500" />
    </motion.div>
  );
};

export default DecoratorCard;
