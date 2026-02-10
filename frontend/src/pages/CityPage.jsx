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
    <div className="min-h-screen flex justify-center mt-10">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error: {error}</h1>}
      {weatherData && (
        <div className="flex flex-col gap-4">
          <CurrentWeather
            data={weatherData.current}
            location={weatherData.location}
          />
          <HourlyForecast data={weatherData.hourly} />

          <WeeklyForecast data={weatherData.weekly} />
        </div>
      )}
    </div>
  );
}

export default CityPage;
