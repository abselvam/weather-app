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
  return (
    <div className="flex w-150 h-80 glass rounded-2xl items-center justify-center">
      <p className="text-white font-semibold text-2xl">Helooooo</p>
    </div>
  );
}

export default CurrentWeather;
