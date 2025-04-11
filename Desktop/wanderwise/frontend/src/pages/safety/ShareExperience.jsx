import { Plus, Globe } from 'lucide-react';
import { useState } from 'react';
import { createStory } from './api'; 

const ShareExperience = ({ 
  showShareForm, 
  setShowShareForm,
  onStoryAdded
}) => {
  const [newExperience, setNewExperience] = useState({
    title: '',
    content: '',
    location: '',
    rating: 3,
    author: 'Anonymous'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmitExperience = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  
    try {
      const storyData = {
        title: newExperience.title,
        content: newExperience.content,
        location: newExperience.location,
        rating: parseInt(newExperience.rating),
        author: newExperience.author || 'Anonymous',
        date: new Date().toISOString()
      };
  
      const response = await createStory(storyData);
      
      // Reset form
      setNewExperience({
        title: '',
        content: '',
        location: '',
        rating: 3,
        author: ''
      });
      
      // Close the form
      setShowShareForm(false);
      
      // Call the onStoryAdded callback with the new story
      onStoryAdded({
        ...response.data,
        id: response.data.id || Date.now(),
        likes: 0,
        isLiked: false,
        isBookmarked: false,
        date: new Date().toLocaleDateString()
      });
    } catch (error) {
      console.error('Error creating story:', error);
      setError('Failed to submit your story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-teal-600">Share Your Experience</h2>
        <button 
          onClick={() => setShowShareForm(!showShareForm)}
          className="flex items-center text-sm bg-teal-500 hover:bg-teal-600 text-white px-2 py-1 rounded transition"
          disabled={isSubmitting}
        >
          <Plus className="mr-1" size={14} />
          {showShareForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {showShareForm ? (
        <form onSubmit={handleSubmitExperience} className="space-y-3">
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newExperience.title}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring focus:ring-teal-200 text-sm"
            required
            disabled={isSubmitting}
          />
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={newExperience.location}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring focus:ring-teal-200 text-sm"
            required
            disabled={isSubmitting}
          />
          <textarea
            placeholder="Share your experience..."
            name="content"
            value={newExperience.content}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring focus:ring-teal-200 text-sm"
            required
            disabled={isSubmitting}
          />
          <div className="flex items-center gap-3">
            <select
              name="rating"
              value={newExperience.rating}
              onChange={handleInputChange}
              className="px-3 py-1 border border-gray-300 rounded focus:ring focus:ring-teal-200 text-sm"
              required
              disabled={isSubmitting}
            >
              <option value="">Safety Rating</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{`${num} Star${num !== 1 ? 's' : ''}`}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Your Name (optional)"
              name="author"
              value={newExperience.author}
              onChange={handleInputChange}
              className="flex-grow px-3 py-1 border border-gray-300 rounded focus:ring focus:ring-teal-200 text-sm"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-1.5 rounded text-sm flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Share Experience'
            )}
          </button>
        </form>
      ) : (
        <div className="text-center text-gray-500">
          <Globe className="mx-auto mb-2 text-gray-400" size={20} />
          <p className="text-sm">Share your travel experience to help other women stay safe</p>
        </div>
      )}
    </div>
  );
};

export default ShareExperience;