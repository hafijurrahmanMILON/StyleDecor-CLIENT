import React from "react";
import { motion } from "framer-motion";
import storyIMG from "../assets/story.png";
import teamIMG from "../assets/team.png";
import processIMG from "../assets/process.png";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl text-secondary md:text-5xl font-bold text-gray-800 mb-6">
          About StyleDecor
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming spaces into beautiful memories since 2020
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                StyleDecor began with a simple vision: to make professional
                decoration services accessible and convenient for everyone. What
                started as a small local service has grown into a comprehensive
                platform connecting clients with expert decorators.
              </p>
              <p>
                We noticed that finding reliable decorators and managing
                appointments was often time-consuming and stressful. StyleDecor
                was created to solve this problem by providing a seamless,
                modern solution for booking decoration services.
              </p>
              <p>
                Today, we're proud to have transformed thousands of spaces and
                helped create memorable occasions for homes, offices, weddings,
                and ceremonies across the country.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-80 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <img src={storyIMG} alt="" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-80 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <img src={teamIMG} alt="" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gray-300 mr-3"></span>
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  To simplify the decoration process through technology while
                  maintaining the personal touch and creativity that makes each
                  space unique. We're committed to making beautiful design
                  accessible to everyone.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gray-300 mr-3"></span>
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  To become the leading platform for decoration services
                  worldwide, where anyone can find and book trusted decorators
                  with complete confidence and convenience.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Overview - Card Version */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-lg mb-2 block">
              OUR SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From intimate home celebrations to large corporate events, we
              provide comprehensive decoration solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Home Decoration",
                desc: "Birthday parties, anniversaries and baby showers with personalized themes",
                icon: "🏠",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                title: "Ceremony Setup",
                desc: "Weddings, engagements, naming ceremonies with traditional and modern decor elements",
                icon: "💝",
                color: "text-secondary",
                bg: "bg-secondary/10",
              },
              {
                title: "Office Design",
                desc: "Corporate events, product launches, conference setups with professional branding",
                icon: "🏢",
                color: "text-gray-800",
                bg: "bg-accent",
              },
              {
                title: "Event Styling",
                desc: "Graduation parties, festivals, cultural events with complete decoration packages",
                icon: "🎉",
                color: "text-primary",
                bg: "bg-primary/5",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
               
                <div
                  className={`${service.bg} ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>

               
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{service.desc}</p>

               
                <ul className="space-y-2 mb-6">
                  {service.title === "Home Decoration" &&
                    [
                      "Birthday Parties",
                      "Anniversary Decor",
                      "Baby Showers",
                      "Home Celebrations",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  {service.title === "Ceremony Setup" &&
                    [
                      "Wedding Decor",
                      "Engagement Setup",
                      "Naming Ceremony",
                      "Traditional Events",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  {service.title === "Office Design" &&
                    [
                      "Corporate Events",
                      "Product Launches",
                      "Conference Setup",
                      "Brand Activation",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  {service.title === "Event Styling" &&
                    [
                      "Graduation Parties",
                      "Festival Decor",
                      "Cultural Events",
                      "Special Occasions",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                </ul>

                <Link to="/services" className="w-full btn btn-pr bg-gray-50 hover:bg-primary hover:text-white text-gray-700 font-medium py-3 rounded-lg transition-all duration-300 group-hover:scale-105">
                  Explore Services
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Process
            </h2>
            <div className="space-y-6">
              {[
                "Consultation: Understand your vision and requirements",
                "Planning: Create custom decoration plans and mood boards",
                "Execution: Professional implementation by our decorators",
                "Review: Ensure satisfaction and make adjustments if needed",
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold text-gray-700">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-80 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <img src={processIMG} alt="" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
