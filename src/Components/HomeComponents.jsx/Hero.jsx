import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import  main from '../../assets/main.png'
import topRight from '../../assets/top-right.png'
import leftBottom from '../../assets/left-bottom.png'

const Hero = () => {
  const headingText = "Elevate Your Living With Signature Decor";
  
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden  flex items-center pt-6 md:pt-0">
      <div className="absolute hidden md:block top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/*  left  */}
        <div className="z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
              Premium Interior Solutions
            </span>
            
            <motion.h1 
              variants={sentence}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-[#2D2D2D] mb-8"
            >
              {headingText.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed"
            >
              Crafting bespoke atmospheres that reflect your personality. 
              From intimate studio sessions to grand venue transformations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/services" className="group relative px-8 py-4 bg-primary text-white overflow-hidden rounded-full transition-all hover:pr-12">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all">
                View Portfolio
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" />
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium italic">
                “Exceeded all our expectations” — <span className="text-primary">1.2k+ Reviews</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* right */}
        <div className="relative order-1 lg:order-2 h-[500px] md:h-[600px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10 rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          >
            <img 
              src={main} 
              className="w-full h-full object-cover" 
              alt="Main Decor" 
            />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute -top-6 -right-6 z-20 w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden border-8 border-white shadow-xl"
          >
            <img 
              src={topRight} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
              alt="Detail 1"
            />
          </motion.div>

          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute -bottom-8 -left-8 z-20 w-28 h-28 md:w-40 md:h-40 rounded-3xl overflow-hidden border-8 border-white shadow-xl"
          >
            <img 
              src={leftBottom}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
              alt="Detail 2"
            />
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: 360 
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -right-10 w-24 h-24 border-16 border-accent/20 rounded-full z-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;