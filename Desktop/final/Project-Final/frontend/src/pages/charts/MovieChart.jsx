import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const backendUrl=import.meta.env.VITE_BACKEND_URL;

const MovieChart = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('top_rated');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'now_playing', label: 'Now Playing' }
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/movies/${category}`);
        console.log(response)
        setMovies(response.data.slice(0, 10));
        setError('');
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const chartData = {
    labels: movies.map(movie => movie.title),
    datasets: [{
      data: movies.map(movie => movie.vote_average),
      backgroundColor: [
        "#88D8D8", // Soft teal (light)  
        "#5CCCCC", // Bright teal  
        "#38B2AC", // Classic teal (balanced)  
        "#2C9C96", // Slightly deeper  
        "#20847F", // Medium-dark teal  
        "#166D69", // Rich teal  
        "#0D5653", // Deep teal  
        "#07403E", // Very dark teal  
        "#03302E", // Near-black teal  
        "#012120"  // Darkest teal (almost black)  
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top 10 Movies
      </h2>
      
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xs">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Select Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            {categories.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full h-[400px] flex justify-center items-center">
        {loading ? (
          <p className="text-gray-600">Loading chart...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <Doughnut 
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `Top 10 ${categories.find(c => c.value === category)?.label}`,
                  font: { size: 16 }
                },
                legend: { 
                  position: 'bottom',
                  labels: { font: { size: 12 } }
                }
              },
              maintainAspectRatio: false
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieChart;