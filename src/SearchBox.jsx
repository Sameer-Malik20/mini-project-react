import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(""); // Error state with string for error messages
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "7dc05f50b1c3eb62cd68da6499d37fc3";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found'); // If the response is not OK, throw an error
      }

      let jsonResponse = await response.json();
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      setError("Not found Place");
    }
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
    setError(""); // Reset error when the user starts typing
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      if (!city) {
        setError("City name cannot be empty");
        return;
      }
      setCity(""); // Clear input field
      let newInfo = await getWeatherInfo();
      if (newInfo) {
        updateInfo(newInfo);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
      </form>
    </div>
  );
}
