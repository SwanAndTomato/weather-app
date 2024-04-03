// WeatherDisplay.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherDisplay from './WeatherDisplay';

test('renders weather display with city name', () => {
  const location = { city: 'New York', temperature: '22°C', weather: 'Sunny' };
  render(<WeatherDisplay location={location} />);
  const cityElement = screen.getByText(/New York/i);
  expect(cityElement).toBeInTheDocument();
});
