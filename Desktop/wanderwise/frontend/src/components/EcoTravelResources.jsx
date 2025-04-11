
import React, { useState } from 'react';

const travelTips = {
  transport: [
    "Choose direct flights to reduce takeoffs and landings, which produce the most emissions",
    "Consider trains or buses for journeys under 500km",
    "Use public transportation or bike-sharing at your destination",
    "If renting a car, choose electric or hybrid vehicles",
    "Pack light to reduce fuel consumption on flights"
  ],
  accommodation: [
    "Stay at eco-certified hotels that implement sustainable practices",
    "Choose accommodations that use renewable energy sources",
    "Support locally owned homestays that benefit local communities",
    "Look for properties with water conservation systems",
    "Opt for places that use eco-friendly cleaning products"
  ],
  activities: [
    "Participate in wildlife tours that follow ethical guidelines",
    "Choose tour operators that contribute to local conservation efforts",
    "Engage in volunteer tourism that makes a positive impact",
    "Support businesses certified by sustainable tourism organizations",
    "Explore national parks that fund conservation through your visit"
  ]
};

const EcoTravelResources = () => {
  const [activeTab, setActiveTab] = useState('transport');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Eco-Travel Resources</h2>
      
      <div className="eco-card">
        <h3 className="text-xl font-semibold mb-2">Sustainable Travel Tips</h3>
        <p className="text-gray-600 mb-6">Practical ways to reduce your environmental impact while traveling</p>
        
        <div className="flex border-b mb-4">
          <button
            className={`eco-tab ${activeTab === 'transport' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('transport')}
          >
            Transport
          </button>
          <button
            className={`eco-tab ${activeTab === 'accommodation' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('accommodation')}
          >
            Accommodation
          </button>
          <button
            className={`eco-tab ${activeTab === 'activities' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
        </div>
        
        <ul className="space-y-3">
          {travelTips[activeTab].map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-eco-500 mr-2">•</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EcoTravelResources;
