import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

const AMADEUS_BASE_URL = "https://test.api.amadeus.com/v1/reference-data/locations/pois";
const ACCESS_TOKEN = "LQoHy8x4Gq74qsASbEHj2xKrFQPg";

const POITrends = () => {
  const [trendType, setTrendType] = useState("category");
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch POI data from Amadeus API
  const fetchPOIData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(AMADEUS_BASE_URL, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        params: {
          latitude: 41.397158, // Example latitude (Barcelona)
          longitude: 2.160873, // Example longitude (Barcelona)
          radius: 10, // Radius in km
        },
      });

      return response.data.data;
    } catch (err) {
      console.error("Error fetching POI data:", err);
      setError("Failed to fetch POI data.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Process POI data for different trend types
  const processTrendData = (poiData) => {
    if (trendType === "category") {
      const categoryCounts = {};
      poiData.forEach((poi) => {
        categoryCounts[poi.category] = (categoryCounts[poi.category] || 0) + 1;
      });
      return categoryCounts;
    } else if (trendType === "tags") {
      const tagCounts = {};
      poiData.forEach((poi) => {
        poi.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
      return tagCounts;
    } else if (trendType === "rank") {
      const rankCounts = {};
      poiData.forEach((poi) => {
        rankCounts[poi.rank] = (rankCounts[poi.rank] || 0) + 1;
      });
      return rankCounts;
    }
    return {};
  };

  // Fetch and process data when trend type changes
  useEffect(() => {
    const updateChartData = async () => {
      const poiData = await fetchPOIData();
      const processedData = processTrendData(poiData);

      setChartData({
        labels: Object.keys(processedData),
        datasets: [
          {
            label: `Trend Analysis: ${trendType}`,
            data: Object.values(processedData),
            borderColor: "rgb(75,192,192)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: true,
          },
        ],
      });
    };

    updateChartData();
  }, [trendType]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        POI Trends Analysis
      </h2>

      {/* Dropdown for selecting trend type */}
      <label htmlFor="trendType" className="block mb-2 text-gray-600">
        Select Trend Type:
      </label>
      <select
        id="trendType"
        value={trendType}
        onChange={(e) => setTrendType(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      >
        <option value="category">Category Distribution</option>
        <option value="tags">Tag Analysis</option>
        <option value="rank">Rank Analysis</option>
      </select>

      {/* Chart rendering */}
      <div className="w-full h-[400px] flex justify-center items-center" >
        {loading ? (
          <p className="text-gray-600">Loading chart...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <Line
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `POI Trends (${trendType})`,
                  font: { size: 16 },
                },
                legend: { position: "bottom" },
              },
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default POITrends;
