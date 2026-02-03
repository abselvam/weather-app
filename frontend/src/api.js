export const getWeatherData = async (cityName) => {
  // Use relative URL in production, absolute in development
  const baseURL = import.meta.env.PROD ? "" : "http://localhost:3000";
  const response = await fetch(`${baseURL}/api/weather?city=${cityName}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

export const searchCities = async (query) => {
  if (query.length < 2) return []; // Don't search for very short queries

  // Use relative URL in production, absolute in development
  const baseURL = import.meta.env.PROD ? "" : "http://localhost:3000";
  const response = await fetch(
    `${baseURL}/api/search?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch city suggestions");
  }

  return response.json();
};
