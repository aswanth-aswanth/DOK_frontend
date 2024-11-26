"use client";
import { useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import WeatherList from "./WeatherList";

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/weather");
      setWeatherData(response.data?.data);
    } catch (err) {
      setError("Error fetching weather data");
    }
    setIsLoading(false);
  };

  const togglePin = async (providerName) => {
    try {
      await axios.post("/api/weather/togglePin", {
        providerName,
      });
      fetchWeatherData();
    } catch (err) {
      console.error("Error toggling pin:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather Data Dashboard</h1>

      <button
        onClick={fetchWeatherData}
        className={styles.fetchButton}
        disabled={isLoading}
      >
        {isLoading ? "Fetching..." : "Fetch Weather Data"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <WeatherList weatherData={weatherData} onTogglePin={togglePin} />
    </div>
  );
}
