
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const transportOptions = [
  { value: 'flight', label: 'Flight', factor: 0.12 },
  { value: 'car', label: 'Car', factor: 0.17 },
  { value: 'train', label: 'Train', factor: 0.05 },
  { value: 'bus', label: 'Bus', factor: 0.07 },
  { value: 'ferry', label: 'Ferry', factor: 0.11 },
  { value: 'bicycle', label: 'Bicycle/Walking', factor: 0 }
];

const accommodationOptions = [
  { value: 'hotel', label: 'Standard Hotel', factor: 15 },
  { value: 'eco-hotel', label: 'Eco-certified Hotel', factor: 7 },
  { value: 'hostel', label: 'Hostel', factor: 5 },
  { value: 'camping', label: 'Camping', factor: 2 },
  { value: 'homestay', label: 'Local Homestay', factor: 4 }
];

const COLORS = ['#0F766E', '#14B8A6', '#2DD4BF', '#5EEAD4'];



const FootprintCalculator = ({ onCalculate }) => {
  const [transport, setTransport] = useState('');
  const [distance, setDistance] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState(null);

  const calculateFootprint = () => {
    if (!transport || !distance || !accommodation || !days || !people) {
      alert('Please fill in all fields');
      return;
    }

    const numPeople = parseInt(people, 10);
    const transportOption = transportOptions.find(option => option.value === transport);
    const accommodationOption = accommodationOptions.find(option => option.value === accommodation);
    
    const transportEmission = transportOption.factor * parseFloat(distance) * numPeople;
    const accommodationEmission = accommodationOption.factor * parseFloat(days) * numPeople;
    const foodEmission = 1.5 * parseFloat(days) * numPeople; // Estimating 1.5 kg CO2 per person per day for food
    const activitiesEmission = 0.8 * parseFloat(days) * numPeople; // Estimating 0.8 kg CO2 per person per day for activities
    
    const totalEmission = Math.round(transportEmission + accommodationEmission + foodEmission + activitiesEmission);
    
    setResult({
      transport: transportEmission,
      accommodation: accommodationEmission,
      food: foodEmission,
      activities: activitiesEmission,
      total: totalEmission
    });
    
    if (onCalculate) {
      onCalculate(totalEmission);
    }
  };

  const getBarChartData = () => {
    if (!result) return [];
    
    return [
      { name: 'Transportation', value: Math.round(result.transport) },
      { name: 'Accommodation', value: Math.round(result.accommodation) },
      { name: 'Food', value: Math.round(result.food) },
      { name: 'Activities', value: Math.round(result.activities) }
    ];
  };
  
  const getPieChartData = () => {
    if (!result) return [];
    
    return [
      { name: 'Transportation', value: Math.round(result.transport) },
      { name: 'Accommodation', value: Math.round(result.accommodation) },
      { name: 'Food', value: Math.round(result.food) },
      { name: 'Activities', value: Math.round(result.activities) }
    ];
  };

  const renderCustomizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180) * 1.1;
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180) * 1.1;
    
    // only showing label for segments with significant percentage
    if (percent < 0.05) return null;
    
    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={10}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="eco-card">
        <h2 className="text-xl font-bold mb-6">Enter Your Travel Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="transport">
              Mode of Transport
            </label>
            <select 
              id="transport" 
              className="eco-select"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            >
              <option value="">Select transport mode</option>
              {transportOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="distance">
              Distance (km)
            </label>
            <input 
              id="distance" 
              type="number" 
              className="eco-input" 
              placeholder="Enter distance in kilometers"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="accommodation">
              Accommodation Type
            </label>
            <select 
              id="accommodation" 
              className="eco-select"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
            >
              <option value="">Select accommodation type</option>
              {accommodationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="days">
              Number of Days
            </label>
            <input 
              id="days" 
              type="number" 
              className="eco-input" 
              placeholder="Enter number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="people">
              Number of People
            </label>
            <input 
              id="people" 
              type="number" 
              className="eco-input" 
              placeholder="Enter number of people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
            />
          </div>
          
          <button 
  className="eco-button w-full mt-4"
  style={{
    backgroundColor: '#14B8A6', 
    color: '#FFFFFF',         
    borderRadius: '8px',     
    padding: '10px 20px',   
    fontWeight: 'bold',      
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}
  onClick={calculateFootprint}
>
  Calculate Footprint
</button>

        </div>
      </div>
      
      <div className="eco-card">
        <h2 className="text-xl font-bold mb-6">Carbon Footprint</h2>
        
        {result ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-eco-700 mb-2">
                {result.total} kg
              </div>
              <p className="text-muted-foreground">CO₂ equivalent</p>
            </div>
            
            {/* Carbon Footprint Pie Chart */}
            <div className="h-[220px] mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getPieChartData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedPieLabel}
                  >
                    {getPieChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} kg CO₂`} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Bar Chart */}
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getBarChartData()} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value} kg CO₂`, 'Emissions']}
                    labelFormatter={() => ''}
                  />
                  <Bar dataKey="value" name="CO₂ Emissions">
                    {getBarChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <h3 className="font-medium text-amber-800 mb-1">Environmental Impact</h3>
              <p className="text-sm text-amber-700">
                This is equivalent to driving an average car for {Math.round(result.total / 0.17)} kilometers
                or the carbon absorbed by {Math.round(result.total / 22)} trees in one year.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground mb-4">
              Submit travel details to see your carbon footprint
            </p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default FootprintCalculator;
