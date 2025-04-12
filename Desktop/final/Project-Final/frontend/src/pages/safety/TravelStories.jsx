import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const TravelStories = ({ 
  stories,
  currentStoryIndex, 
  autoScroll,
  setAutoScroll,
  setCurrentStoryIndex,
  handleNextStory,
  handlePrevStory
}) => {
  // Logic to limit dots to 3
  const visibleDotIndices = (() => {
    const total = stories.length;
    if (total <= 3) return [...Array(total).keys()];
    if (currentStoryIndex === 0) return [0, 1, 2];
    if (currentStoryIndex === total - 1) return [total - 3, total - 2, total - 1];
    return [currentStoryIndex - 1, currentStoryIndex, currentStoryIndex + 1];
  })();

  // Get current story with fallbacks
  const currentStory = stories[currentStoryIndex] || {
    title: 'Story not found',
    location: '',
    content: '',
    author: 'Unknown',
    date: '',
    rating: 0
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-teal-600 mb-4">Travel Experiences</h2>
      
      <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center max-h-full overflow-y-auto">
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${i < currentStory.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-1">{currentStory.title}</h3>
            <p className="text-xs text-teal-600 mb-2">{currentStory.location}</p>
            <p className="text-gray-700 text-sm mb-2 italic line-clamp-5">
              "{currentStory.content}"
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>— {currentStory.author}</span>
              <span>{currentStory.date}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={handlePrevStory}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex gap-1 items-center">
          {visibleDotIndices[0] > 0 && <span className="text-gray-400 text-xs">...</span>}
          {visibleDotIndices.map((index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentStoryIndex(index);
                setAutoScroll(false);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStoryIndex ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            />
          ))}
          {visibleDotIndices[2] < stories.length - 1 && <span className="text-gray-400 text-xs">...</span>}
        </div>
        
        <button 
          onClick={handleNextStory}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <button 
          onClick={() => setAutoScroll(!autoScroll)}
          className="text-xs text-teal-600 hover:text-teal-800 flex items-center"
        >
          {autoScroll ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TravelStories;