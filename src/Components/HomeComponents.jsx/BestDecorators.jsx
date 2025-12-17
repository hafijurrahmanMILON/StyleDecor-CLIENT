import React from "react";
import { motion } from "framer-motion";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import DecoratorCard from "./DecoratorCard";



const BestDecorators = () => {
  const axiosInstance = useAxiosInstance();
  const { data: bestDecorators} = useQuery({
    queryKey: ["bestDecorators"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/best-decorators`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div className="py-16 px-4">
      <div className="w-full  mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-lg font-semibold mb-2">
            Our Best Decorators
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Transforming Every Occasion Into Memories
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-3 md:px-0">
          {bestDecorators?.map((decorator, index) => (
            <DecoratorCard
              key={decorator.email}
              decorator={decorator}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className=" mt-16"
        />
      </div>
    </div>
  );
};

export default BestDecorators;
