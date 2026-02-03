import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherData } from "../api.js";

// Async thunk for fetching weather for a single city
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const data = await getWeatherData(city);
      return { city, data }; // Return city name along with data
    } catch (error) {
      return rejectWithValue({ city, error: error.message });
    }
  },
);

// Async thunk for fetching multiple cities
export const fetchMultipleCities = createAsyncThunk(
  "weather/fetchMultipleCities",
  async (cityList, { dispatch, rejectWithValue }) => {
    try {
      const promises = cityList.map((city) => dispatch(fetchWeather(city)));
      await Promise.all(promises);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    // Keep both structures to support old and new components
    data: null, // For CityPage (single city)
    cities: {}, // For Dashboard (multiple cities)
    loading: false,
    error: null,
  },
  reducers: {
    clearWeatherData: (state) => {
      state.data = null;
      state.cities = {};
      state.error = null;
    },
    removeCity: (state, action) => {
      const cityName = action.payload.toLowerCase();
      delete state.cities[cityName];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const { city, data } = action.payload;
        const cityKey = city.toLowerCase();
        const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day;

        // Update both structures:

        // 1. For Dashboard (multiple cities)
        state.cities[cityKey] = {
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        };

        // 2. For CityPage (single city - backward compatibility)
        state.data = {
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        };
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload;
      });
  },
});

export const { clearWeatherData, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
