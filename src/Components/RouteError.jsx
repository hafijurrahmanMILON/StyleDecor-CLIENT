import React from "react";
import { Link } from "react-router";

const RouteError = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md text-center">
        {/* 404 with Emoji Graphic */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center justify-center">
            {/* First "4" */}
            <div className="text-9xl font-bold text-primary opacity-20 mr-2">
              4
            </div>

            {/* Emoji as the "0" */}
            <div className="text-9xl font-bold text-primary flex items-center justify-center">
              <svg
                className="w-24 h-24 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Second "4" */}
            <div className="text-9xl font-bold text-primary opacity-20 ml-2">
              4
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Please
          check the URL or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-primary hover:bg-secondary text-white font-medium rounded-lg transition-colors duration-300 text-center"
          >
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-lg transition-colors duration-300 text-center"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteError;
