import React from 'react';

const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm h-full">
      
      <div className="skeleton h-64 w-full" />

      <div className="px-4 py-2 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />

        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="skeleton h-3 w-24 mb-1" />
            <div className="skeleton h-6 w-20" />
          </div>
          <div className="skeleton h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};


export default ServiceCardSkeleton;
