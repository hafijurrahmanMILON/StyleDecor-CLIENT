import React from "react";
import { motion } from "framer-motion";
import heroIMG from "../../assets/hero2.jpg";
import { Link } from "react-router";

const Hero = () => {
  const headingText = "Transform Your Space with StyleDecor";
  const headingChars = headingText.split("");

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 md:px-8 lg:px-16"
      style={{ background: "linear-gradient(180deg, #FFF 0%, #DDBEA9 100%)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center justify-between">
        {/* Left side  */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left flex-1"
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 ">
            {headingChars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: 0.4 + index * 0.03,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-700 mb-8"
          >
            Book professional decoration services for your home and ceremonies.
            Schedule in-studio consultations or on-site decoration with our
            expert decorators. Available 7 days a week.
          </motion.p>

          <Link to="/services" className="btn btn-secondary rounded-full">
            Book Your Decoration Now!
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-6 mt-12"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.4 + item * 0.1,
                  }}
                  className="w-12 h-12 rounded-full border-2 border-white"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1494790108755-2616b786d4d8?w=100&h=100&fit=crop)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
            <div>
              <p className="font-medium text-secondary">500+ Happy Clients</p>
              <p className="text-sm text-gray-600">
                Trusted by homeowners and event planners
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side  */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex-1"
        >
          <motion.div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full h-[500px] rounded-2xl overflow-hidden">
              <img src={heroIMG} className="w-full h-full object-cover" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>

            <motion.div
              initial={{
                scale: 0,
                rotate: -180,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
                y: [0, -5, 0],
              }}
              transition={{
                scale: {
                  duration: 0.6,
                  delay: 1.5,
                  type: "spring",
                  stiffness: 200,
                },
                rotate: {
                  duration: 0.6,
                  delay: 1.5,
                },
                opacity: {
                  duration: 0.4,
                  delay: 1.5,
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 2,
                },
              }}
              className="absolute top-2 right-2 z-20  text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2"
            >
              <span>Trending Now</span>
              <motion.span className="text-lg">🔥</motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              y: { duration: 3, repeat: Infinity, repeatType: "reverse" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            className="absolute top-10 -left-10 w-24 h-24 rounded-full border-4 border-primary/20"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-20 -left-6 bg-accent w-16 h-16 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
