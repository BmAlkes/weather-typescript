import axios from "axios";
import { SearchType } from "../@types";

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const AppId = "a3a55123b9482e39ecb47e5b1c540778";
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${AppId}`;

      const { data } = await axios.get(geoUrl);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    fetchWeather,
  };
}
