import { useState } from "react";
import InfoBox from "./infoBox";
import SearchBox from "./SearchBox";

export default function WeatherApp() {
  const [WeatherInfo, setWeatherInfo] = useState({
    city: "wonderland",
    feelslike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: "haze",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div>
      <h2>Weather App by Sameer Developer</h2>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={WeatherInfo} />
    </div>
  );
}
