import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    createItinerary,
    TravelPreference,
    TravelPace,
    createDay,
    createActivity,
    createAccommodation,
    createTransportation,
    createBudget,
    createTripPreferences,
    createLocation,
  } from '@/types/itinerary';
  

const ItineraryContext = createContext();

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

export const ItineraryProvider = ({ children }) => {
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [savedItineraries, setSavedItineraries] = useState([]);

  const getDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      days.push({
        id: uuidv4(),
        date: currentDate.toISOString().split('T')[0],
        activities: [],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const createNewItinerary = (title, destination, startDate, endDate, preferences) => {
    const newItinerary = {
      id: uuidv4(),
      title,
      destination,
      startDate,
      endDate,
      days: getDaysBetweenDates(startDate, endDate),
      accommodations: [],
      transportations: [],
      preferences,
      totalCarbonFootprint: 0,
    };

    setCurrentItinerary(newItinerary);
    return newItinerary;
  };

  const saveItinerary = (itinerary) => {
    setSavedItineraries([...savedItineraries, itinerary]);
  };

  const addDay = (date) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      days: [
        ...currentItinerary.days,
        { id: uuidv4(), date, activities: [] },
      ],
    });
  };

  const removeDay = (dayId) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      days: currentItinerary.days.filter((day) => day.id !== dayId),
    });
  };

  const addActivity = (dayId, activityData) => {
    if (!currentItinerary) return;

    const newActivity = { ...activityData, id: uuidv4() };

    setCurrentItinerary({
      ...currentItinerary,
      days: currentItinerary.days.map((day) =>
        day.id === dayId
          ? { ...day, activities: [...day.activities, newActivity] }
          : day
      ),
    });
  };

  const updateActivity = (dayId, updatedActivity) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      days: currentItinerary.days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: day.activities.map((activity) =>
                activity.id === updatedActivity.id ? updatedActivity : activity
              ),
            }
          : day
      ),
    });
  };

  const removeActivity = (dayId, activityId) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      days: currentItinerary.days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: day.activities.filter((activity) => activity.id !== activityId),
            }
          : day
      ),
    });
  };

  const reorderActivities = (dayId, activityIds) => {
    if (!currentItinerary) return;

    const day = currentItinerary.days.find((d) => d.id === dayId);
    if (!day) return;

    const reorderedActivities = activityIds
      .map((activityId) => day.activities.find((activity) => activity.id === activityId))
      .filter(Boolean);

    setCurrentItinerary({
      ...currentItinerary,
      days: currentItinerary.days.map((d) =>
        d.id === dayId
          ? { ...d, activities: reorderedActivities }
          : d
      ),
    });
  };

  const addAccommodation = (accommodationData) => {
    if (!currentItinerary) return;

    const newAccommodation = { ...accommodationData, id: uuidv4() };

    setCurrentItinerary({
      ...currentItinerary,
      accommodations: [...currentItinerary.accommodations, newAccommodation],
    });
  };

  const updateAccommodation = (updatedAccommodation) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      accommodations: currentItinerary.accommodations.map((accommodation) =>
        accommodation.id === updatedAccommodation.id ? updatedAccommodation : accommodation
      ),
    });
  };

  const removeAccommodation = (accommodationId) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      accommodations: currentItinerary.accommodations.filter(
        (accommodation) => accommodation.id !== accommodationId
      ),
    });
  };

  const addTransportation = (transportationData) => {
    if (!currentItinerary) return;

    const newTransportation = { ...transportationData, id: uuidv4() };

    setCurrentItinerary({
      ...currentItinerary,
      transportations: [...currentItinerary.transportations, newTransportation],
    });
  };

  const updateTransportation = (updatedTransportation) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      transportations: currentItinerary.transportations.map((transportation) =>
        transportation.id === updatedTransportation.id ? updatedTransportation : transportation
      ),
    });
  };

  const removeTransportation = (transportationId) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      transportations: currentItinerary.transportations.filter(
        (transportation) => transportation.id !== transportationId
      ),
    });
  };

  const updatePreferences = (preferences) => {
    if (!currentItinerary) return;

    setCurrentItinerary({
      ...currentItinerary,
      preferences,
    });
  };

  const calculateTotalCarbonFootprint = () => {
    if (!currentItinerary) return 0;

    const transportationFootprint = currentItinerary.transportations.reduce(
      (total, transport) => total + (transport.carbonFootprint || 0),
      0
    );

    const accommodationFootprint = currentItinerary.accommodations.reduce(
      (total, accommodation) => total + (accommodation.carbonFootprint || 0),
      0
    );

    const activitiesFootprint = currentItinerary.days.reduce(
      (dayTotal, day) =>
        dayTotal +
        day.activities.reduce(
          (activityTotal, activity) => activityTotal + (activity.carbonFootprint || 0),
          0
        ),
      0
    );

    const totalFootprint =
      transportationFootprint + accommodationFootprint + activitiesFootprint;

    setCurrentItinerary({
      ...currentItinerary,
      totalCarbonFootprint: totalFootprint,
    });

    return totalFootprint;
  };

  return (
    <ItineraryContext.Provider
      value={{
        currentItinerary,
        setCurrentItinerary,
        savedItineraries,
        saveItinerary,
        createNewItinerary,
        addDay,
        removeDay,
        addActivity,
        updateActivity,
        removeActivity,
        reorderActivities,
        addAccommodation,
        updateAccommodation,
        removeAccommodation,
        addTransportation,
        updateTransportation,
        removeTransportation,
        updatePreferences,
        calculateTotalCarbonFootprint,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};