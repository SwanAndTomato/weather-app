// WeatherDisplay.js

import React from 'react';
import '../WeatherDisplay.css';

const WeatherDisplay = ({ location, backgroundImage }) => {
  const getBackgroundImage = (weather) => {
    // Add logic to select the background image based on weather conditions
    switch (weather.toLowerCase()) {
      case 'sunny':
        return 'sunny.jpg'; // Replace with the actual sunny background image
      case 'cloudy':
        return 'cloudy.jpg'; // Replace with the actual cloudy background image
      case 'rainy':
        return 'rainy.jpg'; // Replace with the actual rainy background image
      default:
        return 'default.jpg'; // Replace with the default background image
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage || getBackgroundImage(location.weather)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '300px', // Adjust the minimum height as needed
  };

  return (
    <div className="weather-display" style={backgroundStyle}>
      <h2>{location.city}</h2>
      <p>Temperature: {location.temperature}</p>
      <p>Weather: {location.weather}</p>
    </div>
  );
};

export default WeatherDisplay;
