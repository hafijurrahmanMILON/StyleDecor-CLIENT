import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        
        <div className="absolute w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        <div className="absolute w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-2xl tracking-[0.3em] font-light text-primary uppercase">
          Style<span className="text-accent font-bold">Decor</span>
        </h2>
        <div className="mt-4 w-32 h-0.5 bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent to-transparent animate-shimmer shadow-[0_0_8px_#C5A059]"></div>
        </div>
        <p className="mt-2 text-xs text-gray-400 font-medium tracking-widest uppercase opacity-70">
          Transforming Spaces...
        </p>
      </div>
    </div>
  );
};

export default Loading;