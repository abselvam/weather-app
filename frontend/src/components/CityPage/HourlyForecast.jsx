import React from "react";

function HourlyForecast({ data }) {
  // Function to format time to 12-hour format (1am, 2pm, etc.)
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    return `${hours}${ampm}`;
  };

  return (
    <div className="w-254 glass mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hourly Forecast</h1>

      <div className="flex space-x-4 pb-4 overflow-x-scroll">
        {data.map((hour, index) => (
          <div
            key={index}
            className="shrink-0 w-28 h-36 rounded-xl flex flex-col items-center justify-center p-3 glass"
          >
            {/* Time */}
            <div className="text-center mb-2">
              <p className="font-semibold text-sm">{formatTime(hour.time)}</p>
            </div>

            {/* Weather Icon */}
            <div className="mb-2">
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="w-12 h-12"
              />
            </div>

            {/* Temperature */}
            <div className="text-center">
              <p className="text-xl font-bold">{Math.round(hour.temp_c)}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
