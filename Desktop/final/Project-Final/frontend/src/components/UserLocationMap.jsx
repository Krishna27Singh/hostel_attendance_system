import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const UserLocationMap = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("Loading location...");


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
  
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}`
          );
          const data = await res.json();
          setAddress(data.display_name);
        } catch (err) {
          console.error("Error getting location name:", err);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);
  

  if (!position) return <p>Getting your location...</p>;

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
            <Popup>
            📍 You are here! <br />
            {address}
            </Popup>

      </Marker>
    </MapContainer>
  );
};

export default UserLocationMap;
