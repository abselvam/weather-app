import React from "react";

function WeeklyForecast({ data }) {
  return (
    <div className="w-254 h-100 glass mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Forecast</h1>

      <div className="h-[calc(100%-3rem)] overflow-y-auto scrollbar-glass">
        <div className="space-y-4 pr-2">
          {data.map((day, index) => (
            <div
              key={index}
              className="w-full h-28 rounded-xl flex items-center justify-between px-10 py-4 glass"
            >
              {/* Date */}
              <div className="w-28">
                <h2 className="font-semibold text-3xl">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </h2>
                <p className="text-2xl ">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Rain Chance */}
              <div className="text-center">
                <p className="text-3xl">{day.day.daily_chance_of_rain}%</p>
                <p className="text-lg">Rain</p>
              </div>

              {/* Weather Icon */}
              <div>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-16 h-16"
                />
              </div>

              {/* Temperature */}
              <div className="text-right">
                <h2 className="font-bold text-2xl">
                  {Math.round(day.day.maxtemp_c)}°/
                  {Math.round(day.day.mintemp_c)}°
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyForecast;
