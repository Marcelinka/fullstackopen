import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Weather = ({ name, latlng }) => {
  const [weather, setWeather] = useState({});

  const getTemperature = () => weather.main?.temp;
  const getWeatherDetails = () => weather.weather?.[0] || {};
  const getWeatherIconUrl = () =>
    `https://openweathermap.org/payload/api/media/file/${getWeatherDetails().icon}.png`;

  useEffect(() => {
    weatherService.getWeather(...latlng).then((data) => setWeather(data));
  }, [latlng]);

  return (
    <div>
      <h2>Weather in {name}</h2>
      <div>Temperature {getTemperature()} Celsius</div>
      <div>
        <img src={getWeatherIconUrl()} alt={getWeatherDetails().description} />
      </div>
      <div>Wind {weather.wind?.speed} m/s</div>
    </div>
  );
};

export default Weather;
