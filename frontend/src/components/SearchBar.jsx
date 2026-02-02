import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchCities } from "../api.js"; // Adjust path as needed

function SearchBar() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();
  const searchTimeout = useRef(null);
  const suggestionsRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch suggestions with debouncing
  useEffect(() => {
    const trimmedCity = city.trim();

    if (trimmedCity.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      return;
    }

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set new timeout for debouncing
    searchTimeout.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      setSelectedIndex(-1);

      try {
        const results = await searchCities(trimmedCity);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (err) {
        setError("Failed to load suggestions");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce delay

    // Cleanup
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();

    if (trimmedCity) {
      navigate(`/weather/${trimmedCity}`);
      setCity("");
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (cityData) => {
    // cityData contains: { id, name, region, country, lat, lon, url }
    navigate(`/weather/${cityData.name}`);
    setCity("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        // If a suggestion is selected, navigate to it
        handleSuggestionClick(suggestions[selectedIndex]);
      } else if (city.trim()) {
        // Otherwise, navigate with the typed city
        handleSubmit(e);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleInputFocus = () => {
    const trimmedCity = city.trim();
    if (trimmedCity.length >= 2) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative mt-15" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔎
          </span>
          <input
            className="w-200 glass text-white h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder="Search any city"
            autoComplete="off"
            aria-label="Search city"
            aria-expanded={showSuggestions}
            aria-controls="city-suggestions"
          />
        </div>
        <button
          type="submit"
          className="h-10 px-4 ml-2 glass text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!city.trim()}
          aria-label="Search"
        >
          Search
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && city.trim().length >= 2 && (
        <div
          id="city-suggestions"
          className="absolute top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          role="listbox"
          aria-label="City suggestions"
        >
          {loading ? (
            <div className="px-4 py-3 text-center text-gray-500" role="status">
              <div
                className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto"
                aria-hidden="true"
              ></div>
              <p className="mt-1 text-sm">Searching...</p>
            </div>
          ) : error ? (
            <div
              className="px-4 py-3 text-center text-red-500 text-sm"
              role="alert"
            >
              {error}
            </div>
          ) : suggestions.length === 0 ? (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">
              No cities found for "{city}"
            </div>
          ) : (
            suggestions.map((cityData, index) => (
              <div
                key={cityData.id || index}
                className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                  index === selectedIndex
                    ? "bg-blue-100 border-blue-200"
                    : "hover:bg-blue-50"
                }`}
                onClick={() => handleSuggestionClick(cityData)}
                role="option"
                aria-selected={index === selectedIndex}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="font-medium text-gray-900">{cityData.name}</div>
                <div className="text-sm text-gray-600">
                  {cityData.region && `${cityData.region}, `}
                  {cityData.country}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
