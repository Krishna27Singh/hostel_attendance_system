import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const HotelRiskChart = () => {
  const [chartData, setChartData] = useState(null);
  const [allData, setAllData] = useState({ x: [], y: [] });
  const [leadDays, setLeadDays] = useState('');

  useEffect(() => {
    // Fetch risk data for 'City Hotel' by default
    axios.post('http://localhost:5001/predict', { hotel: 'City Hotel' })
      .then(res => {
        setAllData({ x: res.data.x, y: res.data.y });
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

  const handleFilter = () => {
    const leadNum = parseInt(leadDays);
    if (isNaN(leadNum)) return;

    const maxLead = Math.max(...allData.x);
    if (leadNum > maxLead) {
      alert('⚠️ ML model can’t handle this prediction');
      return;
    }

    const filteredX = [];
    const filteredY = [];

    for (let i = 0; i < allData.x.length; i++) {
      if (allData.x[i] <= leadNum + 5) {
        filteredX.push(allData.x[i]);
        filteredY.push(allData.y[i]);
      }
    }

    setChartData({
      labels: filteredX,
      datasets: [{
        label: `Cancellation Risk (Up to Lead Time ${leadNum + 5})`,
        data: filteredY,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false
      }]
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cancellation Risk'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Lead Time (days)'
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', height: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
        Predicting Risk of Booking Cancellation
      </h2>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <input
          type="number"
          placeholder="Enter Lead Days"
          value={leadDays}
          onChange={(e) => setLeadDays(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginRight: '1rem',
            width: '200px'
          }}
        />
        <button
          onClick={handleFilter}
          style={{
            padding: '0.5rem 1.2rem',
            backgroundColor: 'teal',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 128, 128, 0.5)',
            cursor: 'pointer'
          }}
        >
          Show Risk
        </button>
      </div>

      <div style={{ height: '500px' }}>
        {chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <a
          href="https://flightpricepredictor-qwuasxxqhrbmg8tcskk29j.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.6rem 1.4rem',
            backgroundColor: 'teal',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            boxShadow: '0px 4px 12px rgba(0, 128, 128, 0.3)',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          ✈️ Do Flight Prices Prediction Here
        </a>
      </div>
    </div>
  );
};

export default HotelRiskChart;