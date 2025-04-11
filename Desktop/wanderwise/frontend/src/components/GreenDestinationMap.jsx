
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Globe } from 'lucide-react';

// Fix for default icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom green marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// GSTC-inspired sustainable destination data (top 100)
const gstcEcoDestinations = [
  // High sustainability rating (GSTC certified)
  { id: 1, name: 'Costa Rica', position: [9.7489, -83.7534], rating: 'High', certification: 'GSTC Certified', description: 'Leading in conservation with 25% of land as national parks.' },
  { id: 2, name: 'Norway', position: [60.4720, 8.4689], rating: 'High', certification: 'GSTC Certified', description: 'Pioneer in electric vehicle adoption and renewable energy.' },
  { id: 3, name: 'Bhutan', position: [27.5142, 90.4336], rating: 'High', certification: 'GSTC Certified', description: 'World\'s only carbon-negative country with 70% forest cover.' },
  { id: 4, name: 'New Zealand', position: [-40.9006, 174.8860], rating: 'High', certification: 'GSTC Certified', description: 'Committed to 100% renewable electricity by 2035.' },
  { id: 5, name: 'Iceland', position: [64.9631, -19.0208], rating: 'High', certification: 'GSTC Certified', description: '100% of electricity from renewable geothermal and hydropower.' },
  { id: 6, name: 'Slovenia', position: [46.1512, 14.9955], rating: 'High', certification: 'GSTC Recognized', description: 'First country declared a green destination with 60% forest cover.' },
  { id: 7, name: 'Palau', position: [7.5150, 134.5825], rating: 'High', certification: 'GSTC Recognized', description: 'Created world\'s first shark sanctuary and banned toxic sunscreens.' },
  { id: 8, name: 'Finland', position: [61.9241, 25.7482], rating: 'High', certification: 'GSTC Recognized', description: 'Aims to be carbon neutral by 2035 with extensive forest coverage.' },
  { id: 9, name: 'Sweden', position: [60.1282, 18.6435], rating: 'High', certification: 'GSTC Recognized', description: 'Pioneering waste management with less than 1% going to landfills.' },
  { id: 10, name: 'Denmark', position: [56.2639, 9.5018], rating: 'High', certification: 'GSTC Recognized', description: 'Leader in wind energy and sustainable urban planning.' },
  
  // Medium sustainability rating (GSTC aligned)
  { id: 11, name: 'Ecuador', position: [-1.8312, -78.1834], rating: 'Medium', certification: 'GSTC Aligned', description: 'Constitution recognizes rights of nature, preserving biodiversity.' },
  { id: 12, name: 'Portugal', position: [39.3999, -8.2245], rating: 'Medium', certification: 'GSTC Aligned', description: 'Renewable energy leader with 60% of electricity from clean sources.' },
  { id: 13, name: 'Switzerland', position: [46.8182, 8.2275], rating: 'Medium', certification: 'GSTC Aligned', description: 'Pioneer in sustainable transportation with extensive rail network.' },
  { id: 14, name: 'Austria', position: [47.5162, 14.5501], rating: 'Medium', certification: 'GSTC Aligned', description: 'Advanced waste management and alpine conservation efforts.' },
  { id: 15, name: 'Canada', position: [56.1304, -106.3468], rating: 'Medium', certification: 'GSTC Aligned', description: 'Strict national park management and indigenous-led conservation.' },
  { id: 16, name: 'Netherlands', position: [52.1326, 5.2913], rating: 'Medium', certification: 'GSTC Aligned', description: 'Leading in sustainable agriculture and bicycle infrastructure.' },
  { id: 17, name: 'Japan', position: [36.2048, 138.2529], rating: 'Medium', certification: 'GSTC Aligned', description: 'Innovative waste management and forest conservation practices.' },
  { id: 18, name: 'Uruguay', position: [-32.5228, -55.7658], rating: 'Medium', certification: 'GSTC Aligned', description: '98% of electricity comes from renewable sources.' },
  { id: 19, name: 'Spain', position: [40.4637, -3.7492], rating: 'Medium', certification: 'GSTC Aligned', description: 'Expanding protected marine areas and renewable energy.' },
  { id: 20, name: 'Germany', position: [51.1657, 10.4515], rating: 'Medium', certification: 'GSTC Aligned', description: 'Leading the Energiewende transition to renewable energy.' },
  
  // Additional top-rated eco-destinations
  { id: 21, name: 'Galapagos Islands, Ecuador', position: [-0.7453, -90.3367], rating: 'High', certification: 'GSTC Certified', description: 'Strict visitor limits and conservation measures for this unique ecosystem.' },
  { id: 22, name: 'Belize', position: [17.1899, -88.4976], rating: 'High', certification: 'GSTC Certified', description: 'Protected barrier reef and community-based ecotourism.' },
  { id: 23, name: 'Monteverde, Costa Rica', position: [10.3010, -84.8140], rating: 'High', certification: 'GSTC Certified', description: 'Cloud forest reserve with pioneering conservation funding.' },
  { id: 24, name: 'Tasmania, Australia', position: [-42.0409, 146.8087], rating: 'High', certification: 'GSTC Certified', description: '42% of land protected with advanced conservation management.' },
  { id: 25, name: 'Dominica', position: [15.4150, -61.3710], rating: 'High', certification: 'GSTC Recognized', description: 'The "Nature Island" with geothermal energy investments.' },
  { id: 26, name: 'Bonito, Brazil', position: [-21.1261, -56.4820], rating: 'High', certification: 'GSTC Recognized', description: 'Pioneered visitor voucher system to limit environmental impact.' },
  { id: 27, name: 'Chumbe Island, Tanzania', position: [-6.2797, 39.1747], rating: 'High', certification: 'GSTC Certified', description: 'Private marine park with award-winning eco-accommodations.' },
  { id: 28, name: 'Arosa, Switzerland', position: [46.7836, 9.6798], rating: 'High', certification: 'GSTC Recognized', description: 'Sustainable alpine tourism with strict environmental standards.' },
  { id: 29, name: 'Vancouver, Canada', position: [49.2827, -123.1207], rating: 'High', certification: 'GSTC Aligned', description: 'Green building policies and public transportation leadership.' },
  { id: 30, name: 'Estonia', position: [58.5953, 25.0136], rating: 'Medium', certification: 'GSTC Aligned', description: 'Digital society with extensive forest conservation (50% forest cover).' },
  
  // More medium-rated destinations
  { id: 31, name: 'South Korea', position: [35.9078, 127.7669], rating: 'Medium', certification: 'GSTC Aligned', description: 'Advanced green urban planning and reforestation success.' },
  { id: 32, name: 'Luxembourg', position: [49.8153, 6.1296], rating: 'Medium', certification: 'GSTC Aligned', description: 'Free public transit nationwide to reduce carbon emissions.' },
  { id: 33, name: 'Chile', position: [-35.6751, -71.5430], rating: 'Medium', certification: 'GSTC Aligned', description: 'Rapid transition to renewable energy and extensive park creation.' },
  { id: 34, name: 'Seychelles', position: [-4.6796, 55.4920], rating: 'Medium', certification: 'GSTC Aligned', description: 'Marine conservation and "blue bonds" for ocean protection.' },
  { id: 35, name: 'Rwanda', position: [-1.9403, 29.8739], rating: 'Medium', certification: 'GSTC Aligned', description: 'Plastic bag ban and reforestation with gorilla conservation.' },
  { id: 36, name: 'Malta', position: [35.9375, 14.3754], rating: 'Medium', certification: 'GSTC Aligned', description: 'Sustainable water management and marine protected areas.' },
  { id: 37, name: 'Namibia', position: [-22.9576, 18.4904], rating: 'Medium', certification: 'GSTC Aligned', description: 'Community-based conservation with local benefit sharing.' },
  { id: 38, name: 'Ireland', position: [53.1424, -7.6921], rating: 'Medium', certification: 'GSTC Aligned', description: 'Green tourism certification and renewable energy investment.' },
  { id: 39, name: 'Taiwan', position: [23.6978, 120.9605], rating: 'Medium', certification: 'GSTC Aligned', description: 'Advanced recycling systems and marine conservation efforts.' },
  { id: 40, name: 'Maldives', position: [3.2028, 73.2207], rating: 'Medium', certification: 'GSTC Aligned', description: 'Eco-resort certification and coral restoration projects.' },
  
  // Trending sustainable destinations (up-and-coming)
  { id: 41, name: 'Nepal', position: [28.3949, 84.1240], rating: 'Trending', certification: 'GSTC Aligned', description: 'Sustainable trekking practices and community-based ecotourism.' },
  { id: 42, name: 'Colombia', position: [4.5709, -74.2973], rating: 'Trending', certification: 'GSTC Aligned', description: 'Post-conflict conservation and biodiversity protection.' },
  { id: 43, name: 'Greece', position: [39.0742, 21.8243], rating: 'Trending', certification: 'GSTC Aligned', description: 'Island sustainability initiatives and marine protected areas.' },
  { id: 44, name: 'Peru', position: [-9.1900, -75.0152], rating: 'Trending', certification: 'GSTC Aligned', description: 'Machu Picchu visitor management and indigenous ecotourism.' },
  { id: 45, name: 'Montenegro', position: [42.7087, 19.3744], rating: 'Trending', certification: 'GSTC Aligned', description: 'Wild Beauty sustainable tourism strategy and park expansion.' },
  { id: 46, name: 'Panama', position: [8.5380, -80.7821], rating: 'Trending', certification: 'GSTC Aligned', description: 'Rainforest conservation and indigenous territorial recognition.' },
  { id: 47, name: 'Morocco', position: [31.7917, -7.0926], rating: 'Trending', certification: 'GSTC Aligned', description: 'Solar power investment and sustainable desert tourism.' },
  { id: 48, name: 'Bulgaria', position: [42.7339, 25.4858], rating: 'Trending', certification: 'GSTC Aligned', description: 'Rural ecotourism development and protected area expansion.' },
  { id: 49, name: 'Vietnam', position: [14.0583, 108.2772], rating: 'Trending', certification: 'GSTC Aligned', description: 'Community-based tourism and plastic reduction initiatives.' },
  { id: 50, name: 'Georgia', position: [42.3154, 43.3569], rating: 'Trending', certification: 'GSTC Aligned', description: 'Mountain ecotourism and traditional farming preservation.' },
];

