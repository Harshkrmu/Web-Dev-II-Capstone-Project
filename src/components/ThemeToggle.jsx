import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';
import { useState } from 'react';

export default function ThemeToggle() {
  const { mode, toggleMode, accentColor, changeAccentColor } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const presetColors = [
    '#e8c97e', // Gold (original)
    '#ff6b6b', // Red
    '#4ecdc4', // Teal
    '#95e1d3', // Mint
    '#f38181', // Coral
    '#aa96da', // Purple
    '#fcbad3', // Pink
    '#a8d8ea', // Blue
    '#ffd93d', // Yellow
    '#6bcf7f', // Green
  ];

  return (
    <div className="theme-toggle-container">
      <div className="theme-buttons">
        <button
          className={`theme-btn ${mode === 'light' ? 'active' : ''}`}
          onClick={() => toggleMode('light')}
          title="Light Mode"
        >
          ☀️
        </button>
        <button
          className={`theme-btn ${mode === 'dark' ? 'active' : ''}`}
          onClick={() => toggleMode('dark')}
          title="Dark Mode"
        >
          🌙
        </button>
        <button
          className={`theme-btn ${mode === 'vibrant' ? 'active' : ''}`}
          onClick={() => toggleMode('vibrant')}
          title="Vibrant Mode"
        >
          ✨
        </button>
      </div>

      <div className="color-picker-wrapper">
        <button
          className="color-picker-btn"
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{ backgroundColor: accentColor }}
          title="Choose accent color"
        />
        
        {showColorPicker && (
          <div className="color-picker-menu">
            <div className="preset-colors">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className={`preset-color ${accentColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    changeAccentColor(color);
                    setShowColorPicker(false);
                  }}
                  title={color}
                />
              ))}
            </div>
            
            <input
              type="color"
              className="custom-color-input"
              value={accentColor}
              onChange={(e) => changeAccentColor(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
