
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Plus, ChevronDown, ChevronUp, Car, Plane, Bus, Train, Ship } from 'lucide-react';
import YearlySustainabilityProgress from './YearlySustainabilityProgress';
import { useToast } from "../hooks/use-toast";

const initialTransportData = [
  { name: 'Flight', emissions: 0, icon: Plane },
  { name: 'Train', emissions: 0, icon: Train },
  { name: 'Ferry', emissions: 0, icon: Ship },
  { name: 'Bus', emissions: 0, icon: Bus },
  { name: 'Car', emissions: 0, icon: Car },
];

const emissionFactors = {
  Flight: 0.255, // kg CO₂ per km
  Train: 0.041,
  Ferry: 0.19,
  Bus: 0.105,
  Car: 0.17,
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-blue-600">Amount: {payload[0].value} kg CO₂</p>
      </div>
    );
  }
  return null;
};

const allTips = [
  {
    title: "Choose rail travel",
    description: "Trains produce up to 10x fewer carbon emissions than flying."
  },
  {
    title: "Pack light",
    description: "Less weight means less fuel consumed during transport."
  },
  {
    title: "Use public transportation",
    description: "Shared transit reduces per-person emissions."
  },
  {
    title: "Stay in eco-certified accommodations",
    description: "Look for LEED, Green Key, or Green Globe certifications."
  },
  {
    title: "Support local businesses",
    description: "Reduces transport emissions and supports local economies."
  },
  {
    title: "Offset your travel emissions",
    description: "Consider investing in certified carbon offset projects to balance your travel footprint."
  },
  {
    title: "Choose direct flights",
    description: "Take-offs and landings consume the most fuel, so direct flights generally have lower emissions."
  },
  {
    title: "Slow travel",
    description: "Spend more time in fewer places to reduce your overall transportation emissions."
  },
  {
    title: "Bring reusable items",
    description: "Pack a water bottle, shopping bag, and utensils to reduce single-use plastic waste."
  },
  {
    title: "Use digital tickets",
    description: "Opt for mobile boarding passes and e-tickets to reduce paper waste."
  }
];

const SustainabilityProgress = () => {
  const [transportData, setTransportData] = useState(() => {
    const savedData = localStorage.getItem('transportData');
    return savedData ? JSON.parse(savedData) : initialTransportData;
  });
  
  const [showForm, setShowForm] = useState(false);
  const [showAllTips, setShowAllTips] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: '',
    distance: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('transportData', JSON.stringify(transportData));
  }, [transportData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEmissions = (type, distance) => {
    const factor = emissionFactors[type] || 0;
    return parseFloat(distance) * factor;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newEntry.type || !newEntry.distance) {
      toast({
        title: "Error",
        description: "Please select a transport type and enter distance",
        variant: "destructive"
      });
      return;
    }

    const emissions = calculateEmissions(newEntry.type, newEntry.distance);
    
    setTransportData(prevData => {
      const newData = [...prevData];
      const typeIndex = newData.findIndex(item => item.name === newEntry.type);
      
      if (typeIndex !== -1) {
        newData[typeIndex] = {
          ...newData[typeIndex],
          emissions: newData[typeIndex].emissions + emissions
        };
      }
      
      return newData;
    });
    
    toast({
      title: "Entry Added",
      description: `Added ${emissions.toFixed(2)} kg CO₂ from ${newEntry.type}`
    });
    
    setShowForm(false);
    setNewEntry({
      type: '',
      distance: ''
    });
  };

  const displayedTips = showAllTips ? allTips : allTips.slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Sustainability Progress</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Transport Comparison</h3>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full transition-colors"
            >
              <Plus size={16} className="mr-1.5" />
              Add Entry
            </button>
          </div>
          
          {showForm && (
            <div className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="font-medium text-sm mb-4">New Transport Entry</h4>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Transport Type</label>
                    <select
                      name="type"
                      value={newEntry.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                      required
                    >
                      <option value="">Select option</option>
                      <option value="Flight">Flight</option>
                      <option value="Train">Train</option>
                      <option value="Ferry">Ferry</option>
                      <option value="Bus">Bus</option>
                      <option value="Car">Car</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Distance (km)</label>
                    <input
                      type="number"
                      name="distance"
                      value={newEntry.distance}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end space-x-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-sm px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-700"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transportData} layout="vertical">
  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.2} />
  <XAxis type="number" tick={{ fontSize: 12 }} />
  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
  <Tooltip content={<CustomTooltip />} />
  <Bar dataKey="emissions" name="CO₂ Emissions" fill="#14B8A6">
    {transportData.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={index % 2 === 0 ? '#14B8A6' : '#0D9488'}
      />
    ))}
  </Bar>
</BarChart>

            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Add your daily transportation data to track and compare your carbon footprint across different transport methods.</p>
            <div className="mt-3 text-xs text-gray-500">
              <span className="font-medium">Calculation method:</span> We use the following emission factors (kg CO₂ per km):
              Flight: 0.255, Train: 0.041, Ferry: 0.19, Bus: 0.105, Car: 0.17
            </div>
          </div>
        </div>
        
        <YearlySustainabilityProgress />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <h3 className="text-lg font-semibold mb-4">Sustainable Travel Tips</h3>
        <div className="space-y-3 text-sm">
          {displayedTips.map((tip, index) => (
            <div key={index} className="pb-2 border-b border-gray-100">
              <span className="font-medium text-green-700">{tip.title}</span>
              <p className="text-gray-600 mt-1">{tip.description}</p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => setShowAllTips(!showAllTips)}
          className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          {showAllTips ? (
            <>
              Show fewer tips <ChevronUp size={16} className="ml-1" />
            </>
          ) : (
            <>
              Show more tips <ChevronDown size={16} className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SustainabilityProgress;