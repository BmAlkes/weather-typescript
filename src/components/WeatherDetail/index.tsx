import { Weather } from "../../@types";
import { formatTemperature } from "../../utils";
import styles from "./weatherDetails.module.css";
import sun from "../../assets/sun.png";
import cloudy from "../../assets/cloudy.png";
import rain from "../../assets/rain.png";
import storm from "../../assets/storm.png";

type WeatherDetailsProps = {
  weather: Weather;
};

const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2> Weather of: {weather.name}</h2>
        <p>
          {formatTemperature(weather.main.temp)}&deg;C{" "}
          <img src={sun} alt="" className={styles.img} />
        </p>
        <div>
          <p>
            Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
          </p>
          <p>
            Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
