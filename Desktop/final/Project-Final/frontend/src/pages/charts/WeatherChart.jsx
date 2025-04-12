import React, { useState, useEffect } from 'react';
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  XAxis, YAxis, Tooltip,
  CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const WeatherChart = () => {
  const [sourceCity, setSourceCity] = useState('Delhi');
  const [destinationCity, setDestinationCity] = useState('Mumbai');
  const [weatherData, setWeatherData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData(); // Fetch default weather comparison on first load
  }, []);
  

  // Fetch weather data from the backend API
  const fetchWeatherData = async () => {
    if (!sourceCity.trim() || !destinationCity.trim()) {
      setError("Please enter both source and destination cities.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Make a request to your backend
      const response = await fetch(`${BACKEND_URL}/api/weather/weather?sourceCity=${sourceCity}&destinationCity=${destinationCity}`);
      const data = await response.json();
      console.log("weatherdata: ",data)

      // Check if the data is valid
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No weather data found.");
      }

      setWeatherData(data);  // Set the weather data from backend
    } catch (err) {
      setError(err.message || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const renderChart = () => {
    const ChartComponent =
      chartType === 'line' ? LineChart :
      chartType === 'bar' ? BarChart :
      AreaChart;

    const ChartElement =
      chartType === 'line' ? Line :
      chartType === 'bar' ? Bar :
      Area;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={weatherData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {sourceCity && (
            <ChartElement
              type="monotone"
              dataKey={sourceCity}
              stroke="#0d9488"
              fill="#0d9488"
            />
          )}
          {destinationCity && (
            <ChartElement
              type="monotone"
              dataKey={destinationCity}
              stroke="#eab308"
              fill="#eab308"
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-50 p-4">
      <div className="bg-white p-6 w-full max-w-4xl rounded-2xl shadow-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">
          🌤️ Compare Weather (Source vs Destination)
        </h1>
        <h3 className="text-2xl font-semibold mb-4 text-teal-700">🌦️ 5-Day Weather Forecast</h3>

        <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full">
          <input
            type="text"
            value={sourceCity}
            onChange={handleInputChange(setSourceCity)}
            placeholder="Enter source city"
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          <input
            type="text"
            value={destinationCity}
            onChange={handleInputChange(setDestinationCity)}
            placeholder="Enter destination city"
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
        </div>

        {/* Chart type selector */}
        <div className="mb-4 w-full sm:w-auto">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="line">📈 Line Chart</option>
            <option value="bar">📊 Bar Chart</option>
            <option value="area">🌄 Area Chart</option>
          </select>
        </div>

        <button
          onClick={fetchWeatherData}
          disabled={loading}
          className={`p-3 rounded-lg mb-6 w-full sm:w-auto font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-teal-500 hover:bg-teal-600 text-white shadow-md"
          }`}
        >
          {loading ? "Fetching..." : "Compare Weather"}
        </button>

        {/* Chart display */}
        <div style={{ width: '100%', height: 400 }} className="bg-white rounded-xl shadow-inner">
          {weatherData.length > 0 ? renderChart() : (
            <p className="text-gray-500 text-center py-10">
              No data to display. Please enter cities and click Compare.
            </p>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default WeatherChart;
