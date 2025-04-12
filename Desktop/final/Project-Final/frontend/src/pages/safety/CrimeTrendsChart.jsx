import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

const CrimeTrendsChart = ({ data, city }) => {
  console.log("City:", city, "Data:", data);

  const [showDetails, setShowDetails] = useState(false);

  // Custom tooltip for hovering data points
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium  text-teal-600">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center mt-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: "#2dd4bf" }}
              />
              <span className="text-sm text-teal-600">
                {entry.name}: <span className="font-medium">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-700 mr-2">
            {city} - Crime Trends (2020-2025)
          </h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-400 hover:text-gray-600"
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
          <p>
            This chart displays the trends for Crime Index and Safety Index over
            the years. Higher Crime Index values indicate more crime, while
            higher Safety Index values suggest a safer environment.
          </p>
        </div>
      )}

      {/* Chart Section */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2dd4bf" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} tickMargin={8} />
            <YAxis tick={{ fontSize: 12 }} tickMargin={8} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              formatter={(value) => (
                <span className="capitalize">{value}</span>
              )}
            />
            <Bar
              type="monotone"
              dataKey="crimeIndex"
              stroke="red-600"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Crime Index"
              fill="#ef4444"
            />
            <Bar
              type="monotone"
              dataKey="safetyIndex"
              stroke="#2dd4bf"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Safety Index"
              fill="#2dd4bf"
            />
            <Brush dataKey="year" height={20} stroke="#2dd4bf" travellerWidth={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Info Section */}
      <div className="mt-3 flex items-center text-xs text-gray-500">
        <Info className="mr-1" size={12} />
        <span>Hover over the chart or use the brush to explore the data.</span>
      </div>
    </div>
  );
};

export default CrimeTrendsChart;
