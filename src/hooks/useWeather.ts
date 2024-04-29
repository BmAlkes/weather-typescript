import axios from "axios";
import { SearchType } from "../@types";
import { useMemo, useState } from "react";
import { z } from "zod";

// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name == "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }
// Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

export default function useWeather() {
  const [weather, setWeather] = useState({
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  });
  const fetchWeather = async (search: SearchType) => {
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${
        search.city
      },${search.country}&appid=${import.meta.env.VITE_API_KEY}`;

      const { data } = await axios.get(geoUrl);
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const { data: weatherResult } = await axios(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);
  return {
    hasWeatherData,
    weather,
    fetchWeather,
  };
}
