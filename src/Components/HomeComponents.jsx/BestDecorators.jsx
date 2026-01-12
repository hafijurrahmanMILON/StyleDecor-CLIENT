import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import DecoratorCard from "./DecoratorCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BestDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const { data: bestDecorators } = useQuery({
    queryKey: ["bestDecorators"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/best-decorators`);
      return res.data;
    },
  });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64  rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-accent uppercase border-l-4 border-primary bg-primary/5">
              Expert Artisans
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2D2D2D] leading-tight">
              Meet the Masters Behind <br />
              <span className="text-primary">Our Signature Spaces</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 md:max-w-xs text-sm leading-relaxed border-l border-gray-200 pl-6"
          >
            A curated team of world-class decorators dedicated to transforming
            your vision into a living masterpiece.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
          {bestDecorators?.map((decorator, index) => (
            <DecoratorCard
              key={decorator.email}
              decorator={decorator}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className=" bg-linear-to-r from-transparent via-accent/40 to-transparent mt-20"
        />
      </div>
    </section>
  );
};

export default BestDecorators;
