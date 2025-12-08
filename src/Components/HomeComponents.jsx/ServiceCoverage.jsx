import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";



const ServiceCoverage = () => {
  const [serviceCenter, setServiceCenter] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const center = [23.685, 90.3563];
  const zoomLevel = 8; 

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenter(data);
        setIsMapLoaded(true);
      });
  }, []);

  return (
    <div className="py-16 px-4">
      <div className="w-full lg:w-8/12 mx-auto">
       
        <div className="text-center mb-12">
          <p className="text-primary text-lg font-semibold mb-2">
            Service Coverage
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Our Service Locations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide professional decoration services across{" "}
            {serviceCenter.length} districts with dedicated service centers
            throughout Bangladesh
          </p>
        </div>

        {/* Map Container */}
        <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          {isMapLoaded && (
            <MapContainer
              center={center}
              zoom={zoomLevel}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceCenter.map((center, index) => (
              <Marker 
                key={index} 
                position={[center.latitude, center.longitude]}
              >
                <Popup className="rounded-lg shadow-lg">
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-lg text-primary mb-2">
                      {center.district}
                    </h3>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        Covered Areas:
                      </p>
                      <ul className="list-disc pl-5">
                        {center.covered_area.map((area, i) => (
                          <li key={i} className="text-sm text-gray-700">{area}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-600">Active Service Center</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            </MapContainer>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {serviceCenter.length}
                </div>
                <div className="text-sm text-gray-600">Districts Covered</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {serviceCenter.reduce(
                    (acc, curr) => acc + curr.covered_area.length,
                    0
                  )}
                  +
                </div>
                <div className="text-sm text-gray-600">Areas Covered</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-gray-600">Service Available</div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default ServiceCoverage;
