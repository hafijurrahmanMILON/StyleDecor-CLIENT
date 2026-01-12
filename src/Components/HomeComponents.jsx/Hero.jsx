import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import main from "../../assets/main.png";
import topRight from "../../assets/top-right.png";
import leftBottom from "../../assets/left-bottom.png";

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
    <section className="relative min-h-screen lg:h-[80vh] lg:min-h-[650px] overflow-hidden flex items-center pt-6 md:pt-0 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* left */}
        <div className="z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
              Premium Interior Solutions
            </span>

            <motion.h1
              variants={sentence}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-[#2D2D2D] mb-6"
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
              className="text-base text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              Crafting bespoke atmospheres that reflect your personality. From
              intimate studio sessions to grand venue transformations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/services"
                className="group relative px-7 py-3.5 bg-primary text-white overflow-hidden rounded-full transition-all hover:pr-10"
              >
                <span className="relative z-10 flex items-center gap-2 text-sm font-bold">
                  Explore Services{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button className="px-7 py-3.5 border-2 border-accent text-accent text-sm font-bold rounded-full hover:bg-accent hover:text-white transition-all">
                View Portfolio
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="user"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 font-medium italic">
                “Exceeded all our expectations” —{" "}
                <span className="text-primary font-bold">1.2k+ Reviews</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* right */}
        <div className="relative order-1 lg:order-2 h-[400px] md:h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10 rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
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
            className="absolute -top-4 -right-4 z-20 w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-lg"
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
            className="absolute -bottom-6 -left-6 z-20 w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-lg"
          >
            <img
              src={leftBottom}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              alt="Detail 2"
            />
          </motion.div>
        </div>
      </div>

      {/* --- Scroll Indicator Update --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-1 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 cursor-pointer group p-2 rounded-full md:bg-transparent"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight * 0.7, behavior: "smooth" })
        }
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-primary transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiChevronDown className="text-primary text-2xl drop-shadow-md" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
