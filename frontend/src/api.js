export const getWeatherData = async (cityName) => {
  const response = await fetch(
    `http://localhost:3000/api/weather?city=${cityName}`,
  );
  return response.json();
};

export const searchCities = async (query) => {
  if (query.length < 2) return []; // Don't search for very short queries

  // Use relative URL in production, absolute in development
  const baseURL = import.meta.env.PROD ? "/api" : "http://localhost:3000/api";

  const response = await fetch(
    `${baseURL}/search?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch city suggestions");
  }

  return response.json();
};
