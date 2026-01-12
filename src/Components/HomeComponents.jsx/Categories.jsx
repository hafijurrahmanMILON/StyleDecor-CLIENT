import React from "react";
import { motion } from "framer-motion";
import { 
  FaHome, FaRing, FaBriefcase, FaMicrophone, FaUsers, FaAward 
} from "react-icons/fa";

const Categories = () => {
  const categories = [
    { name: "Home", icon: <FaHome />, count: "120+ Options", bg: "bg-orange-50", text: "text-orange-600", border: "hover:border-orange-200" },
    { name: "Wedding", icon: <FaRing />, count: "80+ Themes", bg: "bg-rose-50", text: "text-rose-600", border: "hover:border-rose-200" },
    { name: "Office", icon: <FaBriefcase />, count: "45+ Styles", bg: "bg-blue-50", text: "text-blue-600", border: "hover:border-blue-200" },
    { name: "Seminar", icon: <FaMicrophone />, count: "30+ Setups", bg: "bg-emerald-50", text: "text-emerald-600", border: "hover:border-emerald-200" },
    { name: "Meeting", icon: <FaUsers />, count: "50+ Concepts", bg: "bg-amber-50", text: "text-amber-600", border: "hover:border-amber-200" },
    { name: "Ceremony", icon: <FaAward />, count: "65+ Events", bg: "bg-purple-50", text: "text-purple-600", border: "hover:border-purple-200" },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-4 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100"
          >
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Discover Our World</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 tracking-tighter leading-tight">
            Design for Every <br />
            <span className="text-primary bg-clip-text  italic px-2">
              Atmosphere
            </span>
          </h2>
          <div className="h-1.5 w-12 bg-accent rounded-full mt-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group flex items-center gap-6 p-7 rounded-4xl border border-transparent bg-gray-50/50 ${cat.border} hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-default`}
            >
              <div className={`w-20 h-20 shrink-0 rounded-2xl ${cat.bg} ${cat.text} flex items-center justify-center text-3xl shadow-inner transition-all duration-500 group-hover:rotate-10 group-hover:scale-110`}>
                {cat.icon}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-50" />
                   <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 group-hover:text-gray-600 transition-colors">
                    {cat.count}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;