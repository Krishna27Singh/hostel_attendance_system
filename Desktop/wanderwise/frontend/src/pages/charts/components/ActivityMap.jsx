import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

// ✅ Heatmap Layer Component
const HeatmapLayer = ({ activities }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);

  useEffect(() => {
    if (!map || activities.length === 0) return;

    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }

    const heatData = activities
      .filter((a) => a.geoCode?.latitude && a.geoCode?.longitude)
      .map((activity) => [
        activity.geoCode.latitude,
        activity.geoCode.longitude,
        2,
      ]);

    heatLayerRef.current = L.heatLayer(heatData, {
      radius: 35,
      blur: 20,
      maxZoom: 12,
      gradient: {
        0.2: "blue",
        0.4: "cyan",
        0.6: "lime",
        0.8: "yellow",
        1.0: "red",
      },
    }).addTo(map);
  }, [activities, map]);

  return null;
};

// ✅ Marker Layer Component
const ActivityMarkers = ({ activities }) => {
  return (
    <>
      {activities
        .filter((a) => a.geoCode?.latitude && a.geoCode?.longitude)
        .map((activity, index) => (
          <Marker
            key={index}
            position={[activity.geoCode.latitude, activity.geoCode.longitude]}
          >
            <Popup>
              <strong>{activity.name}</strong>
              <br />
              {activity.address?.city || "Unknown city"}
            </Popup>
          </Marker>
        ))}
    </>
  );
};

const ActivityMap = ({ activities }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activities.length === 0) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activities]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
        overflow: "auto",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "500px",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1000,
            }}
          >
            <div className="spinner" />
          </div>
        )}

        <MapContainer
          center={[20, 77]}
          zoom={5}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <HeatmapLayer activities={activities} />
            <ActivityMarkers activities={activities} />
            <ZoomControl position="bottomright" />
          </>
        </MapContainer>
      </div>
    </div>
  );
};

export default ActivityMap;
