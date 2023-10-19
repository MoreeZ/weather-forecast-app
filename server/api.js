import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Create a .env file and place set the API_KEY to 
// your Open Weather App API KEY. E.g. API_KEY=123
const API_KEY = process.env.API_KEY; 

// Create express app
const app = express();

app.get("/weather/:city", async function (req, res) {
  try {
    const { city } = req.params;
    // fetch latitude and longtitude from geocoding API
    const geocodingResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    res.status(geocodingResponse.status);
    const geocodingData = geocodingResponse.data;
    // If Latitude and Longitude have not been successfully fetched then throw an error.
    if (
      !geocodingData ||
      !geocodingData[0] ||
      !geocodingData[0].lat ||
      !geocodingData[0].lon
    )
      throw new Error(
        "Failed to fetch geocoding data. Reason: " + geocodingResponse.statusText
      );
    const { lat, lon } = geocodingData[0];
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
    );
    res.status(weatherResponse.status);
    const weatherData = weatherResponse.data;
    res.send(weatherData);
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
    return res.send(err);
  }
});

app.get("/pollution/:city", async function (req, res) {
  try {
    const { city } = req.params;
    // fetch latitude and longtitude from geocoding API
    const geocodingResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const geocodingData = geocodingResponse.data;
    // If Latitude and Longitude have not been successfully fetched then throw an error.
    if (
      !geocodingData ||
      !geocodingData[0] ||
      !geocodingData[0].lat ||
      !geocodingData[0].lon
    )
      throw new Error("Failed to fetch geocoding data.");
    const { lat, lon } = geocodingData[0];
    const pollutionResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    res.status(pollutionResponse.status);
    const pollutionData = pollutionResponse.data;
    res.send(pollutionData);
  } catch (err) {
    console.error("Failed to fetch pollution data:", err);
    return res.send(err);
  }
});

export default app;
