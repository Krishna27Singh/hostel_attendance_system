
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Plus } from 'lucide-react';
import { useToast } from "../hooks/use-toast";

// Generate empty data structure with months from current month onwards
const generateEmptyYearlyData = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Create array with remaining months of the year
  const emptyData = [];
  for (let i = currentMonth; i < 12; i++) {
    emptyData.push({
      month: monthNames[i],
      actual: 0
    });
  }
  
  return emptyData;
};

const YearlySustainabilityProgress = () => {
  const [yearlyData, setYearlyData] = useState(() => {
    // Try to load data from localStorage or use empty data
    const savedData = localStorage.getItem('yearlyData');
    return savedData ? JSON.parse(savedData) : generateEmptyYearlyData();
  });
  
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    transportation: '',
    distance: '',
    electricity: '',
    meals: ''
  });
  
  const { toast } = useToast();

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('yearlyData', JSON.stringify(yearlyData));
  }, [yearlyData]);

  const calculateCarbonFootprint = () => {
    // Simple carbon footprint calculation
    // Transportation: 0.2kg CO2 per km
    // Electricity: 0.5kg CO2 per kWh
    // Meals: 3kg CO2 per non-veg meal, 1kg for vegetarian
    
    const transportEmission = newEntry.transportation === 'car' 
      ? parseFloat(newEntry.distance) * 0.2 
      : parseFloat(newEntry.distance) * 0.05; // public transport
      
    const electricityEmission = parseFloat(newEntry.electricity) * 0.5;
    
    const mealsEmission = newEntry.meals === 'non-veg' 
      ? 3 
      : newEntry.meals === 'vegetarian' ? 1 : 0;
    
    return transportEmission + electricityEmission + mealsEmission;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate carbon footprint
    const dailyCarbonFootprint = calculateCarbonFootprint();
    
    // Get month from selected date
    const date = new Date(newEntry.date);
    const month = date.toLocaleString('default', { month: 'short' });
    
    // Update the data for the corresponding month
    setYearlyData(prevData => {
      const newData = [...prevData];
      const monthIndex = newData.findIndex(item => item.month === month);
      
      if (monthIndex !== -1) {
        // Add to existing month (accumulate carbon footprint)
        newData[monthIndex] = {
          ...newData[monthIndex],
          actual: (newData[monthIndex].actual || 0) + dailyCarbonFootprint
        };
      }
      
      return newData;
    });
    
    // Show toast notification
    toast({
      title: "Entry Added",
      description: `Carbon footprint: ${dailyCarbonFootprint.toFixed(2)}kg CO2`,
    });
    
    // Reset form
    setShowForm(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      transportation: '',
      distance: '',
      electricity: '',
      meals: ''
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Yearly Sustainability Progress</h3>
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
              <h4 className="font-medium text-sm mb-4">Daily Sustainability Entry</h4>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Date</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="date"
                        value={newEntry.date}
                        onChange={handleInputChange}
                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Transportation Type</label>
                    <select
                      name="transportation"
                      value={newEntry.transportation}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                      required
                    >
                      <option value="">Select option</option>
                      <option value="car">Car</option>
                      <option value="public">Public Transport</option>
                      <option value="bike">Bicycle/Walking</option>
                    </select>
                  </div>
                  
                  {newEntry.transportation && newEntry.transportation !== 'bike' && (
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
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Electricity Used (kWh)</label>
                    <input
                      type="number"
                      name="electricity"
                      value={newEntry.electricity}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Meals</label>
                    <select
                      name="meals"
                      value={newEntry.meals}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                      required
                    >
                      <option value="">Select option</option>
                      <option value="non-veg">Non-vegetarian</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end space-x-3 mt-2">
                  <button
  type="button"
  onClick={() => setShowForm(false)}
  className="text-sm px-4 py-2 border rounded-md hover:bg-teal-100"
  style={{
    backgroundColor: '#FFFFFF', // White background
    color: '#14B8A6',           // Teal text color
    borderColor: '#14B8A6',     // Teal border
    borderRadius: '8px',        // Rounded corners
    padding: '10px 20px',       // Comfortable padding
    fontWeight: 'bold',         // Emphasized text
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  }}
>
  Cancel
</button>

<button
  type="submit"
  className="text-sm px-4 py-2 rounded-md hover:bg-teal-700"
  style={{
    backgroundColor: '#14B8A6', // Teal background color
    color: '#FFFFFF',           // White text color
    borderRadius: '8px',        // Rounded corners
    padding: '10px 20px',       // Comfortable padding
    fontWeight: 'bold',         // Emphasized text
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  }}
>
  Save Entry
</button>

                  </div>
                </div>
              </form>
            </div>
          )}
          
          <div className="h-[250px] mt-6">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={yearlyData}
      margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
    >
      <defs>
        <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#81E6D9" stopOpacity={0.8} /> {/* Lighter teal */}
          <stop offset="95%" stopColor="#319795" stopOpacity={0} /> {/* Darker teal */}
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="actual"
        stroke="#14B8A6" 
        fillOpacity={1}
        fill="url(#tealGradient)" 
        name="Carbon Footprint"
      />
    </AreaChart>
  </ResponsiveContainer>
</div>
   
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-medium text-sm mb-2">How we calculate your impact</h4>
            <p className="text-sm text-gray-600">
              Your carbon footprint is calculated based on your daily inputs for transportation (0.2kg CO2/km for car, 0.05kg CO2/km for public transport), 
              energy usage (0.5kg CO2 per kWh), and diet choices (3kg CO2 for non-veg meals, 1kg for vegetarian, 0kg for vegan).
              Every entry you add accumulates in the monthly total shown in the graph.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlySustainabilityProgress;
