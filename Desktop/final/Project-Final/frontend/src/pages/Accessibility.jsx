import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import {
  FaMicrophone, FaVolumeUp, FaWheelchair,
  FaSun, FaMoon, FaBars, FaArrowLeft
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import SpeechToText from '../components/SpeechToText';
import ImageUploader from '../components/AcessibilityChecker/ImageUploader';
import ResultDisplay from '../components/AcessibilityChecker/ResultDisplay';


// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Accessibility = () => {
  const [voiceCommand, setVoiceCommand] = useState('');
  const [textToRead, setTextToRead] = useState('');
  const [speechInput, setSpeechInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [wheelchairStops, setWheelchairStops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState(null);

  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wheelchair-stops`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched wheelchair stops:', data);
        setWheelchairStops(data.accessibleStops || []);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);


  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

useEffect(() => {
  if (!recognition) return;

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSpeechInput(transcript);
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
  };

  recognition.onend = () => setIsListening(false);
}, []);


  const filteredStops = wheelchairStops.filter(stop =>
    stop.stop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const percentageAccessible = wheelchairStops.length > 0 ? 100 : 0;

  const cardClass = "bg-white p-4 rounded-lg shadow w-full";
  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500";
  const buttonClass = "bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition";
  
  return (
    <div className="flex h-screen bg-teal-50 text-gray-800">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${showSidebar ? 'w-64' : 'w-0'} overflow-hidden`}>
        {showSidebar && <Sidebar />}
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 rounded-full border border-teal-700">
            {showSidebar ? <FaArrowLeft size={20} /> : <FaBars size={20} />}
          </button>
          <h1 className="text-3xl font-bold text-center flex-1">AI-Powered Accessibility Assistant</h1>
          <button onClick={() => setHighContrast(!highContrast)} className="p-2 rounded-full border border-teal-700">
            {/* {highContrast ? <FaSun size={20} /> : <FaMoon size={20} />} */}
          </button>
        </div>

        {/* Top section: Map and Dashboard */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Map */}
          <div className="md:col-span-2">
            <div className={`${cardClass}`}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FaWheelchair /> Wheelchair-Friendly Stops
              </h3>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by stop name"
                className={`${inputClass} mb-3`}
              />
              <p className="text-sm text-gray-600 mb-2">
                Showing {filteredStops.length} of {wheelchairStops.length} accessible stops.
              </p>
              <div className="h-[400px] rounded overflow-hidden border border-gray-300">
                <MapContainer center={[38.978, -76.496]} zoom={13} className="h-full w-full">
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredStops.map((stop, index) => {
                    console.log(`Placing marker at: ${stop.stop_name} →`, stop.stop_lat, stop.stop_lon);
                    return (
                      <Marker
                        key={index}
                        position={[parseFloat(stop.stop_lat), parseFloat(stop.stop_lon)]}
                      >
                        <Popup>
                          <strong>{stop.stop_name}</strong><br />
                          ID: {stop.stop_id}
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Dashboard */}
<div className={`${cardClass} flex flex-col justify-between`}>
  <div>
    <h2 className="text-2xl font-bold mb-4 text-teal-700">Accessibility Impact</h2>

    <p className="text-gray-700 text-lg font-medium mb-2">
      ♿ Total Wheelchair-Accessible Stops:
      <span className="text-teal-800 font-bold ml-1">{wheelchairStops.length}</span>
    </p>

    <p className="text-sm text-gray-600 mb-4">
      Every accessible stop brings us one step closer to inclusive public transit for all.
    </p>

    <div className="bg-teal-100 p-3 rounded-md text-sm text-gray-700">
      🚏 Explore the map to find accessible transit stops in your area.
    </div>
  </div>

  <blockquote className="mt-6 italic text-gray-600 border-l-4 border-teal-400 pl-4 text-sm">
    “Accessibility is not a feature. It’s a social trend.” — Antonio Santos
  </blockquote>
</div>
        </div>

        {/* Bottom section: Features */}
        <div className="grid md:grid-cols-2 gap-6">
  {/* Speech to Text */}
  <SpeechToText />

  {/* Text to Speech */}
  <div className={`${cardClass}`}>
    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
      <FaVolumeUp /> Text-to-Speech
    </h3>
    <textarea
      value={textToRead}
      onChange={(e) => setTextToRead(e.target.value)}
      placeholder="Enter text to read aloud..."
      className={`${inputClass} h-24`}
    />
    <button
      className={buttonClass}
      onClick={() => {
        if (!textToRead.trim()) return;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'en-US';
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      }}
      disabled={isSpeaking}
    >
      {isSpeaking ? 'Speaking...' : 'Read Aloud'}
    </button>
  </div>
</div>

{/* Voice Navigation - full width */}
<div className="mt-6">
  {/* <div className={`${cardClass} w-full`}>
    <h3 className="text-lg font-semibold mb-3">🎯 Voice Navigation</h3>
    <input
      type="text"
      value={voiceCommand}
      onChange={(e) => setVoiceCommand(e.target.value)}
      placeholder="Enter your command..."
      className={inputClass}
    />
    <button className={buttonClass}>Submit</button>
  </div> */}
</div>
<div className="mt-10">

      <ImageUploader onResults={setResults} />
      {/* {results && <ResultDisplay results={results} />} */}
</div>
      </main>
    </div>
  );
};

export default Accessibility;
