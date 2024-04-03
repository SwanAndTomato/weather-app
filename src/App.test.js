// App.test.js

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

test('displays selected city name', async () => {
  render(<App />);
  
  // Wait for initial weather display to render
  await waitFor(() => screen.getByText(/Weather App/i));

  // Verify that the initial city name is displayed
  const initialCityName = screen.getByText(/New York/i);
  expect(initialCityName).toBeInTheDocument();

  // Select a different city (e.g., Los Angeles)
  const searchInput = screen.getByPlaceholderText(/Enter city name/i);
  fireEvent.change(searchInput, { target: { value: 'Los Angeles' } });

  // Find the search button using data-testid attribute
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);

  // Wait for the updated weather display to render
  await waitFor(() => screen.getByText(/Los Angeles/i));

  // Verify that the new city name is displayed
  const newCityName = screen.getByText(/Los Angeles/i);
  expect(newCityName).toBeInTheDocument();
});
