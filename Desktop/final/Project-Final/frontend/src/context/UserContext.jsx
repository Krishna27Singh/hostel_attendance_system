import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    role: "Travel Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=32",
    location: "San Francisco, CA",
    preferences: {
      emailNotifications: true,
      locationServices: true,
      darkMode: false,
    },
  });

  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
