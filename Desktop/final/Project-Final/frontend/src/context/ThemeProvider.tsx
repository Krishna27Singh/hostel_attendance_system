import React, { createContext, useState } from "react";

// Define the type for the context value
interface ThemeContextValue {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the context
export const ThemeContext = createContext<ThemeContextValue>({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Define the type for props
interface ThemeProviderProps {
  children: React.ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
