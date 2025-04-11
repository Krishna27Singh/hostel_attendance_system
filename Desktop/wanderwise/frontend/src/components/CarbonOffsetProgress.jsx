
import React from 'react';

const carbonOffsetPrograms = [
  {
    id: 1,
    title: 'Gold Standard',
    description: 'Supports renewable energy projects worldwide',
    link: 'https://www.goldstandard.org/take-action/offset-your-emissions'
  },
  {
    id: 2,
    title: 'Carbon Fund',
    description: 'Funds reforestation and conservation projects',
    link: 'https://carbonfund.org/offset-your-carbon-footprint/'
  },
  {
    id: 3,
    title: 'Climate Action Reserve',
    description: 'Invests in verified emission reduction projects',
    link: 'https://www.climateactionreserve.org/'
  },
  {
    id: 4,
    title: 'Cool Effect',
    description: 'Supports high-quality carbon reduction projects globally',
    link: 'https://www.cooleffect.org/'
  },
  {
    id: 5,
    title: 'Terrapass',
    description: 'Provides offset solutions for individuals and businesses',
    link: 'https://terrapass.com/'
  },
  {
    id: 6,
    title: 'South Pole',
    description: 'Helps organizations reduce carbon footprint',
    link: 'https://www.southpole.com/sustainability-solutions/carbon-offsets'
  }
];

const CarbonOffsetPrograms = () => {
  const handleLearnMore = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Offset Your Impact</h2>
      
      <div className="eco-card">
        <h3 className="text-xl font-semibold mb-2">Carbon Offset Programs</h3>
        <p className="text-gray-600 mb-8">Support verified projects to neutralize your carbon footprint</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {carbonOffsetPrograms.map(program => (
            <div key={program.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2">{program.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                <button 
                className="text-teal-700 font-medium hover:text-teal-00 text-sm"
                onClick={() => handleLearnMore(program.link)}
>
  Learn More
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonOffsetPrograms;
