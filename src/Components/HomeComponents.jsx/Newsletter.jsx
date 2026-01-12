import React from "react";
import { FiSend } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className=" px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-white border border-gray-100 rounded-[3rem] px-8 py-16 md:p-20 shadow-xl shadow-gray-200/50">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">
                Stay in the loop
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mt-4 leading-tight tracking-tighter">
                Subscribe for <br />
                <span className="text-primary font-light italic text-3xl md:text-5xl">
                  Design Inspiration
                </span>
              </h2>
              <p className="text-gray-500 mt-6 max-w-md text-sm leading-relaxed font-medium">
                Join our exclusive community. Get weekly updates on interior
                trends, event decor tips, and behind-the-scenes insights
                delivered directly to your inbox.
              </p>
            </div>

            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative grow">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-8 py-5 rounded-full bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <button className="px-10 py-5 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-gray-900 transition-all shadow-lg shadow-primary/20 active:scale-95">
                  Join Now <FiSend className="text-sm" />
                </button>
              </div>
              <p className="mt-4 text-[10px] text-gray-400 text-center sm:text-left ml-4">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
