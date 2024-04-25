//################Custom Hook for fetching the data##################

import { useCallback, useState } from "react";
import axios from "axios";
const useHttp = () => {
  const [error, setError] = useState(null);
  const fetchWeather = useCallback(async (coords, dataTransform) => {
    setError(null);
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
      );
      dataTransform(response.data);
    } catch (error) {
      setError("Something went wrong!");
    }
  }, []);
  const fetchCity = useCallback(async (coords, dataTransform) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`
      );
      dataTransform(response.data);
    } catch (error) {
      setError("Invalid Coordinates!");
    }
  }, []);

  const fetchSearchCoords = useCallback(async (city, dataTransform) => {
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      dataTransform(response.data.results[0]);
    } catch (error) {
      setError("Invalid City Name");
    }
  }, []);

  return { error, fetchWeather, fetchCity, fetchSearchCoords };
};

export default useHttp;
