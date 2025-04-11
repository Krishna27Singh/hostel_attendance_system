import { useState, useEffect } from 'react';
import { Plane, Hotel, Map, Compass, Camera, Utensils, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationCard from './DestinationCard';
import SearchForm from './SearchForm';

const features = [
  { title: 'Flights', description: 'Find the best flights deals to anywhere in the world', icon: <Plane /> },
  { title: 'Hotels', description: 'Book accommodations that feel like home', icon: <Hotel /> },
  { title: 'Destinations', description: 'Explore top destinations for your next adventure', icon: <Map /> },
  { title: 'Activities', description: 'Discover unique experiences and tours', icon: <Compass /> },
  { title: 'Photography', description: 'Capture your memories with local photographers', icon: <Camera /> },
  { title: 'Food Tours', description: 'Taste local flavors with guided food experiences', icon: <Utensils /> },
];

const topDestinations = [
  { id: 1, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Paris', location: 'France', rating: 4.8, price: '$450', featured: true },
  { id: 2, image: 'https://images.unsplash.com/photo-1558104631-0fa41a8f6c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Santorini', location: 'Greece', rating: 4.9, price: '$650' },
  { id: 3, image: 'https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Tokyo', location: 'Japan', rating: 4.7, price: '$800' },
  { id: 4, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Bali', location: 'Indonesia', rating: 4.6, price: '$550' },
  { id: 5, image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Barcelona', location: 'Spain', rating: 4.5, price: '$400' },
];

const hotels = [
  { id: 1, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Grand Plaza Hotel', location: 'Paris, France', rating: 4.8, price: '$210/night' },
  { id: 2, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Oceanview Resort', location: 'Bali, Indonesia', rating: 4.9, price: '$350/night', featured: true },
  { id: 3, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Downtown Luxury Suites', location: 'New York, USA', rating: 4.7, price: '$290/night' },
  { id: 4, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Sunrise Beach Hotel', location: 'Maldives', rating: 4.9, price: '$480/night' },
  { id: 5, image: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80', title: 'Mountain View Retreat', location: 'Switzerland', rating: 4.8, price: '$320/night' },
];

const Feature = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 500);
  }, []);

  const featuredHotelId = 2; 

  return (
    <>
     <section className={`container mx-auto px-4 py-16 ${animate ? 'animate-fadeIn' : ''}`}>
  <h2 className="text-3xl font-bold text-center mb-10 text-teal-700">Travel Services</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
    {features.map((feature, index) => (
      <div 
        key={index} 
        className={`bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition duration-300 ${animate ? 'animate-scaleUp' : ''}`}
        style={{ backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="flex justify-center items-center text-teal-500 text-4xl mb-4">
          {feature.icon}
        </div>
        <h3 className="font-semibold text-lg mb-2 text-gray-700">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    ))}
  </div>
</section>

<section id="destinations" className="py-16 md:py-24 bg-teal-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-teal-900 text-center">Top Destinations</h2>

    {topDestinations.length > 0 && (
      <div className="mb-10">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img 
            src={topDestinations[0].image} 
            alt={topDestinations[0].title} 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
            <h3 className="text-3xl font-bold mb-2">{topDestinations[0].title}</h3>
            <p className="text-lg">{topDestinations[0].location}</p>
            <p className="text-lg font-semibold">{topDestinations[0].price}</p>
            <Button className="mt-4 bg-teal-500 hover:bg-teal-600">Explore</Button>
          </div>
        </div>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {topDestinations.slice(1).map(destination => (
        <DestinationCard key={destination.id} {...destination} />
      ))}
    </div>
  </div>
</section>


      <section id="hotels" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-900">Top Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className={hotel.id === featuredHotelId ? 'md:col-span-3 lg:col-span-1' : 'md:col-span-1'}>
                <DestinationCard key={hotel.id} {...hotel} isFeatured={hotel.id === featuredHotelId} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Feature;
