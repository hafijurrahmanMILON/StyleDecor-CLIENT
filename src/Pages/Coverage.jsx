import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "../Components/Loading";

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
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase())
    );
    // console.log(district)

    if (district) {
      const coordinate = [district.latitude, district.longitude];
      // console.log('heelo', coordinate)
      mapRef.current.flyTo(coordinate, 10);
    }
  };

  return (
    <div className="bg-white rounded-3xl mt-8 mb-12 py-12 px-6 md:px-20">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-secondary mb-4">
          We are available in {serviceCenters.length} districts
        </h1>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex items-center gap-2 rounded-full shadow-md px-4 py-3 w-full max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="gray"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            <input
              type="text"
              name="location"
              placeholder="Search district or city..."
              className="grow outline-none text-sm bg-transparent"
            />
            <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-full">
              Search
            </button>
          </div>
        </form>

        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-secondary mb-1">
            Nationwide Coverage
          </h3>
          <p className="text-gray-600">
            Find our service centers across Bangladesh
          </p>
        </div>
      </div>

      <hr className="border-gray-200 mb-12" />

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
          We are available almost all over Bangladesh
        </h2>

        <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            scrollWheelZoom={false}
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup className="rounded-xl">
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-800">
                        {center.district}
                      </h3>
                      <p className="text-sm text-gray-600">{center.city}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Covered Areas:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {center.covered_area.slice(0, 4).map((area, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                          >
                            {area}
                          </span>
                        ))}
                        {center.covered_area.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">
                            +{center.covered_area.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (mapRef.current) {
                          mapRef.current.flyTo(
                            [center.latitude, center.longitude],
                            14
                          );
                        }
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg text-sm font-medium"
                    >
                      Focus on this location
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
