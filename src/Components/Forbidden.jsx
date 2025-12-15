import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

 
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Access Forbidden
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact the
          administrator if you believe this is an error.
        </p>

   
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            to="/dashboard/my-bookings"
            className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;