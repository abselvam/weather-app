import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Weather API endpoint
app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.BASE_URL;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

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
    console.error("Weather api error:", error);
    res.status(500).json({ error: "error fetching weather data." });
  }
});

// Search API endpoint
app.get("/api/search", async (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({
      error:
        "Query parameter 'q' is required and must be at least 2 characters",
    });
  }

  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.BASE_URL;

  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(q)}`,
    );

    if (!response.ok) {
      console.error("Error in fetching search api");
      return res.status(response.status).json({ error: "failed to fetch" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Search api error:", error);
    res.status(500).json({ error: "error fetching search data." });
  }
});

// Serve static files from frontend build in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  // Check if the build directory exists
  const fs = await import("fs");
  if (fs.existsSync(frontendPath)) {
    console.log(`Serving static files from: ${frontendPath}`);
    app.use(express.static(frontendPath));

    // Serve index.html for any unknown routes (SPA routing)
    // Use app.use() instead of app.get() for catch-all in Express 5
    app.use((req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  } else {
    console.warn(`Frontend build directory not found at: ${frontendPath}`);
    console.warn("Running in API-only mode");
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV || "development"}`);
});
