import React from "react";

const Blogs = () => {
  const blogData = [
    {
      id: 1,
      category: "Interior Tips",
      date: "Oct 12, 2025",
      title: "Choosing the Right Color Palette",
      desc: "Discover how colors affect mood and how to create a balanced atmosphere in your home with our expert guide on color theory and interior psychology. We dive deep into seasonal trends and timeless classics.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 2,
      category: "Event Planning",
      date: "Nov 05, 2025",
      title: "Wedding Decor Themes",
      desc: "From rustic charm to royal elegance, explore the themes that are making waves this year. Learn how to balance traditional elements with modern aesthetics for a truly unique celebration experience.",
      image: "https://images.unsplash.com/photo-1519225495842-7b3d1441da08?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 3,
      category: "Workspace",
      date: "Dec 01, 2025",
      title: "Minimalist Office Ideas",
      desc: "Simple changes in your office decor can significantly boost focus and creativity. We explore how minimalist layouts reduce cognitive load and help you maintain a high level of productivity throughout the day.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 4,
      category: "Living Space",
      date: "Jan 10, 2026",
      title: "Small Apartment Magic",
      desc: "Don't let limited square footage stop you from living large. Our team shares professional secrets on using mirrors, multifunctional furniture, and lighting to make any small room feel like a grand suite.",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 5,
      category: "Lighting",
      date: "Feb 15, 2026",
      title: "The Power of Ambiance",
      desc: "Lighting is the most underrated element of decor. Learn the difference between task, ambient, and accent lighting and how to layer them to create a warm, inviting atmosphere in your sanctuary.",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 6,
      category: "Modern Art",
      date: "Mar 20, 2026",
      title: "Art in Modern Interiors",
      desc: "Incorporating art into your home doesn't have to be intimidating. We guide you through selecting pieces that resonate with your personality while complementing your existing furniture and architectural style.",
      image: "https://images.unsplash.com/photo-1513519247388-19345ed5d467?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-left mb-20">
          <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">
            Insights & Trends
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 mt-4 leading-tight tracking-tighter">
            Latest from <br />
            <span className="text-primary font-light italic">Our Journal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {blogData.map((blog) => (
            <div key={blog.id} className="group">
              <div className="aspect-video overflow-hidden rounded-4xl bg-gray-100 mb-6 shadow-sm">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-primary font-black text-[10px] uppercase tracking-widest">
                  {blog.category}
                </span>
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tighter">
                  {blog.date}
                </span>
              </div>

              <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tighter mb-4">
                {blog.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {blog.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;