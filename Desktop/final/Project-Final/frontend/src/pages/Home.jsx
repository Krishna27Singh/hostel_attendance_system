import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Waves, Mountain } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import SearchForm from "../components/SearchForm";
import MoodCard from "../components/MoodCard";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import { ItineraryProvider } from '../context/ItineraryContext';
import ItineraryPlanner from '../components/ItineraryPlanner';
import ItineraryManager from '../components/ItineraryManager';


const apikey=import.meta.env.VITE_OMDB_API_KEY;
const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [movies, setMovies] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const moodCategories = [
    { icon: <Waves className="text-teal-500" size={20} />, title: "Party", color: "bg-teal-100" },
    { icon: <Mountain className="text-teal-500" size={20} />, title: "Adventure", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Relax", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Romance", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Happy", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Calming", color: "bg-teal-100" },
  ];

  const fetchMovies = async (mood) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/movies?mood=${mood}`);
      if (response.data && Array.isArray(response.data)) {
        const currentYear = new Date().getFullYear();
        const filteredMovies = response.data.filter((movie) => {
          const movieYear = parseInt(movie.Year, 10);
          return movieYear >= currentYear - 10;
        });
      
        const moviesToShow = filteredMovies.length > 3
          ? filteredMovies.sort(() => 0.5 - Math.random()).slice(0, 3)
          : filteredMovies;
      
        setMovies(moviesToShow);
        toast.success(`Fetched movies for ${mood}!`);
      } else {
        toast.error(`No movies found for ${mood}!`);
        setMovies([]);
      }
      
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies.");
      setMovies([]);
    }
  };

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    fetchMovies(mood);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 p-6">
        <Hero />

        <header className="bg-white border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="bg-travel-blue text-white p-1.5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </svg>
            </div>
         
          </div>
          
         
        </div>
      </header>
      
      
      <section id="trip-planner">
        <ItineraryManager />
      </section>

      {/* <main>
        <ItineraryProvider>
          <ItineraryPlanner />
        </ItineraryProvider>
      </main> */}
      
        {/* <SearchForm /> */}
        <Feature />

        {selectedMood && (
          <section className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Enjoy your travel with these movies
            </h2>
            <div className="flex flex-wrap gap-4">
              {movies.map((movie) => (
                <div key={movie.imdbID} className="bg-white rounded-lg shadow-md w-48">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="h-32 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <h3 className="font-medium text-sm truncate">{movie.Title}</h3>
                    <p className="text-xs text-gray-600">{movie.Year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!selectedMood && (
          <section className="bg-white rounded-xl shadow p-6 mt-6">
            <h1>Get movie recommendations for your travel!</h1>
            <h2 className="text-xl font-semibold mb-4">How do you feel today?</h2>
            <div className="grid grid-cols-3 gap-4">
              {moodCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleMoodClick(category.title)}
                  className="w-full h-24 transition-transform transform hover:scale-105"
                >
                  <MoodCard {...category} />
                </button>
              ))}
            </div>
          </section>
        )}

       <div className="mt-16"> 
        <Footer />
       </div>

      </div>
    </div>
  );
};

export default Home;
