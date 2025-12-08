import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import Loading from "../Components/Loading";

const createMarkerIcon = (isSelected = false) => {
  if (isSelected) {
    return new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  } else {
    return new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }
};

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const defaultCenter = [23.685, 90.3563];

  useEffect(() => {
    setIsLoading(true);

    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((item, i) => ({
          ...item,
          id: i + 1,
        }));

        setServiceCenters(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error loading data:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredCenters = serviceCenters.filter((center) => {
    const matchesRegion =
      selectedRegion === "All" || center.region === selectedRegion;
    const matchesSearch =
      searchTerm === "" ||
      center.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.covered_area.some((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesRegion && matchesSearch;
  });

  const regions = [
    "All",
    ...new Set(serviceCenters.map((center) => center.region)),
  ];

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);

    if (region !== "All") {
      const centersInRegion = serviceCenters.filter(
        (center) => center.region === region
      );
      if (centersInRegion.length > 0) {
        setSelectedCenter(centersInRegion[0]);
      }
    } else {
      setSelectedCenter(null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedRegion === region
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

         
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search district or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

       
          <div className="mt-4 text-gray-600">
            Showing {filteredCenters.length} of {serviceCenters.length} service
            centers
            {selectedRegion !== "All" && ` in ${selectedRegion} region`}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 h-full">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedRegion === "All"
                    ? "All Service Centers"
                    : `${selectedRegion} Service Centers`}
                </h2>
                <p className="text-gray-600">
                  Click on any location to view details
                </p>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {filteredCenters.map((center) => (
                  <div
                    key={center.id}
                    onClick={() => handleCenterSelect(center)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedCenter?.id === center.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {center.region}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Active
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-800">
                          {center.district}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {center.city}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {center.covered_area
                            .slice(0, 2)
                            .map((area, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {area}
                              </span>
                            ))}
                          {center.covered_area.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{center.covered_area.length - 2} more
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-gray-500">
                          {center.covered_area.length} areas covered
                        </div>
                      </div>

                      <div
                        className={`w-3 h-3 rounded-full ml-2 mt-1 ${
                          selectedCenter?.id === center.id
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

     
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden h-full">
              <div className="relative h-[700px]">
                <MapContainer
                  center={
                    selectedCenter
                      ? [selectedCenter.latitude, selectedCenter.longitude]
                      : defaultCenter
                  }
                  zoom={selectedCenter ? 10 : 8}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredCenters.map((center) => (
                    <Marker
                      key={center.id}
                      position={[center.latitude, center.longitude]}
                      icon={createMarkerIcon(selectedCenter?.id === center.id)}
                      eventHandlers={{
                        click: () => handleCenterSelect(center),
                      }}
                    >
                      <Popup className="rounded-lg">
                        <div className="p-4 min-w-[200px]">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-primary"
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
                              <h3 className="font-bold text-gray-800">
                                {center.district}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {center.region} • {center.city}
                              </p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-2">
                              Covered Areas:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {center.covered_area
                                .slice(0, 3)
                                .map((area, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                  >
                                    {area}
                                  </span>
                                ))}
                            </div>
                            {center.covered_area.length > 3 && (
                              <p className="text-xs text-gray-500 mt-1">
                                +{center.covered_area.length - 3} more areas
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => handleCenterSelect(center)}
                            className="w-full bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {selectedCenter && selectedRegion !== "All" && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-lg shadow p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-800">
                            {selectedCenter.district}
                          </h3>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Active
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {selectedCenter.region} • {selectedCenter.city}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedCenter.covered_area.length} areas covered
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedCenter(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {selectedCenter.covered_area
                        .slice(0, 4)
                        .map((area, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                          >
                            {area}
                          </span>
                        ))}
                      {selectedCenter.covered_area.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{selectedCenter.covered_area.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
