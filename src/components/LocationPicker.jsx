"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const LocationPicker = ({ onChange, defaultValue }) => {
  const [position, setPosition] = useState(
    defaultValue || {
      lat: 23.8103,
      lng: 90.4125,
    }
  );

  const [locationName, setLocationName] = useState("");
  //   const [inputAddress, setInputAddress] = useState("");

  // Reverse geocode (coordinates ➜ location text)
  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "User-Agent": "spafinder.vercel.app/1.0 (rumak1399@gmail.com)",
          },
        }
      );
      const data = await res.json();
      setLocationName(data.display_name);
    } catch (err) {
      console.error("Failed to fetch location:", err);
    }
  };

  // Forward geocode (location text ➜ coordinates)
  //   const forwardGeocode = async (address) => {
  //     try {
  //       const response = await fetch(
  //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  //       );
  //       const data = await response.json();
  //       console.log(data);

  //       if (data.length > 0) {
  //         const { lat, lon } = data[0];
  //         const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
  //         setPosition(newPos);
  //         onChange(newPos);
  //       } else {
  //         alert("Location not found.");
  //       }
  //     } catch (error) {
  //       console.error("Forward geocoding failed:", error);
  //     }
  //   };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onChange(e.latlng);
      },
    });
    return null;
  };

  useEffect(() => {
    reverseGeocode(position.lat, position.lng);
  }, [position]);

  return (
    <div className="space-y-4">
      {/* <input
        type="text"
        placeholder="Enter address"
        className="w-full p-2 border rounded"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <button
        onClick={() => forwardGeocode(inputAddress)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search Address
      </button> */}

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />
        <MapEvents />
      </MapContainer>

      <div className="mt-2 text-sm text-gray-700">
        <strong>Location:</strong> {locationName}
      </div>
    </div>
  );
};

export default LocationPicker;
