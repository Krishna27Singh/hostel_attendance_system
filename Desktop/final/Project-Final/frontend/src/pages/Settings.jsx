
import React, { useContext, useState, useEffect } from "react";
import { Camera } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeProvider";
import UserLocationMap from "../components/UserLocationMap";

const backendUrl= import.meta.env.VITE_BACKEND_URL;
const Settings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [location, setLocation] = useState(null); // Make sure this is defined in your component


  const [user, setUser] = useState({
    username: "",
    email: "",
    phone_no: "",
    profileImage:"",
  });

  
  // ✅ Fetch user data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`,{
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include", // ⬅️ Important to send cookies
        });
        const data = await res.json();
        console.log(data);
        
        if (data) {
          const { username, email} = data;
        
          
          setUser({
            username,
            email,
            profileImage: `https://i.pravatar.cc/150?u=${email}`, // or data.user.profileImage if available
          });
        } else {
          console.error("Failed to fetch user:", data.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("handlechange after log",user);
  };

  // ✅ Handle Image Upload (Save to LocalStorage)
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setUser((prev) => ({ ...prev, profileImage: imageURL }));
  //     localStorage.setItem("profileImage", imageURL);
  //   }
  // };

  // ✅ Save Changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("🔹 Sending Request with Token:", token);
      console.log("🔹 Updated User Data:", user);

      const response = await fetch("http://localhost:5000/auth/profile", {
        credentials: "include", // ⬅️ Add this line
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          phone_no: user.phone_no,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Profile updated successfully!");
        const { username, email } = data.updatedUser;
        setUser((prev) => ({
          ...prev,
          username,
          email,
          profileImage: `https://i.pravatar.cc/150?u=${email}`,
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


   // ✅ Share Location Functionality
   const handleShareLocation = () => {
    if (!location) {
      alert("Location is not available.");
      return;
    }

    // Create a shareable URL with the user's location
    const shareUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

    if (navigator.share) {
      // Use Web Share API (available on supported browsers and devices)
      navigator
        .share({
          title: "My Location",
          text: "Check out my location!",
          url: shareUrl,
        })
        .then(() => {
          console.log("Location shared successfully!");
        })
        .catch((err) => {
          console.error("Error sharing location:", err);
        });
    } else {
      // If Web Share API is not supported, show the URL as a fallback
      alert(`Copy this URL to share: ${shareUrl}`);
    }
  };

  // ✅ Fetch the user's location using Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Error fetching location:", err);
        alert("Unable to retrieve your location.");
      }
    );
  }, []);


  
  

  return (
    <div className={`flex h-full bg-teal-100 min-h-screen ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Sidebar />

      <main className={`flex-1 p-8 ${isDarkMode ? "text-white" : "text-black"}`}>
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        {/* Form + Preferences */}
        <div className="grid grid-cols-4 gap-6">
          {/* Form */}
          <div className={`col-span-3 p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20">
                <img
                  src={user.profileImage || "/default-avatar.png"}
                  alt="User Profile"
                  className="w-20 h-20 rounded-full border shadow-md"
                />
              </div>
              <div>
              <h2 className="text-2xl font-semibold">{user.username || "Guest User"}</h2>
              <p className="text-gray-500 text-base">Travel Enthusiast</p>
            </div>

            </div>

            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  className={`w-full mt-1 p-2 border rounded-md ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                  value={user.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full mt-1 p-2 border rounded-md ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Preferences + Save Button */}
          <div className={`p-6 rounded-lg shadow-md flex flex-col justify-between ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
            <div>
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700">Email Notifications</span>
                <input type="checkbox" className="toggle-switch" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700">Location Services</span>
                <input type="checkbox" className="toggle-switch" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Dark Mode</span>
                <input
                  type="checkbox"
                  className="toggle-switch"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className={`mt-6 px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-teal-700 transition ${isDarkMode ? "bg-teal-700" : "bg-teal-700"} text-white`}
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="mt-8 w-full h-[400px]">
  <h2 className="text-3xl font-semibold mb-4 text-center">📍 Your Live Location 🌍</h2>

  <div className={`rounded-lg shadow-md overflow-hidden h-full ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
    <UserLocationMap />
  </div>

  {/* Share Location Button */}
  {location && (
    <div className="mt-4 w-full max-w-md mx-auto text-center">
      <button
        onClick={handleShareLocation}
        className={`w-full px-10 py-4 rounded-lg text-lg font-medium shadow-md hover:bg-teal-700 transition ${isDarkMode ? "bg-teal-700" : "bg-teal-700"} text-white`}
      >
        Share My Location
      </button>
    </div>
  )}
</div>

      </main>
    </div>
  );
};

export default Settings;

