// components/LeafletMap.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletMap = ({ city }) => {
  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([48.2082, 16.3738], 13); // Default to Vienna coordinates

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    
    const cityCoordinates = {
      'Delhi': [28.6139, 77.2090],
      'Bangkok': [13.7563, 100.5018],
      'London': [51.5072, -0.1276],
      'Singapore': [1.3521, 103.8198],
      'Paris': [48.8566, 2.3522],
      'Dubai': [25.2048, 55.2708],
      'Kuala Lumpur': [3.1390, 101.6869],
      'Istanbul': [41.0082, 28.9784],
      'Antalya': [36.8969, 30.7133],
      'Shenzhen': [22.5431, 114.0579],
      'Mumbai': [19.0760, 72.8777],
      'Palma de Mallorca': [39.5696, 2.6502],
      'Rome': [41.9028, 12.4964],
      'Tokyo': [35.6762, 139.6503],
      'Pattaya': [12.9236, 100.8825],
      'Taipei': [25.0330, 121.5654],
      'Guangzhou': [23.1291, 113.2644],
      'Prague': [50.0755, 14.4378],
      'Seoul': [37.5665, 126.9780],
      'Amsterdam': [52.3676, 4.9041],
      'Osaka': [34.6937, 135.5023],
      'Shanghai': [31.2304, 121.4737],
      'Ho Chi Minh City': [10.8231, 106.6297],
      'Barcelona': [41.3851, 2.1734],
      'Milan': [45.4642, 9.1900],
      'Chennai': [13.0827, 80.2707],
      'Vienna': [48.2082, 16.3738],
      'Johor Bahru': [1.4854, 103.7618],
      'Jaipur': [26.9124, 75.7873],
      'Berlin': [52.5200, 13.4050],
      'Athens': [37.9838, 23.7275],
      'Madrid': [40.4168, -3.7038],
      'Riyadh': [24.7136, 46.6753],
      'Florence': [43.7696, 11.2558],
      'Jerusalem': [31.7683, 35.2137],
      'Hanoi': [21.0278, 105.8342],
      'Kolkata': [22.5726, 88.3639],
      'Bangalore': [12.9716, 77.5946],
      'Pune': [18.5204, 73.8567]
    };
    if (cityCoordinates[city]) {
      map.setView(cityCoordinates[city], 13);
      
      // Add a marker for the city center
      L.marker(cityCoordinates[city]).addTo(map)
        .bindPopup(`<b>${city}</b><br>City center`)
        .openPopup();
    }

    return () => {
      map.remove();
    };
  }, [city]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default LeafletMap;