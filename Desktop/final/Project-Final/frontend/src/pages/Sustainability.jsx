import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import FootprintCalculator from '../components/FootprintCalculator';
import SustainabilityProgress from '../components/SustainabilityProgress';
import GreenDestinationMap from '../components/GreenDestinationMap';
import CustomSustainabilityGoals from '../components/CustomSustainabilityGoals';
import { toast } from '@/components/ui/use-toast';
import CarbonOffsetPrograms from '../components/CarbonOffsetProgress';

const Sustainability = () => {
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const handleCalculateFootprint = (value) => {
    setCarbonFootprint(value);
    toast({
      title: "Carbon Footprint Calculated",
      description: `Your travel will generate approximately ${value} kg of CO₂. Consider offsetting your impact!`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 fixed top-0 left-0 h-screen bg-white shadow z-10">
        <Sidebar />
      </aside>

      {/* Main Content shifted to right of fixed sidebar */}
      <main className="ml-64 flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Sustainable Travel Tracker</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Monitor and reduce your environmental impact while exploring the world. Calculate your carbon footprint,
              set goals, and explore eco-friendly destinations.
            </p>
          </section>

          {/* Stacked Components with Full Width */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow p-6">
              <FootprintCalculator onCalculate={handleCalculateFootprint} />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <CustomSustainabilityGoals />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <SustainabilityProgress />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <GreenDestinationMap />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <CarbonOffsetPrograms/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sustainability;
