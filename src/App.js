// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import locationsData from './Locations.json';

function App() {
  const [locations, setLocations] = useState(locationsData);
  const [searchInput, setSearchInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocations((prevLocations) => {
        const sortedLocations = [...prevLocations].sort((a, b) =>
          a.city.localeCompare(b.city)
        );
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedLocations.length);
        return sortedLocations;
      });
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, []);

  useEffect(() => {
    setSelectedLocation(locations[currentIndex]);
  }, [currentIndex, locations]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    const searchedLocation = locations.find(
      (location) => location.city.toLowerCase() === searchInput.toLowerCase()
    );

    if (searchedLocation) {
      setSelectedLocation(searchedLocation);
      setErrorMessage('');
    } else {
      setSelectedLocation(null);
      setErrorMessage('Weather forecast not available for the entered location.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <h2>Enter the name of the U.S city in the search box below to display current weather conditions for that location. </h2>
      <div className="controls">
        <br></br>
        <label>Search City:
        <input
          type="text"
          id="city-input" 
          name="city" 
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyPress} 
          placeholder="Enter city name"
          />  
          </label>      
        
        <button data-testid="search-button" onClick={handleSearchSubmit}>Search</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="weather-list">
        {selectedLocation && <WeatherDisplay location={selectedLocation} />}
      </div>
    </div>
  );
}

export default App;
