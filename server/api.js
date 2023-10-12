import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY; // Hidden away with dotenv

const app = express();

app.get("/weather/:city", async function (req, res) {
  // fetch latitude and longtitude from weather API
  try {
    const { city } = req.params;
    const geocodingRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    res.status(geocodingRes.status);
    const geocodingData = await geocodingRes.json();
    if (
      !geocodingData ||
      !geocodingData[0] ||
      !geocodingData[0].lat ||
      !geocodingData[0].lon
    )
      throw new Error(
        "Failed to fetch geocoding data. Reason: " + geocodingRes.statusText
      );
    const { lat, lon } = geocodingData[0];
    console.log("Sending Weather request");
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
    );
    res.status(weatherRes.status);
    const weatherData = await weatherRes.json();
    res.send(weatherData);
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
    return res.send(err);
  }
});

app.get("/pollution/:city", async function (req, res) {
  // fetch latitude and longtitude from weather API
  try {
    const { city } = req.params;
    const geocodingRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const geocodingData = await geocodingRes.json();
    if (
      !geocodingData ||
      !geocodingData[0] ||
      !geocodingData[0].lat ||
      !geocodingData[0].lon
    )
      throw new Error("Failed to fetch geocoding data.");
    const { lat, lon } = geocodingData[0];
    console.log("Sending Pollution request");
    const pollutionRes = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const pollutionData = await pollutionRes.json();
    res.send(pollutionData);
  } catch (err) {
    console.error("Failed to fetch pollution data:", err);
    return res.send(err);
  }
});

export default app;
