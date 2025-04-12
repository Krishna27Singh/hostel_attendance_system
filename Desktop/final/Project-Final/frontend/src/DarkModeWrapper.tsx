
import React from "react";

const DarkModeWrapper = ({ children }) => {
  const isDarkMode = 'false';

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      {children}
    </div>
  );
};

export default DarkModeWrapper;
