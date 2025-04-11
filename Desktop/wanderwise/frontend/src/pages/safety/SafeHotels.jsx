import { Hotel, MapPin, Star, Bookmark, ChevronRight, Navigation } from 'lucide-react';

const SafeHotels = ({ selectedCity, cityCrimeData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
        <Hotel className="mr-2 text-teal-500" size={20} />
        Recommended Safe Hotels in {selectedCity}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cityCrimeData[selectedCity].hotels.map((hotel, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{hotel.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="mr-1" size={14} />
                  {hotel.location}
                </p>
              </div>
              <div className="flex items-center bg-teal-50 px-2 py-1 rounded">
                <Star className="fill-yellow-400 text-yellow-400 mr-1" size={14} />
                <span className="text-sm font-medium">{hotel.rating}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Safety Features:</h4>
              <ul className="space-y-1">
                {hotel.safetyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full p-0.5 mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Amenities:</h4>
              <div className="flex flex-wrap gap-1">
                {hotel.amenities.map((amenity, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium">{hotel.price}</span>
              <div className="flex space-x-2">
                <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded flex items-center">
                  <Bookmark className="mr-1" size={12} /> Save
                </button>
                <a 
                  href={hotel.link} 
                  className="text-xs bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded flex items-center"
                >
                  View <ChevronRight className="ml-1" size={12} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-teal-600 hover:text-teal-800 text-sm flex items-center justify-center mx-auto">
          <Navigation className="mr-1" size={14} />
          Show more safe accommodations
        </button>
      </div>
    </div>
  );
};

export default SafeHotels;