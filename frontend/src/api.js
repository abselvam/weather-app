export const getWeatherData = async (cityName) => {
  const response = await fetch(
    `http://localhost:3000/api/weather?city=${cityName}`,
  );
  return response.json();
};
