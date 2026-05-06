import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'dark';
  });
  
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('accentColor') || '#e8c97e';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    document.documentElement.setAttribute('data-theme-mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    // Also set accent2 as a darker shade for vibrant mode
    const accentColor2 = adjustBrightness(accentColor, -30);
    document.documentElement.style.setProperty('--accent2', accentColor2);
  }, [accentColor]);

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, accentColor, changeAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Utility function to adjust brightness of hex color
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace(/^#/, ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
