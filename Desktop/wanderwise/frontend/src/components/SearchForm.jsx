import { useState } from 'react';
import { Search, Calendar, Users, MapPin, Filter } from 'lucide-react';

const SearchForm = ({ type, className = '' }) => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', { type, destination, dates, guests });
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Destination Input */}
        <div className="space-y-2">
          <label htmlFor={`${type}-destination`} className="text-sm font-medium">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 h-4 w-4" />
            <input
              id={`${type}-destination`}
              type="text"
              placeholder={type === 'hotels' ? 'Where are you going?' : type === 'flights' ? 'Where to?' : 'What do you want to do?'}
              className="pl-9 w-full border rounded-md p-2"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        {/* Dates Input */}
        <div className="space-y-2">
          <label htmlFor={`${type}-dates`} className="text-sm font-medium">
            {type === 'flights' ? 'Departure / Return' : 'Check-in / Check-out'}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 h-4 w-4" />
            <input
              id={`${type}-dates`}
              type="text"
              placeholder="Add dates"
              className="pl-9 w-full border rounded-md p-2"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>
        </div>

        {/* Guests Input */}
        <div className="space-y-2">
          <label htmlFor={`${type}-guests`} className="text-sm font-medium">
            {type === 'flights' ? 'Passengers' : 'Guests'}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 h-4 w-4" />
            <input
              id={`${type}-guests`}
              type="text"
              placeholder={type === 'flights' ? 'Add passengers' : 'Add guests'}
              className="pl-9 w-full border rounded-md p-2"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 transition-colors text-white h-10 flex justify-center items-center rounded-md">
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-teal-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="h-4 w-4 text-teal-600 mr-2" />
          <span className="text-sm font-medium text-teal-800">Filters</span>
        </div>
        <div className="flex space-x-2">
          <button className="text-xs h-8 border border-teal-200 text-teal-700 px-3 rounded-md hover:bg-teal-100">
            {type === 'hotels' ? 'Price range' : type === 'flights' ? 'Airlines' : 'Categories'}
          </button>
          <button className="text-xs h-8 border border-teal-200 text-teal-700 px-3 rounded-md hover:bg-teal-100">
            {type === 'hotels' ? 'Amenities' : type === 'flights' ? 'Stops' : 'Price'}
          </button>
          <button className="text-xs h-8 border border-teal-200 text-teal-700 px-3 rounded-md hover:bg-teal-100">
            {type === 'hotels' ? 'Rating' : type === 'flights' ? 'Duration' : 'Rating'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
