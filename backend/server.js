import express from "express";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.BASE_URL;
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7`,
    );
    if (!response.ok) {
      console.error("Error in fetching weather api");
      return res.status(response.status).json({ error: "failed to fetch" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Weateher api error:", error);
    res.status(500).json({ error: "error fetching weather data." });
  }
});

const DEFAULT_CITIES = [
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Sydney",
  "Dubai",
];
app.get("/api/weather/multiple", async (req, res) => {
  const { cities } = req.query;
  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.BASE_URL;

  // Use provided cities or default ones
  const cityList = cities ? cities.split(",") : DEFAULT_CITIES;

  try {
    const promises = cityList.map(async (city) => {
      try {
        const response = await fetch(
          `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city.trim()}&days=1`,
        );

        if (!response.ok) {
          console.error(`Failed to fetch weather for ${city}`);
          return null;
        }

        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error(`Error fetching ${city}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const validResults = results.filter((city) => city !== null);

    res.json(validResults);
  } catch (error) {
    console.error("Weather api error:", error);
    res.status(500).json({ error: "error fetching weather data." });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
