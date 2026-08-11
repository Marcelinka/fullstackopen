import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (lat, lon) =>
  axios
    .get(`${baseUrl}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    })
    .then((res) => res.data);

export default {
  getWeather,
};
