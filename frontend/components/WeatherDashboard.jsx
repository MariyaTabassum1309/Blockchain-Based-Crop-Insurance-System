"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherDashboard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
       const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const city = "Hyderabad";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await axios.get(url);
        setWeather(response.data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return (
      <div className="bg-gradient-to-r from-blue-300 to-indigo-400 text-white p-6 rounded-2xl shadow-xl flex justify-center items-center h-32">
        Loading weather...
      </div>
    );
  }

  const { main, weather: weatherDetails, name } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-6 rounded-3xl shadow-2xl flex items-center justify-between text-white mb-12 transition transform hover:scale-105">
      
      {/* Weather Info */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Weather in {name}</h2>
        <p className="text-lg">{weatherDetails[0].description}</p>
        <div className="flex items-center mt-2 gap-4">
          <p className="text-3xl font-bold">{Math.round(main.temp)}°C</p>
          <p className="text-lg flex items-center gap-1">
            💧 {main.humidity}%
          </p>
        </div>
      </div>

      {/* Weather Icon */}
      <div>
        <img src={iconUrl} alt={weatherDetails[0].description} className="w-24 h-24" />
      </div>
    </div>
  );
}