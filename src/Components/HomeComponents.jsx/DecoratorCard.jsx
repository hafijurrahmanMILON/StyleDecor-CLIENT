import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import React from "react";

const DecoratorCard = ({ decorator, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className="bg-base-100 rounded-xl shadow-lg p-5 transition-all duration-300 group "
    >
      <motion.div
        className="relative mb-4"
        transition={{ duration: 0.3 }}
      >
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src={decorator.photoURL}
            alt={decorator.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>

        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
          }}
          className="absolute -top-2 -left-2 w-8 h-8 bg-accent/30 rounded-full -z-10"
        />
      </motion.div>

      <h3 className="text-lg font-bold text-center text-secondary mb-2  transition-colors duration-300">
        {decorator.name}
      </h3>

      <motion.div
        className="flex items-center justify-center gap-2 mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        <div className="flex">
          {[...Array(5)].map((_, starIndex) => (
            <motion.div
              key={starIndex}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5 + starIndex * 0.1 }}
            >
              <FaStar
                className={`w-4 h-4 ${
                  starIndex < Math.floor(decorator.ratings)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </motion.div>
          ))}
        </div>
        <span className="text-sm font-bold text-primary">
          {decorator.ratings}
        </span>
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center">
        {decorator.specialities?.map((specialty, specIndex) => (
          <motion.span
            key={specIndex}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.7 + specIndex * 0.1,
              type: "spring",
            }}
            className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full"
          >
            {specialty}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default DecoratorCard;
