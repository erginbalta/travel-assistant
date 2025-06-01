import React, { createContext, useContext, useState } from 'react';

interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  error: string;
  success: string;
}

interface ThemeContextData {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  primary: '#f4511e',
  secondary: '#ff7043',
  background: '#ffffff',
  text: '#000000',
  error: '#d32f2f',
  success: '#388e3c',
};

const darkTheme: Theme = {
  primary: '#ff7043',
  secondary: '#ff8a65',
  background: '#121212',
  text: '#ffffff',
  error: '#ef5350',
  success: '#66bb6a',
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 