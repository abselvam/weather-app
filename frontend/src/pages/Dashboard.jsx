import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMultipleCities } from "../slices/weatherSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const [lastUpdated, setLastUpdated] = useState(null);
  const cityList = ["london", "paris", "chennai", "miami", "tokyo", "lisbon"];

  const { cities, loading, error } = useSelector((state) => state.weather);

  // Function to refresh data
  const refreshData = () => {
    dispatch(fetchMultipleCities(cityList));
    setLastUpdated(new Date());
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshData();
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="w-254 mx-auto">
        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Popular Cities</h1>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <p className="text-sm">
                Last updated:{" "}
                {lastUpdated.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
            <button
              onClick={refreshData}
              className="glass px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
              disabled={loading}
            >
              <span>🔄</span>
              <span>{loading ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {loading && (
          <div className="glass rounded-2xl p-6 mb-6 text-center">
            <p className="text-xl">Loading cities data...</p>
          </div>
        )}

        {error && (
          <div className="glass rounded-2xl p-6 mb-6 bg-red-500/20 border border-red-500/30">
            <p className="text-xl text-red-600">Error: {error}</p>
          </div>
        )}

        <div className="space-y-6">
          {cityList.map((city) => {
            const cityKey = city.toLowerCase();
            const cityData = cities[cityKey];

            return (
              <Link key={city} to={`/weather/${city}`} className="block">
                <div className="w-240 h-40 ml-8 glass rounded-2xl flex items-center justify-between px-10 py-6 hover:scale-[1.01] transition-all duration-200 group">
                  {/* Left Section: City Info */}
                  <div className="w-72">
                    <div className="flex items-center space-x-4 mb-3 mt-2">
                      <h2 className="font-bold text-3xl capitalize">{city}</h2>
                      <div className="text-sm px-3 py-1 rounded-full bg-white/20">
                        {cityData ? (
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            Live
                          </span>
                        ) : (
                          <span>Offline</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-8 mr-10 w-80">
                    {cityData && (
                      <div className="flex flex-col">
                        <div className="flex gap-16">
                          <p className="text-lg">Humidity</p>
                          <p className="text-lg font-semibold ml-5">
                            {cityData.current.humidity}%
                          </p>
                        </div>
                        <div className="flex gap-16">
                          <p className="text-lg">Wind</p>
                          <p className="text-lg font-semibold ml-2">
                            {cityData.current.wind_kph} km/h
                          </p>
                        </div>

                        <div className="flex gap-16">
                          <p className="text-lg">Pressure</p>
                          <p className="text-lg font-semibold">
                            {cityData.current.pressure_mb} mb
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Section: Weather Icon & Condition */}
                  <div className="flex flex-col items-center justify-center w-60">
                    {cityData ? (
                      <div className=" flex flex-col justify-center items-center">
                        <div className="relative">
                          <img
                            src={cityData.current.condition.icon}
                            alt={cityData.current.condition.text}
                            className="w-20 h-20 mb-2 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-xl text-center">
                          {cityData.current.condition.text}
                        </p>
                        <p className="text-sm mt-1">
                          UV: {cityData.current.uv}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/10 rounded-full animate-pulse mb-4" />
                        <p className="text-xl animate-pulse">Loading...</p>
                      </div>
                    )}
                  </div>

                  {/* Right Section: Temperature */}
                  <div className="text-right w-72">
                    {cityData ? (
                      <>
                        <div className="mb-4">
                          <h2 className="font-bold text-5xl">
                            {Math.round(cityData.current.temp_c)}°
                          </h2>
                        </div>

                        <div className="flex gap-4 justify-end">
                          <div>
                            <p className="text-lg font-semibold ">
                              {Math.round(
                                cityData.forecast?.forecastday?.[0]?.day
                                  ?.maxtemp_c || cityData.current.temp_c + 2,
                              )}
                              °
                            </p>
                            <p className="text-sm ">High</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold">
                              {Math.round(
                                cityData.forecast?.forecastday?.[0]?.day
                                  ?.mintemp_c || cityData.current.temp_c - 2,
                              )}
                              °
                            </p>
                            <p className="text-sm ">Low</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="h-16 bg-white/10 rounded-xl animate-pulse"></div>
                        <div className="h-12 bg-white/10 rounded-xl animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