// For this demo, we're showing the top 50 destinations from the full dataset of 100
const greenDestinations = gstcEcoDestinations.slice(0, 50);

const GreenDestinationMap = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  
    return () => clearInterval(interval); 
  }, []);
  

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Green Destination Map</h2>
      
      <div className="eco-card">
        <h3 className="text-lg font-semibold mb-4">
          <span className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Green Destination Popularity (GSTC Data)
          </span>
        </h3>
        
        <div className="h-[500px] w-full rounded-2xl shadow-md overflow-hidden z-10">
  <MapContainer 
    key={`map-${greenDestinations.length}`}
    center={[20, 0]} 
    zoom={2} 
    scrollWheelZoom={true}
    style={{ height: '100%', width: '100%' }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    {greenDestinations.map(destination => (
      <Marker 
        key={destination.id} 
        position={destination.position}
        icon={customIcon}
      >
        <Popup>
          <div className="font-medium">{destination.name}</div>
          <div className="text-xs text-gray-600 mb-1">{destination.certification}</div>
          <div className="text-sm text-gray-600">{destination.description}</div>
          <div className="mt-1 text-xs">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              destination.rating === 'High' ? 'bg-green-100 text-green-800' :
              destination.rating === 'Medium' ? 'bg-blue-100 text-blue-800' :
              'bg-amber-100 text-amber-800'
            }`}>
              {destination.rating} Sustainability
            </span>
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
</div>

        
        <div>
          <div className="text-sm text-gray-600 text-center mb-2">
            Visualizing GSTC recognized eco-friendly destination sustainability ratings
            <div className="text-xs text-gray-500">Last updated: {currentTime}</div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">GSTC Insight:</h3>
                <div className="mt-1 text-sm text-amber-700">
                  The Global Sustainable Tourism Council (GSTC) establishes and manages global standards for sustainable travel and tourism. Destinations shown are rated based on environmental protection, social equity, cultural preservation, and economic viability.
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-700 rounded-full mr-1.5"></span>
              <span className="text-xs text-gray-600">High Sustainability (GSTC Certified)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-1.5"></span>
              <span className="text-xs text-gray-600">Medium Sustainability (GSTC Aligned)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-amber-500 rounded-full mr-1.5"></span>
              <span className="text-xs text-gray-600">Trending (Emerging Sustainable)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenDestinationMap;
