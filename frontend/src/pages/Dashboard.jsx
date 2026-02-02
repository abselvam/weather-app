import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMultipleCities } from "../slices/weatherSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const cityList = ["london", "paris", "new york", "berlin", "chennai"];

  const { cities, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchMultipleCities(cityList));
  }, [dispatch]);

  return (
    <div className="min-h-screen  p-8">
      <h1 className="text-3xl font-bold mb-8">Popular cities</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cityList.map((city) => {
          const cityKey = city.toLowerCase();
          const cityData = cities[cityKey];

          return (
            <Link
              key={city}
              to={`/weather/${city}`}
              className="bg-white p-4 rounded shadow hover:shadow-md"
            >
              <h2 className="text-xl font-bold capitalize">{city}</h2>
              {cityData ? (
                <p className="text-2xl">{cityData.current.temp_c}°C</p>
              ) : (
                <p>Loading...</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
