
import React, { useState, useEffect } from 'react';
import { Plus, Leaf, Zap, Droplet, Recycle, ShoppingBag, Home, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const presetGoals = [
  { id: 1, category: 'carbon', label: 'Reduce carbon footprint by 500 kg', target: 500, unit: 'kg', icon: Zap },
  { id: 2, category: 'water', label: 'Save 1000 liters of water', target: 1000, unit: 'liters', icon: Droplet },
  { id: 3, category: 'waste', label: 'Reduce waste by 100 kg', target: 100, unit: 'kg', icon: Recycle },
  { id: 4, category: 'planting', label: 'Plant 10 trees', target: 10, unit: 'trees', icon: Leaf },
  { id: 5, category: 'shopping', label: 'Make 20 sustainable purchases', target: 20, unit: 'items', icon: ShoppingBag },
  { id: 6, category: 'energy', label: 'Save 200 kWh of energy', target: 200, unit: 'kWh', icon: Home },
  { id: 7, category: 'travel', label: 'Travel 500 km sustainably', target: 500, unit: 'km', icon: Globe }
];

const activities = [
  {
    category: 'carbon',
    items: [
      { id: 'c1', label: 'Took public transportation', value: 5, unit: 'kg', inputType: 'days' },
      { id: 'c2', label: 'Walked or biked instead of driving', value: 3, unit: 'kg', inputType: 'km' },
      { id: 'c3', label: 'Carpooled with others', value: 2, unit: 'kg', inputType: 'days' },
      { id: 'c4', label: 'Worked remotely (avoided commuting)', value: 7, unit: 'kg', inputType: 'days' },
      { id: 'c5', label: 'Reduced electricity usage', value: 2, unit: 'kg', inputType: 'hours' },
      { id: 'c6', label: 'Used renewable energy sources', value: 10, unit: 'kg', inputType: 'days' }
    ]
  },
  {
    category: 'waste',
    items: [
      { id: 'w1', label: 'Recycled household waste', value: 2, unit: 'kg', inputType: 'kg' },
      { id: 'w2', label: 'Composted organic waste', value: 3, unit: 'kg', inputType: 'kg' },
      { id: 'w3', label: 'Avoided single-use plastics', value: 0.5, unit: 'kg', inputType: 'items' },
      { id: 'w4', label: 'Donated or reused items', value: 5, unit: 'kg', inputType: 'items' },
      { id: 'w5', label: 'Used a reusable water bottle', value: 0.2, unit: 'kg', inputType: 'days' },
      { id: 'w6', label: 'Bought items with minimal packaging', value: 1, unit: 'kg', inputType: 'items' }
    ]
  },
  {
    category: 'water',
    items: [
      { id: 'wa1', label: 'Fixed a leaking tap', value: 20, unit: 'liters', inputType: 'taps' },
      { id: 'wa2', label: 'Used water-efficient appliances', value: 50, unit: 'liters', inputType: 'uses' },
      { id: 'wa3', label: 'Collected rainwater for plants', value: 10, unit: 'liters', inputType: 'liters' },
      { id: 'wa4', label: 'Reduced shower time', value: 10, unit: 'liters', inputType: 'minutes' },
      { id: 'wa5', label: 'Watered plants in early morning/evening', value: 5, unit: 'liters', inputType: 'days' }
    ]
  },
  {
    category: 'planting',
    items: [
      { id: 'p1', label: 'Planted trees', value: 1, unit: 'trees', inputType: 'trees' },
      { id: 'p2', label: 'Maintained a garden or green space', value: 0.2, unit: 'trees', inputType: 'days' },
      { id: 'p3', label: 'Participated in community cleanup', value: 0.5, unit: 'trees', inputType: 'hours' },
      { id: 'p4', label: 'Reduced lawn mowing to save fuel', value: 0.1, unit: 'trees', inputType: 'times' },
      { id: 'p5', label: 'Supported reforestation initiatives', value: 1, unit: 'trees', inputType: 'donations' }
    ]
  },
  {
    category: 'shopping',
    items: [
      { id: 's1', label: 'Bought locally produced food/goods', value: 1, unit: 'items', inputType: 'items' },
      { id: 's2', label: 'Opted for eco-friendly products', value: 1, unit: 'items', inputType: 'items' },
      { id: 's3', label: 'Chose sustainable fashion/clothing', value: 2, unit: 'items', inputType: 'items' },
      { id: 's4', label: 'Purchased second-hand items', value: 3, unit: 'items', inputType: 'items' },
      { id: 's5', label: 'Avoided fast fashion purchases', value: 2, unit: 'items', inputType: 'times' }
    ]
  },
  {
    category: 'energy',
    items: [
      { id: 'e1', label: 'Used energy-efficient appliances', value: 5, unit: 'kWh', inputType: 'days' },
      { id: 'e2', label: 'Installed a smart thermostat', value: 20, unit: 'kWh', inputType: 'devices' },
      { id: 'e3', label: 'Reduced heating/air conditioning', value: 10, unit: 'kWh', inputType: 'days' },
      { id: 'e4', label: 'Turned off standby power', value: 2, unit: 'kWh', inputType: 'devices' },
      { id: 'e5', label: 'Scheduled maintenance of appliances', value: 15, unit: 'kWh', inputType: 'appliances' }
    ]
  },
  {
    category: 'travel',
    items: [
      { id: 't1', label: 'Stayed in eco-friendly accommodations', value: 20, unit: 'km', inputType: 'nights' },
      { id: 't2', label: 'Chose eco-friendly travel options', value: 50, unit: 'km', inputType: 'trips' },
      { id: 't3', label: 'Avoided flying (used virtual meetings)', value: 100, unit: 'km', inputType: 'flights' },
      { id: 't4', label: 'Used public transportation while traveling', value: 30, unit: 'km', inputType: 'days' }
    ]
  }
];

const CustomSustainabilityGoals = () => {
  const [userGoals, setUserGoals] = useState([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activeGoalIndex, setActiveGoalIndex] = useState(0);
  const [newGoal, setNewGoal] = useState({
    category: 'carbon',
    custom: false,
    customLabel: '',
    target: 100,
    unit: 'kg',
  });
  const [activityData, setActivityData] = useState({
    activity: '',
    amount: 1
  });

  // Load goals from localStorage when component mounts
  useEffect(() => {
    const savedGoals = localStorage.getItem('sustainabilityGoals');
    if (savedGoals) {
      // Parse saved goals and restore icon functions
      const parsedGoals = JSON.parse(savedGoals).map(goal => {
        return {
          ...goal,
          icon: getIconForCategory(goal.category)
        };
      });
      setUserGoals(parsedGoals);
    } else {
      // Initialize with a default goal if no saved goals
      setUserGoals([
        { ...presetGoals[0], progress: 0, activities: [] }
      ]);
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    if (userGoals.length > 0) {
      // Remove icon function before saving (can't serialize functions)
      const goalsToSave = userGoals.map(goal => {
        const { icon, ...goalWithoutIcon } = goal;
        return goalWithoutIcon;
      });
      localStorage.setItem('sustainabilityGoals', JSON.stringify(goalsToSave));
    }
  }, [userGoals]);

  const handleAddGoal = () => {
    const selectedPreset = presetGoals.find(goal => goal.category === newGoal.category);
    
    const goalToAdd = newGoal.custom 
      ? {
          id: Date.now(),
          category: newGoal.category,
          label: newGoal.customLabel,
          target: parseInt(newGoal.target, 10),
          unit: newGoal.unit,
          progress: 0,
          activities: [],
          icon: getIconForCategory(newGoal.category)
        }
      : {
          ...selectedPreset,
          id: Date.now(),
          progress: 0,
          activities: []
        };
    
    setUserGoals([...userGoals, goalToAdd]);
    setShowGoalForm(false);
    setNewGoal({
      category: 'carbon',
      custom: false,
      customLabel: '',
      target: 100,
      unit: 'kg',
    });
  };

  const handleAddActivity = () => {
    if (!activityData.activity) return;
    
    const currentGoal = userGoals[activeGoalIndex];
    const activityInfo = activities
      .find(cat => cat.category === currentGoal.category)
      ?.items.find(item => item.id === activityData.activity);
    
    if (!activityInfo) return;
    
    const activityImpact = activityInfo.value * parseInt(activityData.amount, 10);
    const newProgress = currentGoal.progress + activityImpact;
    
    const newActivity = {
      id: Date.now(),
      activityId: activityData.activity,
      label: activityInfo.label,
      amount: parseInt(activityData.amount, 10),
      impact: activityImpact,
      date: new Date().toISOString(),
      inputType: activityInfo.inputType
    };
    
    const updatedGoals = [...userGoals];
    updatedGoals[activeGoalIndex] = {
      ...currentGoal,
      progress: newProgress,
      activities: [newActivity, ...currentGoal.activities]
    };
    
    setUserGoals(updatedGoals);
    setShowActivityForm(false);
    setActivityData({ activity: '', amount: 1 });
  };

  const getIconForCategory = (category) => {
    switch(category) {
      case 'carbon': return Zap;
      case 'water': return Droplet;
      case 'waste': return Recycle;
      case 'planting': return Leaf;
      case 'shopping': return ShoppingBag;
      case 'energy': return Home;
      case 'travel': return Globe;
      default: return Leaf;
    }
  };

  const getCategoryActivities = (category) => {
    return activities.find(cat => cat.category === category)?.items || [];
  };

  const getProgressColor = (progress, target) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 50) return 'bg-green-400';
    if (percentage >= 25) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getProgressStatus = (progress, target) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 90) return 'On Track';
    if (percentage >= 50) return 'Making Progress';
    if (percentage >= 25) return 'Getting Started';
    return 'Needs Attention';
  };

  const generateChartData = (activities, target) => {
    if (!activities || activities.length === 0) {
      return [
        { date: 'Day 1', progress: 0, target: target / 5 },
        { date: 'Day 2', progress: 0, target: target * 2 / 5 },
        { date: 'Day 3', progress: 0, target: target * 3 / 5 },
        { date: 'Day 4', progress: 0, target: target * 4 / 5 },
        { date: 'Day 5', progress: 0, target: target }
      ];
    }

    // Sort activities by date
    const sortedActivities = [...activities].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Generate data points with cumulative progress
    const data = [];
    let cumulativeProgress = 0;
    
    sortedActivities.forEach((activity, index) => {
      cumulativeProgress += activity.impact;
      const dateLabel = new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      data.push({
        date: dateLabel,
        progress: cumulativeProgress,
        target: target * (index + 1) / sortedActivities.length
      });
    });
    
    return data;
  };

  const IconComponent = ({ icon: Icon }) => {
    return <Icon size={20} />;
  };

  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-xs">
          <p className="font-medium">{label}</p>
          <p className="text-eco-600">Progress: {payload[0].value}</p>
          <p className="text-gray-500">Target: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sustainability Goals</h2>
        <button 
  className="eco-button flex items-center gap-1"
  style={{
    backgroundColor: '#14B8A6', // Teal color for eco-friendly branding
    color: '#FFFFFF',          // White text for clarity
    borderRadius: '8px',       // Rounded corners for modern design
    padding: '10px 20px',      // Comfortable padding
    fontWeight: 'bold',        // Emphasized text
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
  }}
  onClick={() => setShowGoalForm(true)}
>
  <Plus size={16} />
  <span>Add Goal</span>
</button>

      </div>
      
      {showGoalForm && (
        <div className="eco-card">
          <h3 className="text-lg font-semibold mb-4">Create New Goal</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Goal Category</label>
              <select 
                className="eco-select" 
                value={newGoal.category}
                onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
              >
                <option value="carbon">Carbon Reduction</option>
                <option value="water">Water Conservation</option>
                <option value="waste">Waste Management</option>
                <option value="planting">Tree Planting</option>
                <option value="shopping">Sustainable Shopping</option>
                <option value="energy">Energy Efficiency</option>
                <option value="travel">Sustainable Travel</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="customGoal" 
                className="mr-2"
                checked={newGoal.custom}
                onChange={(e) => setNewGoal({...newGoal, custom: e.target.checked})}
              />
              <label htmlFor="customGoal">Create custom goal</label>
            </div>
            
            {newGoal.custom ? (
              <div>
                <label className="block text-sm font-medium mb-1">Goal Description</label>
                <input 
                  type="text" 
                  className="eco-input" 
                  placeholder="E.g., Reduce my carbon footprint by 500 kg"
                  value={newGoal.customLabel}
                  onChange={(e) => setNewGoal({...newGoal, customLabel: e.target.value})}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">Preset Goal</label>
                <select 
                  className="eco-select"
                  value={presetGoals.find(goal => goal.category === newGoal.category)?.id || ''}
                  onChange={(e) => {
                    const selected = presetGoals.find(goal => goal.id === parseInt(e.target.value));
                    if (selected) {
                      setNewGoal({
                        ...newGoal,
                        category: selected.category,
                        unit: selected.unit
                      });
                    }
                  }}
                >
                  {presetGoals
                    .filter(goal => goal.category === newGoal.category)
                    .map(goal => (
                      <option key={goal.id} value={goal.id}>{goal.label}</option>
                    ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">Target Value</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  className="eco-input" 
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  min="1"
                />
                <select 
                  className="eco-select w-1/3"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                >
                  <option value="kg">kg (CO₂)</option>
                  <option value="liters">liters</option>
                  <option value="trees">trees</option>
                  <option value="items">items</option>
                  <option value="kWh">kWh</option>
                  <option value="km">km</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
            <button 
  className="eco-button-secondary"
  style={{
    backgroundColor: '#14B8A6', // Teal color
    color: '#FFFFFF',           // White text
    borderRadius: '8px',        // Rounded corners
    padding: '10px 20px',       // Comfortable padding
    fontWeight: 'bold',         // Emphasized text
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
  }}
  onClick={() => setShowGoalForm(false)}
>
  Cancel
</button>

<button 
  className="eco-button"
  style={{
    backgroundColor: '#14B8A6', // Teal color
    color: '#FFFFFF',           // White text
    borderRadius: '8px',        // Rounded corners
    padding: '10px 20px',       // Comfortable padding
    fontWeight: 'bold',         // Emphasized text
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
  }}
  onClick={handleAddGoal}
>
  Create Goal
</button>

            </div>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {userGoals.map((goal, index) => (
          <div key={goal.id} className="eco-card">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-eco-100 text-eco-600">
                  <IconComponent icon={goal.icon || getIconForCategory(goal.category)} />
                </span>
                <h3 className="text-lg font-semibold">{goal.label}</h3>
              </div>
              <button 
  className="eco-button-small"
  style={{
    backgroundColor: '#14B8A6', // Teal color
    color: '#FFFFFF',           // White text
    borderRadius: '8px',        // Rounded corners
    padding: '10px 20px',       // Comfortable padding
    fontWeight: 'bold',         // Emphasized text
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
  }}
  onClick={() => {
    setActiveGoalIndex(index);
    setShowActivityForm(true);
  }}
>
  Log Activity
</button>

            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{goal.progress} of {goal.target} {goal.unit}</span>
                <span className="text-sm text-gray-500">{Math.round((goal.progress / goal.target) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getProgressColor(goal.progress, goal.target)}`}
                  style={{ width: `${Math.min(100, (goal.progress / goal.target) * 100)}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  goal.progress / goal.target >= 0.5 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {getProgressStatus(goal.progress, goal.target)}
                </span>
              </div>
            </div>
            
            {/* Progress Chart */}
            <div className="h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generateChartData(goal.activities, goal.target)}>
                  <defs>
                    <linearGradient id={`colorProgress${goal.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill={`url(#colorProgress${goal.id})`} 
                    name="Progress"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#94A3B8" 
                    fill="none" 
                    strokeDasharray="3 3" 
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {goal.activities.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-2">Recent Activities</h4>
                <div className="space-y-2 max-h-40 overflow-auto">
                  {goal.activities.slice(0, 4).map(activity => (
                    <div key={activity.id} className="text-sm bg-gray-50 p-2 rounded flex justify-between">
                      <span>{activity.label} ({activity.amount} {activity.inputType})</span>
                      <span className="font-semibold">+{activity.impact} {goal.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showActivityForm && activeGoalIndex !== null && (
        <div className="eco-card">
          <h3 className="text-lg font-semibold mb-4">Log Activity for {userGoals[activeGoalIndex].label}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Activity</label>
              <select 
                className="eco-select" 
                value={activityData.activity}
                onChange={(e) => setActivityData({...activityData, activity: e.target.value})}
              >
                <option value="">Select an activity</option>
                {getCategoryActivities(userGoals[activeGoalIndex].category).map(activity => (
                  <option key={activity.id} value={activity.id}>
                    {activity.label} (+{activity.value} {userGoals[activeGoalIndex].unit} per {activity.inputType})
                  </option>
                ))}
              </select>
            </div>
            
            {activityData.activity && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount ({activities
                    .find(cat => cat.category === userGoals[activeGoalIndex].category)
                    ?.items.find(item => item.id === activityData.activity)?.inputType || 'units'})
                </label>
                <input 
                  type="number" 
                  className="eco-input" 
                  value={activityData.amount}
                  onChange={(e) => setActivityData({...activityData, amount: Math.max(1, parseInt(e.target.value, 10) || 1)})}
                  min="1"
                />
              </div>
            )}
            
            <div className="flex justify-end gap-2 mt-4">
              <button 
                className="eco-button-secondary"
                onClick={() => setShowActivityForm(false)}
              >
                Cancel
              </button>
              <button 
                className="eco-button"
                onClick={handleAddActivity}
                disabled={!activityData.activity}
              >
                Log Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSustainabilityGoals;
