import React from "react";
import { motion } from "framer-motion";

const Statistics = () => {
  const stats = [
    { label: "Projects Completed", value: "850+", sub: "Success Stories", delay: 0 },
    { label: "Happy Clients", value: "1.2k", sub: "Global Trust", delay: 0.1 },
    { label: "Years Experience", value: "12+", sub: "Pure Expertise", delay: 0.2 },
    { label: "Design Awards", value: "25+", sub: "Excellence Won", delay: 0.3 },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-primary/40 blur-[120px] -z-20" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: item.delay, 
                duration: 0.5,
                type: "spring",
                stiffness: 100 
              }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
                      {item.value}
                    </h3>
                    <p className="text-accent font-black uppercase tracking-[0.2em] text-[10px] mb-2">
                      {item.label}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-gray-500 text-[11px] italic font-medium">
                      {item.sub}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;