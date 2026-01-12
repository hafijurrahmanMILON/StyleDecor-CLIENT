import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Owner",
      image: "https://i.pravatar.cc/150?u=12",
      text: "The way they transformed my living room was beyond words. Their eye for detail and color balance is truly exceptional. I feel like I'm living in a luxury hotel every day!",
    },
    {
      id: 2,
      name: "David Miller",
      role: "Event Manager",
      image: "https://i.pravatar.cc/150?u=15",
      text: "Working with this team for our corporate seminar was a breeze. They understood our brand aesthetic perfectly and delivered a setup that impressed all our international delegates.",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Bride",
      image: "https://i.pravatar.cc/150?u=20",
      text: "They made my wedding decor look like a fairytale. Every guest was asking about the decorators. Thank you for making my special day so visually stunning and memorable!",
    }
  ];

  return (
    <section className="px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-black uppercase tracking-[0.3em] text-[10px]"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif font-medium text-gray-900 mt-4 leading-tight tracking-tighter"
            >
              What our clients <br /> 
              <span className="font-light italic text-primary">say about us.</span>
            </motion.h2>
          </div>
          <div className="hidden md:block w-24 h-px bg-gray-200 mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 relative group"
            >
              <div className="absolute top-8 right-10 text-gray-50 group-hover:text-primary/10 transition-colors duration-500">
                <FaQuoteLeft size={40} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400 text-xs" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed mb-8 font-medium italic">
                "{item.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 border-t border-gray-50 pt-8">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div>
                  <h4 className="text-lg font-black text-gray-900 tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {item.role}
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

export default Testimonials;