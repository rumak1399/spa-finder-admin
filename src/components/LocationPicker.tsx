"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { LatLngLiteral, LeafletMouseEvent } from "leaflet";

interface LocationPickerProps {
  onChange: (position: LatLngLiteral) => void;
  defaultValue?: LatLngLiteral;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onChange, defaultValue }) => {
  const [position, setPosition] = useState<LatLngLiteral>(
    defaultValue || {
      lat: 23.8103,
      lng: 90.4125,
    }
  );

  const [locationName, setLocationName] = useState<string>("");

  // Reverse geocode (coordinates ➜ location text)
  const reverseGeocode = async (lat: number, lng: number) => {
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
      setLocationName(data.display_name || "Unknown location");
    } catch (err) {
      console.error("Failed to fetch location:", err);
      setLocationName("Failed to fetch location");
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click(e: LeafletMouseEvent) {
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
            iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
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
