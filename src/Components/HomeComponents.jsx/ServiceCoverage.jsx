import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import {
  HiOutlineOfficeBuilding,
  HiOutlineClock,
} from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";

// Custom Premium Marker Icon - Inline CSS used for guaranteed rendering
const customIcon = new L.DivIcon({
  className: "custom-marker",
  html: `
    <div style="position: relative;">
      <div style="width: 16px; height: 16px; background-color: #6366f1; border: 2px solid white; border-radius: 9999px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);"></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const ServiceCoverage = () => {
  const [serviceCenter, setServiceCenter] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const center = [23.685, 90.3563];
  const zoomLevel = 7;

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenter(data);
        setIsMapLoaded(true);
      })
      .catch(err => console.error("Error loading map data:", err));
  }, []);

  return (
    <div className="py-24  px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/5 rounded-full">
            Network Coverage
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-secondary mb-6 tracking-tight">
            Our <span className="font-semibold text-primary">Service Locations</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            We provide professional decoration services across {serviceCenter?.length || 0} districts with a dedicated network.
          </p>
        </div>

        <div className="relative group z-10">
          <div className="absolute -inset-4 bg-linear-to-tr from-primary/5 to-accent/5 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

          <div className="relative w-full h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white bg-white">
            {isMapLoaded && (
              <MapContainer
                center={center}
                zoom={zoomLevel}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                className="z-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {serviceCenter.map((loc, index) => (
                  <Marker
                    key={index}
                    position={[loc.latitude, loc.longitude]}
                    icon={customIcon}
                  >
                    <Popup closeButton={false}>
                      <div className="p-3 min-w-[200px] bg-white rounded-xl">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                          <HiOutlineMapPin className="text-primary" />
                          <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider">
                            {loc.district}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {loc.covered_area?.map((area, i) => (
                            <span key={i} className="text-[10px] bg-gray-50 px-2 py-0.5 rounded text-gray-500 border border-gray-100 italic">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-2 relative z-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white hover:border-primary/20 transition-all duration-500 group flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <HiOutlineOfficeBuilding size={32} />
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary tracking-tighter">{serviceCenter.length}</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Districts Covered</div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white hover:border-primary/20 transition-all duration-500 group flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <HiOutlineMapPin size={32} />
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary tracking-tighter">
                {serviceCenter.reduce((acc, curr) => acc + (curr.covered_area?.length || 0), 0) + "+"}
              </div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Operational Areas</div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white hover:border-primary/20 transition-all duration-500 group flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <HiOutlineClock size={32} />
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary tracking-tighter">24/7</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Premium Support</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default ServiceCoverage;