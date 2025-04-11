import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Import environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExchangeRateChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
    .get(`${BACKEND_URL}/api/currency/top5`)
      .then((res) => {
        const ratesArray = res.data.top5;
  
        setData({
          labels: ratesArray.map((item) => item.code), // currency names
          datasets: [
            {
              label: "Exchange Rate (USD → X)",
              data: ratesArray.map((item) => Number(item.rate)),
              backgroundColor: "#14B8A6", // Teal-500

              borderRadius: 8,
            },
          ],
        });
      })
      .catch((err) => console.error("Chart error:", err));
  }, []);
  
  
  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Top 5 Exchange Rates</h2>
      {data ? <Bar data={data} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default ExchangeRateChart;
