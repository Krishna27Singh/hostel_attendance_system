
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mx-auto mb-6">
          <span className="text-4xl font-bold">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-teal flex items-center gap-2">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
