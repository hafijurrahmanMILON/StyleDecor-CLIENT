import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "../Components/Loading";
import { HiSearch, HiOutlineMap, HiOutlineCursorClick } from "react-icons/hi"; // Premium Icons

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const mapRef = useRef(null);

  const defaultCenter = [23.685, 90.3563];
  const defaultZoom = 8;

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);
      })
      .catch(err => console.error("Error loading JSON:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district && mapRef.current) {
      const coordinate = [district.latitude, district.longitude];
      mapRef.current.flyTo(coordinate, 10);
    }
  };

  if (serviceCenters.length === 0) {
    return <Loading />;
  }

  return (
    <div className=" min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 rounded-full">
              NationWide Presence
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-secondary mb-6 leading-tight">
              We are available in <br />
              <span className="font-bold text-primary italic">{serviceCenters.length} Districts</span>
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              Explore our strategic service centers across Bangladesh, designed to provide 
              premium decoration solutions right at your doorstep.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-white rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 pl-6">
                <HiSearch className="text-gray-400 text-xl shrink-0" />
                <input
                  type="text"
                  name="location"
                  placeholder="Search district or city..."
                  className="grow outline-none text-sm text-secondary px-3 bg-transparent"
                />
                <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-primary/20">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>


        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] blur-sm opacity-50"></div>
          
          <div className="relative w-full h-[650px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              scrollWheelZoom={false}
              className="h-full w-full z-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Premium light-theme map
              />

              {serviceCenters.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup closeButton={false} className="premium-popup">
                    <div className="p-4 min-w-60 bg-white">
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">Active Hub</span>
                        <h3 className="font-bold text-secondary text-xl mt-2">
                          {center.district}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">{center.city}</p>
                      </div>

                      <div className="mb-6">
                        <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">Service Areas</p>
                        <div className="flex flex-wrap gap-1.5">
                          {center.covered_area.slice(0, 4).map((area, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] rounded-md border border-gray-100 italic">
                              {area}
                            </span>
                          ))}
                          {center.covered_area.length > 4 && (
                            <span className="px-2 py-1 text-gray-400 text-[10px]">
                              +{center.covered_area.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (mapRef.current) {
                            mapRef.current.flyTo([center.latitude, center.longitude], 14);
                          }
                        }}
                        className="w-full bg-secondary hover:bg-primary text-white text-xs font-bold py-3 rounded-xl transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                      >
                        Explore Center Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 20px !important;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Coverage;