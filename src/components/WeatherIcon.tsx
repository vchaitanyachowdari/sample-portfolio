import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

type WeatherIconProps = {
  latitude: number;
  longitude: number;
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ latitude, longitude }) => {
  const [weatherCode, setWeatherCode] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const params = {
          latitude,
          longitude,
          current: ["temperature_2m", "weather_code"],
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        if (response) {
          const current = response.current();
          if (current) {
            const weatherCode = current.variables(1)?.value() ?? null; // Weather code
            setWeatherCode(weatherCode);
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  // Map weather codes to descriptions and icons
  const weatherCodeToIcon = (code: number) => {
    const iconMap: { [key: number]: { icon: string; description: string } } = {
      0: { icon: "☀️", description: "Clear" },
      1: { icon: "🌤️", description: "Mostly Clear" },
      2: { icon: "⛅", description: "Partly Cloudy" },
      3: { icon: "☁️", description: "Overcast" },
      45: { icon: "🌫️", description: "Fog" },
      48: { icon: "🌫️", description: "Icy Fog" },
      51: { icon: "🌦️", description: "L.Drizzle" },
      53: { icon: "🌦️", description: "Drizzle" },
      55: { icon: "🌦️", description: "H.Drizzle" },
      56: { icon: "🌧️", description: "L.Icy Drizzle" },
      57: { icon: "🌧️", description: "Icy Drizzle" },
      61: { icon: "🌧️", description: "L.Rain" },
      63: { icon: "🌧️", description: "Rain" },
      65: { icon: "🌧️", description: "H.Rain" },
      66: { icon: "🌨️", description: "L.Icy Rain" },
      67: { icon: "🌨️", description: "Icy Rain" },
      71: { icon: "❄️", description: "L.Snow" },
      73: { icon: "❄️", description: "Snow" },
      75: { icon: "❄️", description: "H.Snow" },
      77: { icon: "❄️", description: "Snow Grains" },
      80: { icon: "🌦️", description: "L.Showers" },
      81: { icon: "🌦️", description: "Showers" },
      82: { icon: "🌦️", description: "H.Showers" },
      85: { icon: "❄️", description: "L.Snow Showers" },
      86: { icon: "❄️", description: "Snow Showers" },
      95: { icon: "⛈️", description: "Thunder Storm" },
      96: { icon: "⛈️", description: "T-Storm + L.Hail" },
      99: { icon: "⛈️", description: "T-Storm + Hail" },
    };
    return iconMap[code] || { icon: "❓", description: "Unknown" };
  };

  const weatherDetails =
    weatherCode !== null ? weatherCodeToIcon(weatherCode) : null;

  return weatherDetails ? (
    <span
      style={{
        fontSize: "1rem",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {weatherDetails.icon} {weatherDetails.description}
    </span>
  ) : null;
};

export default WeatherIcon;
