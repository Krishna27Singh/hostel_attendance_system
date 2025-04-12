import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);


const backendUrl= import.meta.env.VITE_BACKEND_URL;


const cities = [
  // Indian Cities
  { code: "DEL", name: "Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "BLR", name: "Bangalore" },
  { code: "MAA", name: "Chennai" },
  { code: "HYD", name: "Hyderabad" },
  { code: "CCU", name: "Kolkata" },
  { code: "AMD", name: "Ahmedabad" },
  { code: "PNQ", name: "Pune" },
  { code: "GOI", name: "Goa" },
  { code: "JAI", name: "Jaipur" },
  { code: "LKO", name: "Lucknow" },
  { code: "ATQ", name: "Amritsar" },
  { code: "VNS", name: "Varanasi" },
  { code: "IXC", name: "Chandigarh" },
  { code: "COK", name: "Kochi" },
  
  // International Cities
  { code: "NYC", name: "New York" },
  { code: "LON", name: "London" },
  { code: "PAR", name: "Paris" },
  { code: "BKK", name: "Bangkok" },
  { code: "TYO", name: "Tokyo" }, // Corrected from TOK to TYO
  { code: "SYD", name: "Sydney" },
  { code: "DXB", name: "Dubai" },
  { code: "SIN", name: "Singapore" },
  { code: "KUL", name: "Kuala Lumpur" },
  { code: "HKG", name: "Hong Kong" },
  { code: "ICN", name: "Seoul" },
  { code: "PEK", name: "Beijing" },
  { code: "SHA", name: "Shanghai" },
  { code: "ROM", name: "Rome" },
  { code: "MAD", name: "Madrid" },
  { code: "BER", name: "Berlin" },
  { code: "YTO", name: "Toronto" },
  { code: "LAX", name: "Los Angeles" },
  { code: "CHI", name: "Chicago" },
  { code: "RIO", name: "Rio de Janeiro" },
  { code: "CPT", name: "Cape Town" }
];



const HotelChart = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0].code);

  const fetchHotels = async (cityCode) => {
    setLoading(true);
    setError("");
    setHotels([]);
    
    try {
      const response = await axios.get(`${backendUrl}/api/hotels/${cityCode}`);
      
      // Debug: Log the raw response
      console.log("Raw API response:", response.data);
      
      // Transform data to ensure proper format
      let hotelData = [];
      
      // Check different response structures
      if (Array.isArray(response.data)) {
        hotelData = response.data;
      } else if (response.data?.data) { // If data is nested under 'data' property
        hotelData = Array.isArray(response.data.data) ? response.data.data : [];
      }

      console.log(typeof response.data)
      
      // Process hotels
      const processedHotels = hotelData
        .map(hotel => ({
          name: hotel.name || hotel.hotelName || "Unknown Hotel", // Check multiple possible name fields
          rating: Number(hotel.rating) || Number(hotel.hotelRating) || 0 // Check multiple rating fields
        }))
        .filter(hotel => hotel.name !== "Unknown Hotel") // Filter out invalid entries
        .slice(0, 10); // Limit to 10 hotels
      
      console.log("Processed hotels:", processedHotels);
      setHotels(processedHotels);
      
      if (processedHotels.length === 0) {
        setError("No valid hotel data found in response");
      }
    } catch (err) {
      console.error("Hotel Fetch Error:", err);
      setError(err.response?.data?.error || "Failed to fetch hotel data");
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(selectedCity);
  }, [selectedCity]);

  // Memoize chart data to prevent unnecessary re-renders
  const chartData = React.useMemo(() => {
    return {
      labels: hotels.map((hotel) => hotel.name),
      datasets: [
        {
          label: "Hotel Rating",
          data: hotels.map((hotel) => hotel.rating),
          backgroundColor: [
            "#88D8D8", "#5CCCCC", "#38B2AC", "#2C9C96", 
            "#20847F", "#166D69", "#0D5653", "#07403E", 
            "#03302E", "#012120"
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [hotels]);

  // Chart options with responsive settings
  const chartOptions = React.useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Top Hotels in ${cities.find(c => c.code === selectedCity)?.name || selectedCity}`,
        font: { size: 16 }
      },
      legend: { 
        position: 'bottom',
        labels: { 
          font: { size: 12 },
          boxWidth: 12,
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(1)}`;
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }), [selectedCity]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top 10 Hotels by Rating
      </h2>

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xs">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Select City:
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            {cities.map((city) => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full h-[400px] flex justify-center items-center">
        {loading ? (
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading hotel data...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={() => fetchHotels(selectedCity)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : hotels.length === 0 ? (
          <p className="text-gray-500">No hotels found for this city</p>
        ) : (
          <Doughnut 
            data={chartData}
            options={chartOptions}
            redraw // Force re-render when data changes
          />
        )}
      </div>
    </div>
  );
};

export default HotelChart;