import React, { useState, useEffect } from "react";
import { Pie, Bar, Doughnut, Radar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import ActivityMap from "./components/ActivityMap"; // ✅ Map Component Import
ChartJS.register(...registerables);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const predefinedCategories = {
  museum: "Culture",
  art: "Culture",
  gallery: "Culture",
  concert: "Entertainment",
  music: "Entertainment",
  theater: "Entertainment",
  hike: "Adventure",
  trail: "Adventure",
  park: "Nature",
  zoo: "Nature",
  aquarium: "Nature",
  food: "Food & Drink",
  restaurant: "Food & Drink",
  cafe: "Food & Drink",
  bar: "Nightlife",
  club: "Nightlife",
  beach: "Leisure",
  shopping: "Shopping",
  mall: "Shopping",
  historical: "Culture",
  monument: "Culture",
  sightseeing: "Leisure",
  spa: "Relaxation",
  temple: "Culture",
  church: "Culture",
  mosque: "Culture",
};

const validCities = [
  "Bangalore", "Barcelona", "Berlin", "Dallas", "London", "New York", "Paris",
  "San Francisco", "Dubai", "Rome", "Singapore", "Bali", "Venice", "Sydney",
  "Tokyo", "Abu Dhabi", "Lyon", "Nice", "Los Angeles", "Edinburgh", "Las Vegas",
  "Miami", "Florence", "Milan"
];

const chartTypes = {
  Pie: Pie,
  Doughnut: Doughnut,
  Bar: Bar,
  Radar: Radar,
};

const MapActivities = () => {
  const [selectedCity, setSelectedCity] = useState("Paris"); // Default city
  const [selectedChart, setSelectedChart] = useState("Pie"); // Default Pie Chart
  const [categories, setCategories] = useState({});
  const [activities, setActivities] = useState([]); // ✅ Map ke liye activities state
  const [loadingChart, setLoadingChart] = useState(false);

  const fetchLocation = async () => {
    if (!selectedCity) return;
    try {
      const response = await fetch(`${BACKEND_URL}/api/location?city=${selectedCity}`);
      const data = await response.json();
      if (data.lat && data.lon) {
        fetchActivities(data.lat, data.lon);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchActivities = async (lat, lon) => {
    setLoadingChart(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/activities/activities?lat=${lat}&lon=${lon}&city=${selectedCity}`);
      const data = await response.json();
      console.log("📌 Amadeus API Full Response:", data);
  
      if (data && typeof data === "object" && !Array.isArray(data)) {
        setCategories(data);
        setActivities([]); // ✅ Keep activities as empty array for now
      }
       else if (Array.isArray(data)) {
        // Raw activity array — categorize manually
        categorizeActivities(data);
        setActivities(data); // For map rendering
      } else {
        setCategories({});
        setActivities([]);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoadingChart(false);
    }
  };
  
  console.log("activities:",activities)
  const categorizeActivities = (activities) => {
    console.log("activities:",activities)
    let categoryCount = {};
    activities.forEach((activity) => {
      let category = categorizeActivity(activity);
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    setCategories(categoryCount);
  };

  const categorizeActivity = (activity) => {
    console.log("activity", activity)
    const title = activity.name?.toLowerCase() || "";
    const description = activity.description?.toLowerCase() || "";
    for (let keyword in predefinedCategories) {
      if (title.includes(keyword) || description.includes(keyword)) {
        return predefinedCategories[keyword];
      }
    }
    return "Others";
  };

  useEffect(() => {
    fetchLocation();
  }, [selectedCity]);

  console.log("categories: ",categories)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-50 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">📍😄 Explore Activity Categories in Your Location</h2>
      <h3 className="text-3xl font-bold mb-6 text-center text-teal-700">🗺️✨ Locate Them on the Map 😉</h3>

      {/* Dropdowns & Search */}
      <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a City</option>
          {validCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <button
          onClick={fetchLocation}
          disabled={!selectedCity}
          className="p-2 bg-teal-600 text-white rounded disabled:bg-gray-400 hover:bg-teal-700 disabled:hover:bg-gray-400 transition-all"
        >
          Search
        </button>

        <select
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(chartTypes).map((chart) => (
            <option key={chart} value={chart}>{chart}</option>
          ))}
        </select>
      </div>

      {/* ✅ Fixed Container for Chart & Map */}
      <div className="flex flex-col lg:flex-row justify-center items-start space-y-4 lg:space-x-4 w-full max-w-6xl">
        {/* Chart Container */}
        <div className="w-full lg:w-1/2 h-96 bg-white shadow-lg rounded-lg p-4 flex items-center justify-center overflow-hidden">
          {loadingChart ? (
            <p className="animate-pulse text-gray-400 text-lg">Loading chart...</p>
          ) : Object.keys(categories).length > 0 ? (
            React.createElement(chartTypes[selectedChart], {
              data: {
                labels: Object.keys(categories),
                datasets: [{
                  label: "Activity Categories",
                  data: Object.values(categories),
                  backgroundColor: [
                    "#b2f5ea", "#81e6d9", "#4fd1c5", "#38b2ac",
                    "#319795", "#2c7a7b", "#285e61", "#234e52",
                  ],
                }],
              },
              options: {
                maintainAspectRatio: false,
                responsive: true,
                animation: {
                  duration: 1000,
                  easing: "easeInOutQuart",
                },
              },
            })
          ) : (
            <p className="text-gray-400">Chart will appear here</p>
          )}
        </div>

        {/* Map Container */}
        <div className="w-full lg:w-1/2 h-96 bg-white shadow-lg rounded-lg p-4 flex items-center justify-center overflow-hidden">
        {Array.isArray(activities) && activities.length > 0
          ? <ActivityMap activities={activities} loading={loadingChart} />
          : "Map will appear here"}

        </div>
      </div>
    </div>
  );
};

export default MapActivities;
