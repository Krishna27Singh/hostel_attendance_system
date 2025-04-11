import React, { useState, useEffect } from 'react';
import { 
  Star, Shield, Clock, MapPin, Bookmark, Bell, Smile, Meh, Frown,
  AlertTriangle, ChevronRight, Navigation, Map
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Dynamically import Leaflet components to avoid SSR issues
import LeafletMap from '../pages/safety/LeafletMap'

// Import components
import CrimeTrendsChart from '../pages/safety/CrimeTrendsChart';
import EmergencyContacts from '../pages/safety/EmergencyContacts';
import TravelStories from '../pages/safety/TravelStories';
import ShareExperience from '../pages/safety/ShareExperience';
import SafetyCommunities from '../pages/safety/SafetyCommunities';
import ShareLocation from './safety/ShareLocation';
import { fetchStories } from './safety/api'


// Sample data structure matching to API response
const sampleCityData = {
    "city": "Delhi",
    "country": "India",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jama_Masjid_2011.jpg/500px-Jama_Masjid_2011.jpg",
    "crime_index": 59.1,
    "safety_index": 40.9,
    "data": [
      { "year": 2020, "crimeIndex": 58.2, "safetyIndex":41.8 },
      { "year": 2021, "crimeIndex": 59.2, "safetyIndex":40.8},
      { "year": 2022, "crimeIndex": 59.3, "safetyIndex":40.7},
      { "year": 2023, "crimeIndex": 59.2, "safetyIndex":40.8 },
      { "year": 2024, "crimeIndex": 59.4, "safetyIndex":40.6 },
      { "year": 2025, "crimeIndex": 59.1 , "safetyIndex":40.9}
    ],
    "verdict": "Delhi can be a safe place for solo female travelers, but it's crucial to be aware of your surroundings and take necessary precautions, especially at night. ",
    "tips": [
      "Use Reliable Transportation",
      "avoiding isolated areas at night",
      "Be Mindful of Food and Drink",
      "Dress Respectfully"
    ],

    "hotels": [
      {
        "name": "The Tyche Boutique & Suites New Delhi",
        "rating": 7.9,
        "location": "2285-88 Chuna Mandi, Paharganj., Paharganj, 110055 New Delhi, India",
        "price": "3,000",
        "imageUrl": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/641038971.jpg?k=af68f52a58c3bc28096fb73a101ad4fffe38ceeb5702350819b6e4d648c4e598&o=",
        "amenities": ["Non-smoking rooms", "wellness centre", "free WiFi"]
      },
      {
        "name": "Vivanta New Delhi, Dwarka",
        "rating": 8.1,
        "location": "Metro Station Complex, Sector - 21, Dwarka, 110075 New Delhi, India",
        "price": "6,750",
        "imageUrl": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/43516225.jpg?k=ec47018274ffb769dc32dfefbffbe159e7f692b8e8260b864e0f31bcd264e3b9&o=",
        "amenities": ["Fitness centre", "Security cameras", "Non-smoking rooms"]
      }
    ]
  
};

// List of available cities
const availableCities = [
  "Delhi",
  "Bangkok",
  "London",
  "Singapore",
  "Paris",
  "Dubai",
  "Kuala Lumpur",
  "Istanbul",
  "Antalya",
  "Shenzhen",
  "Mumbai",
  "Palma de Mallorca",
  "Rome",
  "Tokyo",
  "Pattaya",
  "Taipei",
  "Guangzhou",
  "Prague",
  "Seoul",
  "Amsterdam",
  "Osaka",
  "Shanghai",
  "Ho Chi Minh City",
  "Barcelona",
  "Milan",
  "Chennai",
  "Vienna",
  "Johor Bahru",
  "Jaipur",
  "Berlin",
  "Athens",
  "Madrid",
  "Riyadh",
  "Florence",
  "Jerusalem",
  "Hanoi",
  "Kolkata",
  "Bangalore",
  "Pune"
];

const initialStories = [
  {
    id: 1,
    title: "My solo trip to Vienna",
    content: "Traveling alone in Vienna was wonderful. The city felt incredibly safe even at night, with excellent public transport and helpful locals.",
    author: "Sarah K.",
    rating: 5,
    location: "Vienna, Austria",
    likes: 24,
    date: "2 weeks ago",
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 2,
    title: "Backpacking through Europe",
    content: "While most European cities were welcoming, I did face some uncomfortable situations in crowded areas. Always trust your instincts!",
    author: "Maria L.",
    rating: 3,
    location: "Various, Europe",
    likes: 15,
    date: "1 month ago",
    isLiked: false,
    isBookmarked: false
  }
];

const SafePlaces = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [cityData, setCityData] = useState(sampleCityData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('safety');
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showShareForm, setShowShareForm] = useState(false);
  const [showShareLocation, setShowShareLocation] = useState(false);
  const [emergencyCountry, setEmergencyCountry] = useState('Austria');

  // Fetch city data when selected city changes
  useEffect(() => {
    const fetchCityData = async () => {
      setLoading(true);
      setError(null);
      try {
        
        const response = await fetch(`${backendUrl}/api/cities/${selectedCity}`);
        const data = await response.json();

        console.log(response)
        setCityData(data);
        setEmergencyCountry(data.country);
      } catch (err) {
        setError('Failed to load city data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [selectedCity]);


  const getStories = async () => {
    try {
      const { data } = await fetchStories();
      setStories(data);
    } catch (error) {
      console.log('Error fetching stories: ', error);
      // Fallback to initial stories if API fails
      setStories(initialStories);
    }
  };

  // In your SafePlaces component, add this effect
useEffect(() => {
  // Ensure currentStoryIndex is always valid
  if (stories.length > 0 && currentStoryIndex >= stories.length) {
    setCurrentStoryIndex(stories.length - 1);
  } else if (stories.length === 0) {
    setCurrentStoryIndex(0);
  }
}, [stories, currentStoryIndex]);


  useEffect(()=>{
    getStories();
  }, [])
  // Auto-scroll stories
  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      setCurrentStoryIndex(prev => (prev + 1) % stories.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoScroll, stories.length]);

  const handleNextStory = () => {
    setCurrentStoryIndex(prev => (prev + 1) % stories.length);
    setAutoScroll(false);
  };

  const handlePrevStory = () => {
    setCurrentStoryIndex(prev => (prev - 1 + stories.length) % stories.length);
    setAutoScroll(false);
  };
  const handleStoryAdded = async (newStory) => {
    // Optimistically update the UI
    setStories(prev => {
      const updated = [...prev, newStory];
      // Set index to the new story
      setCurrentStoryIndex(updated.length - 1);
      return updated;
    });
    
    // Then refresh from server to ensure consistency
    try {
      const { data } = await fetchStories();
      setStories(data);
      setCurrentStoryIndex(data.length - 1); // Ensure we're on the new story
    } catch (error) {
      console.error('Error refreshing stories:', error);
    }
  };


  const getSafetyIcon = (index) => {
    if (index >= 70) return <Smile className="text-green-500" size={16} />;
    if (index >= 50) return <Meh className="text-yellow-500" size={16} />;
    return <Frown className="text-red-500" size={16} />;
  };
  const getSafetyRating = (index) => {
    // Convert safety index (0-100) to 1-5 star rating
    return (index / 20).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p>Loading {selectedCity} safety data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-teal-600">Travel Smarter, Stay Safer</h1>
              <p className="text-gray-600 mt-2">
                Check city safety ratings, read travel experiences, and access emergency resources.
              </p>
            </div>
            <button 
              onClick={() => setShowShareLocation(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            >
              Share Location
            </button>
            
            <ShareLocation 
              showShareLocation={showShareLocation}
              setShowShareLocation={setShowShareLocation}
              selectedCity={selectedCity}
            />
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - City info and graph */}
          <div className="lg:col-span-2 space-y-6">
            {/* City Safety Analysis Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-gray-800 mr-2">{cityData.city}</h2>
                    <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                      {cityData.country}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Safety Index Box */}
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm text-teal-800">Safety Index</h3>
                    <Shield className="text-teal-500" size={18} />
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-teal-900">{cityData.safety_index}</span>
                    <span className="text-gray-500 text-sm mb-1">/ 100</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(getSafetyRating(cityData.safety_index)) ? 'fill-teal-500 text-teal-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Crime Index Box */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm text-red-800">Crime Index</h3>
                    <AlertTriangle className="text-red-500" size={18} />
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-red-900">{cityData.crime_index}</span>
                    <span className="text-gray-500 text-sm mb-1">/ 100</span>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-red-500 h-1.5 rounded-full" 
                        style={{ width: `${cityData.crime_index}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Safety Verdict Box */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm text-green-800">Safety Verdict</h3>
                    {getSafetyIcon(cityData.safety_index)}
                  </div>
                  <p className="text-gray-700 text-sm">{cityData.verdict}</p>
                </div>
              </div>

              {/* Tabs for different views */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'safety' ? 'text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('safety')}
                >
                  Safety Trends
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'map' ? 'text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('map')}
                >
                  City Map
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'hotels' ? 'text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('hotels')}
                >
                  Safe Hotels
                </button>
              </div>

              {activeTab === 'safety' && (
                <CrimeTrendsChart 
                  data={cityData.data}
                  cityName={cityData.city}
                />
              )}

              {activeTab === 'map' && (
                <div className="h-96 rounded-lg overflow-hidden">
                  <LeafletMap city={cityData.city} />
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Recommended Accommodations in {cityData.city}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {cityData.hotels.map((hotel, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div className="w-1/3">
                            <img 
                              src={hotel.imageUrl} 
                              alt={hotel.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-gray-800">{hotel.name}</h3>
                              <div className="flex items-center bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-medium">
                                <Star className="fill-teal-500 text-teal-500 mr-1" size={12} />
                                {hotel.rating}
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin size={12} className="mr-1" />
                              {hotel.location}
                            </div>
                            <div className="mt-2">
                              <span className="text-sm font-medium text-gray-700">₹{hotel.price}</span>
                              <span className="text-xs text-gray-500 ml-1">per night</span>
                            </div>
                            <div className="mt-3">
                              <h4 className="text-xs font-medium text-gray-700 mb-1">Amenities:</h4>
                              <div className="flex flex-wrap gap-1">
                                {hotel.amenities.map((amenity, i) => (
                                  <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Tips */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                  <Shield className="mr-2 text-teal-500" size={16} />
                  Safety Tips for {cityData.city}
                </h3>
                <ul className="space-y-2">
                  {cityData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-teal-100 text-teal-800 rounded-full p-1 mr-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ShareExperience 
              showShareForm={showShareForm}
              setShowShareForm={setShowShareForm}
              onStoryAdded={handleStoryAdded}
            />
          </div>

          {/* Right column - Stories and emergency info */}
          <div className="space-y-6">
          <TravelStories 
              stories={stories}
              currentStoryIndex={currentStoryIndex}
              autoScroll={autoScroll}
              setAutoScroll={setAutoScroll}
              setCurrentStoryIndex={setCurrentStoryIndex}
              handleNextStory={handleNextStory}
              handlePrevStory={handlePrevStory}
            />

            <EmergencyContacts 
              emergencyCountry={emergencyCountry}
              setEmergencyCountry={setEmergencyCountry}
            />

            <SafetyCommunities />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SafePlaces;
