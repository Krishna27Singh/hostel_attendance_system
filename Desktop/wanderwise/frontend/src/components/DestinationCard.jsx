import React from 'react';
import { Button } from '@/components/ui/button';

const DestinationCard = ({ image, title, location, rating, price, isFeatured }) => {
  const cardClass = isFeatured
    ? 'bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 transform scale-110'
    : 'bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105';

  return (
    <div className={cardClass}>
      {/* Image Section */}
      <div className="relative">
        <img
          src={image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
          alt={title || "Unknown"}
          className="w-full h-48 object-cover"
        />
        {/* Rating Badge */}
        {rating != null && (
          <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full px-3 py-1 text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.929c.3-.921 1.603-.921 1.903 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.835 2.03a1 1 0 00-.264.872l.852 3.241c.324 1.235-.707 2.153-1.751 1.297l-2.385-1.51a1 1 0 00-1.272 0l-2.385 1.51c-1.044.856-2.075-.062-1.751-1.297l.852-3.241a1 1 0 00-.264-.872L2.909 9.52c-.783-.57-1.185-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
            {rating}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800">{title || "Unknown"}</h3>
        <p className="text-sm text-gray-600 mb-2">{location || "Unknown Location"}</p>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-teal-600 font-medium">{price || "N/A"}</span>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
