import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const HotelRiskChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch risk data for 'City Hotel' by default
    axios.post('http://localhost:5001/predict', { hotel: 'City Hotel' })
      .then(res => {
        setChartData({
          labels: res.data.x,
          datasets: [{
            label: 'Cancellation Risk - City Hotel',
            data: res.data.y,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
          }]
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>📊 Predicting Risk of Booking Cancellation</h2>
      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default HotelRiskChart;
