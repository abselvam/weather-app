// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getWeatherData } from "../api.js";
// import CurrentWeather from "../components/CityPage/CurrentWeather.jsx";
// import HourlyForecast from "../components/CityPage/HourlyForecast.jsx";
// import WeeklyForecast from "../components/CityPage/WeeklyForecast.jsx";

// function CityPage() {
//   // const [city, setCity] = useState(initialCity);
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const { city } = useParams();

//   useEffect(() => {
//     const fetchWeather = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await getWeatherData(city);
//         const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day;

//         setWeatherData({
//           current: { ...data.current, mintemp_c, maxtemp_c },
//           hourly: data.forecast.forecastday[0].hour,
//           weekly: data.forecast.forecastday.slice(1),
//           location: data.location,
//         });
//       } catch (error) {
//         console.error("Error fetching weather:", error);
//         setError("Error fetching data: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, [city]);

//   console.log(weatherData);
//   return (
//     <div className="min-h-screen bg-amber-200 flex items-center justify-center px-10 py-8">
//       <h1>CityPage</h1>
//       <div>
//         {loading && <h1>Loading...</h1>}
//         {error && <h1>{error}</h1>}
//         {weatherData && (
//           <>
//             <CurrentWeather
//               data={weatherData.current}
//               location={weatherData.location}
//             />
//             <HourlyForecast data={weatherData.hourly} />
//             <WeeklyForecast data={weatherData.weekly} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CityPage;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../slices/weatherSlice";
import CurrentWeather from "../components/CityPage/CurrentWeather.jsx";
import HourlyForecast from "../components/CityPage/HourlyForecast.jsx";
import WeeklyForecast from "../components/CityPage/WeeklyForecast.jsx";

function CityPage() {
  const { city } = useParams();
  const dispatch = useDispatch();

  // Get weather state from Redux
  const {
    data: weatherData,
    loading,
    error,
  } = useSelector((state) => state.weather);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch]);

  return (
    <div className="min-h-screen bg-amber-200 flex items-center justify-center px-10 py-8">
      <h1>CityPage - {city}</h1>
      <div>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error: {error}</h1>}
        {weatherData && (
          <>
            <CurrentWeather
              data={weatherData.current}
              location={weatherData.location}
            />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </>
        )}
      </div>
    </div>
  );
}

export default CityPage;
