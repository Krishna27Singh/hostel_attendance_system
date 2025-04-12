import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { CheckCircle } from "lucide-react";
import Sidebar from '../components/Sidebar';
import axios from 'axios'
import validator from 'validator'


const backendUrl= import.meta.env.VITE_BACKEND_URL;
const INTERESTS_OPTIONS = ["Travel Tips", "Destinations", "Local Events", "Travel Deals"];
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    review: "The daily updates have helped me plan my trips better. Love the personalized recommendations!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Michael Chen",
    review: "The exclusive deals have saved me hundreds on my travels. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=57",
  }
];
const BENEFITS = [
  "Exclusive travel deals and discounts",
  "Expert travel tips and guides",
  "Latest destination updates",
  "Personalized travel recommendations",
];

const Newsletter = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    interests: [],
  });
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    
    try {
      const result = await axios.post(`${backendUrl}/api/subscribers/subscribe`,
        {
          email: formData.email, 
          fullName:formData.fullName});
      setMessage(result.message);
      setIsSubscribed(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Subscription failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Subscription Successful!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link 
              to="/" 
              className="inline-block bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
            >
              Return Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Newsletter Subscription</h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest travel news, tips, and exclusive offers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md md:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-500 mb-4">
              Get daily updates delivered straight to your inbox.
            </p>

            <div className="mb-4">
              <label className="block text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Interests</label>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS_OPTIONS.map((item) => (
                  <label key={item} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={item}
                      checked={formData.interests.includes(item)}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
            
            {message && (
              <p className={`mt-4 text-center ${isSubscribed ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Why Subscribe?</h3>
              <ul className="space-y-2 text-gray-600">
                {BENEFITS.map((reason) => (
                  <li key={reason} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                What Our Subscribers Say
              </h3>
              <div className="space-y-4">
                {TESTIMONIALS.map((user) => (
                  <div key={user.name} className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt="User"
                      className="w-12 h-12 rounded-full border"
                    />
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-gray-500 text-sm">{user.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Newsletter;