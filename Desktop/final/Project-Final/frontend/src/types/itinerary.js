export const TravelPreference = [
    'adventure',
    'relaxation',
    'culture',
    'nightlife',
    'nature',
    'art',
    'food'
  ];
  
  export const TravelPace = ['relaxed', 'moderate', 'busy'];
  
  export const TransportationType = [
    'walking',
    'bicycle',
    'car',
    'bus',
    'train',
    'plane'
  ];
  
  export const WeatherCondition = [
    'sunny',
    'cloudy',
    'rainy',
    'stormy',
    'snowy'
  ];
  
  export const ActivityType = [
    'sightseeing',
    'museum',
    'outdoors',
    'dining',
    'shopping',
    'entertainment',
    'relaxation',
    'freeTime'
  ];
  
  
  
  export const createLocation = () => ({
    id: '',
    name: '',
    address: '',
    lat: 0,
    lng: 0,
    description: '',
    imageUrl: ''
  });
  
  export const createActivity = () => ({
    id: '',
    title: '',
    type: '', 
    location: createLocation(),
    startTime: '',
    endTime: '',
    description: '',
    cost: 0,
    carbonFootprint: 0,
    weatherSensitive: false,
    alternativeActivities: []
  });
  
  export const createDay = () => ({
    id: '',
    date: '',
    activities: []
  });
  
  export const createTransportation = () => ({
    id: '',
    type: '', 
    from: createLocation(),
    to: createLocation(),
    departureTime: '',
    arrivalTime: '',
    cost: 0,
    carbonFootprint: 0
  });
  
  export const createAccommodation = () => ({
    id: '',
    name: '',
    location: createLocation(),
    checkIn: '',
    checkOut: '',
    cost: 0,
    carbonFootprint: 0
  });
  
  export const createBudget = () => ({
    total: 0,
    accommodations: 0,
    transportation: 0,
    activities: 0,
    food: 0,
    misc: 0
  });
  
  export const createTripPreferences = () => ({
    preferences: [],
    pace: '', 
    budget: createBudget()
  });
  
  export const createItinerary = () => ({
    id: '',
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    days: [],
    accommodations: [],
    transportations: [],
    preferences: createTripPreferences(),
    totalCarbonFootprint: 0
  });
  