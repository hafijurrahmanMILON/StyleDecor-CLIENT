import React from "react";
import teamIMG from "../assets/team.png";
import processIMG from "../assets/process.png";
import { Link } from "react-router";
import { HiOutlineLightBulb, HiOutlineGlobeAlt, HiCheckCircle } from "react-icons/hi";

const About = () => {
  return (
    <div className="min-h-screen py-24 px-4 md:px-8 lg:px-16 bg-[#FDFDFF] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-5xl mx-auto text-center mb-28">
        <span className="inline-block px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.3em] uppercase text-primary bg-primary/5 rounded-full">
          Est. 2020
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-secondary mb-8 leading-tight tracking-tight">
          Crafting <span className="text-primary italic">Luxe</span> Spaces
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          StyleDecor merges architectural precision with creative soul to transform 
          ordinary spaces into legendary experiences.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="order-2 lg:order-1">
            <div className="relative inline-block mb-6">
                <h2 className="text-4xl font-bold text-secondary">Our Story</h2>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
              <p>
                StyleDecor began with a bold vision: to redefine professional
                decoration by making it accessible without compromising on 
                the exclusive aesthetics.
              </p>
              <p>
                We bridge the gap between imagination and reality. Our journey 
                from a boutique studio to a nationwide platform is fueled by 
                one goal: seamless elegance for everyone.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-secondary/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-700"></div>
              <div className="relative rounded-4xl overflow-hidden border border-white shadow-2xl bg-white p-2">
                <div className="w-full h-[450px] overflow-hidden rounded-[1.8rem]">
                  <img src={teamIMG} alt="Story" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-40">
           <div className="bg-secondary p-12 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
            <HiOutlineLightBulb className="text-8xl absolute -right-4 -bottom-4 text-white/5" />
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              Our Mission
            </h3>
            <p className="text-white/70 font-light text-lg leading-relaxed">
              To simplify the complex world of design through cutting-edge technology 
              while preserving the artisanal spirit that makes every project unique. 
              Luxury shouldn't be hard to reach.
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-12 rounded-[3rem] text-secondary relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <HiOutlineGlobeAlt className="text-8xl absolute -right-4 -bottom-4 text-secondary/5" />
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              Our Vision
            </h3>
            <p className="text-gray-500 font-light text-lg leading-relaxed">
              To lead the global digital transformation of spatial design, 
              creating a world where anyone can curate their dream environment 
              with absolute precision and trust.
            </p>
          </div>
        </div>

        <div className="mb-40">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-black tracking-[0.4em] text-primary uppercase mb-4">Elite Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary">Service Categories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Home Decoration", icon: "🏠", bg: "bg-blue-50/50", border: "border-blue-100", items: ["Birthday Parties", "Anniversary Decor", "Baby Showers"] },
              { title: "Ceremony Setup", icon: "💝", bg: "bg-rose-50/50", border: "border-rose-100", items: ["Wedding Decor", "Engagement Setup", "Naming Ceremony"] },
              { title: "Office Design", icon: "🏢", bg: "bg-emerald-50/50", border: "border-emerald-100", items: ["Corporate Events", "Product Launches", "Conference Setup"] },
              { title: "Event Styling", icon: "🎉", bg: "bg-purple-50/50", border: "border-purple-100", items: ["Graduation Parties", "Festival Decor", "Cultural Events"] },
            ].map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-[2.5rem] border ${service.border} ${service.bg} backdrop-blur-sm`}
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h4 className="text-xl font-bold text-secondary mb-4">{service.title}</h4>
                <ul className="space-y-3 mb-8">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500 font-light">
                      <HiCheckCircle className="text-primary/60 text-lg" /> {item}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="inline-block text-[10px] font-bold tracking-widest uppercase border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                  View Collection
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-white rounded-[4rem] p-12 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-4xl font-bold text-secondary mb-10">The Design Journey</h2>
                <div className="space-y-10">
                  {[
                    "Consultation: Immersive session to capture your DNA",
                    "Planning: Strategic mapping & mood board creation",
                    "Execution: Precision implementation by master decorators",
                    "Review: Final walkthrough & perfection check",
                  ].map((step, index) => (
                    <div key={index} className="flex gap-6 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-secondary/20 shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-600 font-light text-lg">{step}</p>
                    </div>
                  ))}
                </div>
             </div>

             <div className="relative">
                <img src={processIMG} alt="Process" className="rounded-[3rem] shadow-2xl" />
                <div className="absolute -bottom-6 -left-6 bg-primary p-8 rounded-3xl shadow-xl hidden md:block">
                    <p className="text-white text-2xl font-black">100%</p>
                    <p className="text-white/80 text-[10px] uppercase font-bold tracking-widest">Satisfaction rate</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;