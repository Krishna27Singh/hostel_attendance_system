import React, { useState, useEffect } from 'react';
import { MapPin, X, Mail } from 'lucide-react';
const ShareLocation = ({ showShareLocation, setShowShareLocation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [city, setCity] = useState('Detecting...');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isShared, setIsShared] = useState(false);

  const backendUrl= import.meta.env.VITE_BACKEND_URL;
  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding to get city name
           
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          } catch (err) {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          }
          setIsLoading(false);
        },
        (err) => {
          setError("Couldn't get precise location. Please enable location permissions.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  };

  const handleShareLocation = async () => {
    
    if (!email || !email.includes('@')) {
      setError("Email is not valid");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!currentLocation) {
      setError("Please get your location first");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${backendUrl}/api/locations/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          coordinates: [currentLocation.lng, currentLocation.lat],
          city,
          userId: name, // Replace with actual user ID from auth
          sharerName: name.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to share location');
      }

      setIsShared(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showShareLocation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <MapPin className="mr-2 text-teal-500" size={20} />
            Share Your Precise Location
          </h3>
          <button 
            onClick={() => setShowShareLocation(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Enter your name"
              disabled={isShared}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Recipient's Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 px-3 py-2 text-sm"
                placeholder="Enter recipient's email"
                disabled={isShared}
              />
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            {!currentLocation ? (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  We'll need your precise location to share
                </p>
                <button
                  onClick={getCurrentLocation}
                  disabled={isLoading}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 disabled:opacity-50"
                >
                  {isLoading ? 'Detecting Location...' : 'Get My Current Location'}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">Your Location:</p>
                <p className="text-xs mt-1 text-gray-600">
                  Latitude: {currentLocation.lat.toFixed(6)}<br />
                  Longitude: {currentLocation.lng.toFixed(6)}
                </p>
              </>
            )}
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>

          {isShared && (
            <div className="p-3 bg-green-100 text-green-800 text-sm rounded-md">
              Location shared successfully with {email}
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowShareLocation(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleShareLocation}
              disabled={isLoading || isShared || !currentLocation}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : isShared ? 'Shared!' : 'Share Location'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLocation;