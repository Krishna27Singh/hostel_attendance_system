import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("backendurl",BACKEND_URL)
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const TopFiatCurrenciesChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchTopFiatRates = async () => {
      try {
        //const response = await axios.get("http://localhost:5000/api/currency/top10fiat");
        const response = await axios.get(`${BACKEND_URL}/api/currency/top10fiat`);

        console.log("topfiat:",response)

        const rates = response.data.rates;

        const labels = Object.keys(rates);
        const data = Object.values(rates).map(rate => parseFloat(rate));

        setChartData({
          labels,
          datasets: [
            {
              label: "Top 10 Fiat Exchange Rates (vs USD)",
              data,
              borderColor: "rgba(13, 148, 136, 1)", 
              backgroundColor: "rgba(13, 148, 136, 0.2)", 
              tension: 0.3,
              fill: true,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching top 10 fiat rates:", error);
      }
    };

    fetchTopFiatRates();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow h-[400px] w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Top 10 Fiat Currency Exchange Rates (Base: USD)
      </h2>
      {chartData ? (
        <div className="h-[300px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true, position: "top" },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center">Loading chart...</p>
      )}
    </div>
  );
};

export default TopFiatCurrenciesChart;
