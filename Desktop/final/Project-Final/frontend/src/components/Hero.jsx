import { useState } from 'react';
import { Calendar, MapPin, Search, Plane, Hotel, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Hero = () => {
  const [destinationValue, setDestinationValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [guestsValue, setGuestsValue] = useState('');

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundAttachment: "fixed" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-teal-800/40"></div>
      </div>

      

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="block">Discover the World with</span>
            <span className="text-teal-300">WanderWise</span>
          </h1>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Experience unforgettable journeys with personalized travel recommendations tailored to your style, preferences, and budget.
          </p>

          {/* Search Form */}
          <div 
            className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden mt-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Tabs defaultValue="hotels" className="w-full">
              <TabsList className="grid grid-cols-3 bg-teal-50/80">
                <TabsTrigger value="hotels" className="data-[state=active]:bg-white">
                  <Hotel className="h-4 w-4 mr-2" /> Hotels
                </TabsTrigger>
                <TabsTrigger value="flights" className="data-[state=active]:bg-white">
                  <Plane className="h-4 w-4 mr-2" /> Flights
                </TabsTrigger>
                <TabsTrigger value="packages" className="data-[state=active]:bg-white">
                  <Users className="h-4 w-4 mr-2" /> Packages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotels" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input 
                        id="destination" 
                        placeholder="Where are you going?" 
                        className="pl-10"
                        value={destinationValue}
                        onChange={(e) => setDestinationValue(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dates">Check-in / Check-out</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input 
                        id="dates" 
                        placeholder="Add dates" 
                        className="pl-10"
                        value={dateValue}
                        onChange={(e) => setDateValue(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input 
                        id="guests" 
                        placeholder="Add guests" 
                        className="pl-10"
                        value={guestsValue}
                        onChange={(e) => setGuestsValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Hotels
                </Button>
              </TabsContent>

              <TabsContent value="flights" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input id="origin" placeholder="Origin city" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flight-destination">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input id="flight-destination" placeholder="Destination city" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flight-dates">Departure / Return</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input id="flight-dates" placeholder="Add dates" className="pl-10" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Flights
                </Button>
              </TabsContent>

              <TabsContent value="packages" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="package-destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input id="package-destination" placeholder="Where to?" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="package-dates">Trip Dates</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input id="package-dates" placeholder="Add dates" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="travelers">Travelers</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 h-5 w-5" />
                      <Input id="travelers" placeholder="Add travelers" className="pl-10" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Packages
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Floating badges */}
          <div className="hidden md:flex absolute -bottom-16 left-0 right-0 justify-center space-x-6">
            <div className="glass-card px-4 py-3 rounded-full flex items-center animate-float" style={{ animationDelay: "0s" }}>
              <span className="text-sm font-medium text-teal-800">24/7 Support</span>
            </div>
            <div className="glass-card px-4 py-3 rounded-full flex items-center animate-float" style={{ animationDelay: "0.5s" }}>
              <span className="text-sm font-medium text-teal-800">Best Price Guarantee</span>
            </div>
            <div className="glass-card px-4 py-3 rounded-full flex items-center animate-float" style={{ animationDelay: "1s" }}>
              <span className="text-sm font-medium text-teal-800">Free Cancellation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 
