import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import comparisonData from './comp.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const cities = ['Ahmedabad', 'Bangalore', 'Bangkok', 'Chennai', 'Delhi', 'Dubai', 'Goa',
  'Hyderabad', 'Jaipur', 'Kolkata', 'London', 'Mumbai', 'New York', 'Pune', 'Singapore'];

const CompetitorPriceComparison = () => {
  const [dataType, setDataType] = useState('flights');
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Mumbai');
  const [hotelCity, setHotelCity] = useState('Mumbai');
  const [competitorData, setCompetitorData] = useState(null);
  const [yAxisRange, setYAxisRange] = useState({ min: 0, max: 10000 });

  
  useEffect(() => {
    const platforms = ['Cleartrip', 'MakeMyTrip', 'Yatra'];

    if (dataType === 'hotels') {
      const filtered = comparisonData.filter(item =>
        item.Type.toLowerCase() === 'hotel' &&
        item.To === hotelCity &&
        item.Date >= '2025-04-15'
      );

      const allPrices = [];
      const data = platforms.map(platform => {
        const entry = filtered.find(f => f.Platform === platform);
        const price = entry ? entry['Price (INR)'] : null;
        if (price !== null) allPrices.push(price);
        return price;
      });

      if (allPrices.length === 0) {
        setCompetitorData(null);
        return;
      }

      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      setYAxisRange({ min: minPrice - 200, max: maxPrice + 200 });

      setCompetitorData({
        labels: platforms,
        datasets: [
          {
            label: 'Hotel Price (INR)',
            data,
            backgroundColor: ['#0f766e', '#14b8a6', '#5eead4'],
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      });
    } else {
      const filtered = comparisonData.filter(item =>
        item.Type.toLowerCase() === dataType.slice(0, -1).toLowerCase() &&
        item.From === fromCity &&
        item.To === toCity &&
        item.Date >= '2025-04-15'
      );

      const allDates = Array.from(new Set(filtered.map(f => f.Date))).sort();
      const platformMap = {};
      platforms.forEach(platform => {
        platformMap[platform] = {};
      });

      filtered.forEach(entry => {
        platformMap[entry.Platform][entry.Date] = entry['Price (INR)'];
      });

      const validDates = allDates.filter(date =>
        platforms.some(platform => platformMap[platform][date] !== undefined)
      );

      const allPrices = validDates.flatMap(date =>
        platforms.map(platform => platformMap[platform][date]).filter(val => val !== undefined)
      );

      if (allPrices.length === 0) {
        setCompetitorData(null);
        return;
      }

      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      setYAxisRange({ min: minPrice - 200, max: maxPrice + 200 });

      const datasets = platforms.map(platform => ({
        label: platform,
        data: validDates.map(date => platformMap[platform][date] ?? null),
        borderColor:
          platform === 'Cleartrip'
            ? '#0f766e'
            : platform === 'MakeMyTrip'
            ? '#14b8a6'
            : '#5eead4',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0, // straight lines
        pointRadius: 4,
        pointHoverRadius: 6,
        spanGaps: false,
      }));

      setCompetitorData({
        labels: validDates,
        datasets,
      });
    }
  }, [fromCity, toCity, hotelCity, dataType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text:
          dataType === 'hotels'
            ? `Hotel Price Comparison in ${hotelCity}`
            : dataType === 'packages'
            ? `Package Prices: ${fromCity} → ${toCity} (for 1 person)`
            : `Flight Prices: ${fromCity} → ${toCity}`,
      },
    },
    scales: {
      y: {
        min: yAxisRange.min,
        max: yAxisRange.max,
        ticks: {
          stepSize: Math.ceil((yAxisRange.max - yAxisRange.min) / 5),
          callback: value => `₹${value}`,
        },
      },
    },
  };

  return (
    <section className="bg-white rounded-xl shadow p-6 h-full">
      <h2 className="text-xl font-semibold mb-2 text-teal-700 text-center">Find Your Best Travel Deal!</h2>
      <p className="text-sm text-gray-600 italic text-center mb-4">
        "Compare. Choose. Wander smarter." ✈️
      </p>

      <div className="mb-4">
        <select
          className="shadow-lg shadow-teal-100 border border-teal-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="flights">Flights</option>
          <option value="hotels">Hotels</option>
          <option value="packages">Packages</option>
        </select>
      </div>

      {(dataType === 'flights' || dataType === 'packages') && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">From:</label>
              <select
                className="shadow-lg shadow-teal-100 border border-teal-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">To:</label>
              <select
                className="shadow-lg shadow-teal-100 border border-teal-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {dataType === 'packages' && (
            <p className="text-sm text-gray-500 italic mb-2">
              Package prices shown are for one person.
            </p>
          )}
        </>
      )}

      {dataType === 'hotels' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select City:</label>
          <select
            className="shadow-lg shadow-teal-100 border border-teal-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            value={hotelCity}
            onChange={(e) => setHotelCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      {competitorData ? (
        <div className="h-[400px] bg-white rounded-xl shadow-lg shadow-teal-100 p-4">
          {dataType === 'hotels' ? (
            <Bar options={options} data={competitorData} />
          ) : (
            <Line options={options} data={competitorData} />
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No data available for this selection.</p>
      )}
    </section>
  );
};

export default CompetitorPriceComparison;
