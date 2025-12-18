import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const Contact = () => {
  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16  relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
            <HiOutlineSparkles /> Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-secondary tracking-tight">
            Contact <span className="text-primary italic">StyleDecor</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Have a vision for your next space? Our decoration experts are ready
            to turn your dreams into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          {/* --- Left Column: Contact Info --- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 p-10 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-16 -mt-16 transition-all group-hover:scale-150 duration-700"></div>

              <h2 className="text-2xl font-bold text-secondary mb-16 relative">
                Contact Details
              </h2>

              <div className="space-y-12 relative">
                {[
                  {
                    icon: <FaMapMarkerAlt />,
                    title: "Our Studio",
                    desc: [
                      "123 Decoration Avenue, Design District",
                      "Dhaka 1212, Bangladesh",
                    ],
                  },
                  {
                    icon: <FaPhone />,
                    title: "Phone Number",
                    desc: ["+880 1234 567890", "+880 9876 543210"],
                  },
                  {
                    icon: <FaEnvelope />,
                    title: "Email Address",
                    desc: ["info@styledecor.com", "support@styledecor.com"],
                  },
                  {
                    icon: <FaClock />,
                    title: "Working Hours",
                    desc: [
                      "Sat - Thu: 9:00 AM - 8:00 PM",
                      "Friday: 2:00 PM - 8:00 PM",
                    ],
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 group/item"
                  >
                    <div className="w-12 h-12 bg-white shadow-lg shadow-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary text-sm uppercase tracking-widest mb-1">
                        {item.title}
                      </h3>
                      {item.desc.map((line, i) => (
                        <p
                          key={i}
                          className="text-gray-500 font-light text-[15px]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Right Column: Contact Form --- */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.06)] p-10 md:p-14 border border-gray-50 relative h-full">
              <h2 className="text-3xl font-bold text-secondary mb-8">
                Send Us a Message
              </h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Service Type
                  </label>
                  <select className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-secondary appearance-none">
                    <option value="">Select service</option>
                    <option value="home">Home Decoration</option>
                    <option value="wedding">Wedding Decoration</option>
                    <option value="office">Office Design</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-secondary"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Your Vision
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your requirements..."
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-secondary"
                  />
                </div>

                <button className="md:col-span-2 group bg-primary hover:bg-secondary text-white font-bold py-5 rounded-2xl transition-all duration-500 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;