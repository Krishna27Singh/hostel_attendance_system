import { X, CheckCircle, AlertTriangle, Check, Map } from 'lucide-react';

const SafetyMapModal = ({ 
  showSafetyMap, 
  setShowSafetyMap, 
  selectedCity, 
  cityCrimeData,
  getSafetyColor
}) => {
  if (!showSafetyMap) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-teal-600">
            {selectedCity} Safety Heatmap
          </h3>
          <button 
            onClick={() => setShowSafetyMap(false)}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close map"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="relative bg-gray-100 rounded-lg h-96 w-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Map className="mx-auto text-gray-400 mb-4" size={48} />
                  <h4 className="text-lg font-medium text-gray-500">Interactive Safety Map</h4>
                  <p className="text-gray-400 mt-1">
                    This would display a color-coded map showing safer (green) and higher-risk (red) areas in {selectedCity}
                  </p>
                </div>
              </div>
              
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-green-500 bg-opacity-40 rounded-full border-2 border-green-600"></div>
                <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-green-500 bg-opacity-40 rounded-full border-2 border-green-600"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-red-500 bg-opacity-40 rounded-full border-2 border-red-600"></div>
                <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-red-500 bg-opacity-40 rounded-full border-2 border-red-600"></div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-teal-600 mb-3 flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={18} />
                  Safe Areas (Green Zones)
                </h4>
                <ul className="space-y-3">
                  {cityCrimeData[selectedCity]?.safeAreas?.map((area, index) => (
                    <li key={index} className="flex items-start bg-green-50 p-3 rounded-lg">
                      <span className="bg-green-100 text-green-800 rounded-full p-1 mr-3 flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">{area.name}</span>
                        <span className="text-xs text-gray-600 mt-1">{area.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-red-600 mb-3 flex items-center">
                  <AlertTriangle className="mr-2 text-red-500" size={18} />
                  Higher-Risk Areas (Red Zones)
                </h4>
                <ul className="space-y-3">
                  {cityCrimeData[selectedCity]?.unsafeAreas?.map((area, index) => (
                    <li key={index} className="flex items-start bg-red-50 p-3 rounded-lg">
                      <span className="bg-red-100 text-red-800 rounded-full p-1 mr-3 flex-shrink-0">
                        <AlertTriangle className="h-3 w-3" />
                      </span>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">{area.name}</span>
                        <span className="text-xs text-gray-600 mt-1">{area.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <button 
            onClick={() => setShowSafetyMap(false)}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded transition-colors"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyMapModal;