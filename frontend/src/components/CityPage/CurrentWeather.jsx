import React from "react";

function CurrentWeather({ data, location }) {
  const { localtime, name } = location;
  const {
    temp_c,
    condition,
    feelslike_c,
    maxtemp_c,
    mintemp_c,
    wind_kph,
    humidity,
    uv,
  } = data;

  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Create a Date object from the string
    const date = new Date(dateString);

    // Format options for weekday, hour, and minute
    const options = {
      weekday: "long", // Full day name (e.g., "Sunday")
      hour: "numeric", // Hour (1-12)
      minute: "2-digit", // Minute with leading zero
      hour12: true, // Use 12-hour format with AM/PM
    };

    return date.toLocaleTimeString("en-US", options);
  };

  const getWindDescription = (value) => {
    if (value < 10) return "Calm";
    if (value < 20) return "Little breezy";
    if (value < 30) return "Windy";
    return "Very Windy";
  };
  const getHumidityDescription = (value) => {
    if (value < 30) return "Dry";
    if (value < 60) return "Comfortable";
    if (value < 80) return "Humid";
    return "Stucky";
  };
  const getUVDescription = (value) => {
    if (value < 3) return "Low";
    if (value < 6) return "Moderate";
    if (value < 8) return "High";
    if (value < 11) return "Very High";
    return "Extreme";
  };

  return (
    <div className="flex gap-4">
      {/* left side */}
      <div className="flex w-150 h-80 glass rounded-2xl px-24 items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-6">{name}</h1>
          <h1 className="text-8xl mb-6">{Math.round(temp_c)}°</h1>
          <p className="mb-2">
            ↑Max {Math.round(maxtemp_c)}° / ↓Min {Math.round(mintemp_c)}°
          </p>
          <p className="mb-2">Feels like {feelslike_c}°</p>
          <p>{formatDate(localtime)}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            className="h-40 w-40"
            src={condition.icon}
            alt={condition.text}
          />
          <h2 className="text-2xl font-semibold ">{condition.text}</h2>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-col w-100 h-80 glass rounded-2xl px-12 items-center gap-8 justify-center">
        <div className="flex w-full justify-between items-start">
          <p className="text-2xl">💨 Wind</p>
          <div className="flex flex-col items-start">
            <p className="text-lg">{wind_kph} km/h</p>
            <p>{getWindDescription(wind_kph)}</p>
          </div>
        </div>

        <div className="flex w-full justify-between items-start pr-1.5">
          <p className="text-2xl">💧 Humidity</p>
          <div className="flex flex-col items-start">
            <p className="text-lg">{wind_kph} km/h</p>
            <p>{getHumidityDescription(humidity)}</p>
          </div>
        </div>

        <div className="flex w-full justify-between items-start pr-1.5">
          <p className="text-2xl">☀️ UV Index</p>
          <div className="flex flex-col items-start">
            <p className="text-lg">{wind_kph} km/h</p>
            <p>{getUVDescription(uv)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
