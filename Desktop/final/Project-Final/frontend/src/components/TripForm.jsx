import React, { useState } from 'react';
import { useItinerary } from '@/context/ItineraryContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchDestinations } from '@/services/api';

const TripForm = ({ onComplete }) => {
  const { createNewItinerary } = useItinerary();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationResults, setDestinationResults] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [preferences, setPreferences] = useState([]);
  const [pace, setPace] = useState('moderate');
  const [budget, setBudget] = useState({
    total: 1000,
    accommodations: 400,
    transportation: 300,
    activities: 200,
    food: 100,
    misc: 0,
  });

  const preferenceOptions = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'culture', label: 'Culture' },
    { value: 'nightlife', label: 'Nightlife' },
    { value: 'nature', label: 'Nature' },
    { value: 'art', label: 'Art' },
    { value: 'food', label: 'Food & Cuisine' },
  ];

  const paceOptions = [
    { value: 'relaxed', label: 'Relaxed (fewer activities per day)' },
    { value: 'moderate', label: 'Moderate (balanced schedule)' },
    { value: 'busy', label: 'Busy (maximize activities)' },
  ];

  const handleDestinationSearch = async (query) => {
    setDestination(query);
    if (query.length > 2) {
      try {
        const results = await searchDestinations(query);
        setDestinationResults(results.map((d) => ({ id: d.id, name: d.name })));
      } catch (error) {
        console.error('Error searching destinations:', error);
        setDestinationResults([]);
      }
    } else {
      setDestinationResults([]);
    }
  };

  const togglePreference = (preference) => {
    if (preferences.includes(preference)) {
      setPreferences(preferences.filter((p) => p !== preference));
    } else {
      setPreferences([...preferences, preference]);
    }
  };

  const handleBudgetChange = (category, value) => {
    const newBudget = { ...budget, [category]: value };
    newBudget.total =
      newBudget.accommodations +
      newBudget.transportation +
      newBudget.activities +
      newBudget.food +
      newBudget.misc;
    setBudget(newBudget);
  };

  const handleSubmit = () => {
    if (!startDate || !endDate || !destination) return;

    createNewItinerary(
      title || `Trip to ${destination}`,
      destination,
      format(startDate, 'yyyy-MM-dd'),
      format(endDate, 'yyyy-MM-dd'),
      {
        preferences,
        pace,
        budget,
      }
    );

    onComplete();
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Plan Your Trip</CardTitle>
              <CardDescription>
                Let's start by setting up the basic details of your trip.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Trip Name (Optional)</Label>
                <Input
                  id="title"
                  placeholder="Summer Vacation 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <Input
                    id="destination"
                    placeholder="Paris, Tokyo, New York..."
                    value={destination}
                    onChange={(e) => handleDestinationSearch(e.target.value)}
                    className="w-full"
                    required
                  />
                  {destinationResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                      <ul className="max-h-60 overflow-auto rounded-md py-1 text-sm">
                        {destinationResults.map((result) => (
                          <li
                            key={result.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDestination(result.name);
                              setDestinationResults([]);
                            }}
                          >
                            {result.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        disabled={(date) => date < new Date() || (endDate ? date > endDate : false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => startDate ? date < startDate : date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={nextStep}
                disabled={!destination || !startDate || !endDate}
              >
                Next
              </Button>
            </CardFooter>
          </>
        );

      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Travel Preferences</CardTitle>
              <CardDescription>
                Tell us what you're interested in for this trip.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>What are you interested in?</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {preferenceOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`
                        flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors
                        ${preferences.includes(option.value)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-gray-400'}
                      `}
                      onClick={() => togglePreference(option.value)}
                    >
                      <Checkbox
                        checked={preferences.includes(option.value)}
                        onCheckedChange={() => togglePreference(option.value)}
                      />
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Label>Travel Pace</Label>
                <div className="grid gap-3">
                  {paceOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`
                        flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors
                        ${pace === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-gray-400'}
                      `}
                      onClick={() => setPace(option.value)}
                    >
                      <Checkbox
                        checked={pace === option.value}
                        onCheckedChange={() => setPace(option.value)}
                      />
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Next</Button>
            </CardFooter>
          </>
        );

      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Budget Planning</CardTitle>
              <CardDescription>
                Set your budget for the trip to help us suggest appropriate activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="total">Total Budget</Label>
                  <span className="text-lg font-medium">${budget.total}</span>
                </div>
                <div>
                  {Object.entries(budget).map(([category, value]) => (
                    category !== 'total' && (
                      <div key={category} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <Label htmlFor={category} className="capitalize">
                            {category}
                          </Label>
                          <span>${value}</span>
                        </div>
                        <Input
                          id={category}
                          type="range"
                          min="0"
                          max={budget.total * 2}
                          value={value}
                          onChange={(e) => handleBudgetChange(category, parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button onClick={handleSubmit}>Create Itinerary</Button>
            </CardFooter>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between px-6 pt-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full
                ${i === step ? 'bg-primary' : i < step ? 'bg-primary/60' : 'bg-gray-300'}
              `}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          Step {step} of 3
        </span>
      </div>
      {renderStep()}
    </Card>
  );
};

export default TripForm;