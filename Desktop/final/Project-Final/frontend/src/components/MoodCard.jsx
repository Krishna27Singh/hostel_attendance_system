
import React from 'react';

const MoodCard = ({ icon, title, color }) => {
  return (
    <div className="card-hover flex flex-col items-center p-5 bg-white rounded-xl shadow">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <span className="font-medium text-sm text-gray-700">{title}</span>
    </div>
  );
};

export default MoodCard;
