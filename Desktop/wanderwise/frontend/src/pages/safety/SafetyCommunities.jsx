import { Shield, Info, CheckCircle, Star, Check, Quote } from 'lucide-react';

const SafetyCommunities = () => {
  return (
    <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
      <h3 className="font-medium text-teal-800 flex items-center mb-3">
        <Shield className="mr-2" size={16} />
        Women's Travel Safety
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white p-3 rounded-lg border border-teal-200">
          <div className="flex items-start">
            <Quote className="text-teal-400 mr-2 flex-shrink-0" size={14} />
            <p className="text-sm italic text-gray-700">
              "Your safety comes first. Trust your instincts - if something doesn't feel right, it probably isn't."
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-teal-100 p-1.5 rounded-full mr-3 flex-shrink-0">
            <Info className="text-teal-600" size={14} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-1">Safety First</h4>
            <p className="text-xs text-gray-600">
              Always share your itinerary with someone you trust and check in regularly.
            </p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-teal-200">
          <div className="flex items-start">
            <Star className="text-yellow-400 mr-2 flex-shrink-0" size={14} />
            <p className="text-sm text-gray-700">
              You have the right to feel safe wherever you go. Don't hesitate to set boundaries and speak up.
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default SafetyCommunities;