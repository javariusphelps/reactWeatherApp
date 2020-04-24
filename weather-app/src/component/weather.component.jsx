import React, { useState } from "react";
import Moment from "react-moment";
import "moment-timezone";

const Weather = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [description, setDescription] = useState("");
  const [timezone, setTimezone] = useState("");
  const [icon, setIcon] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const getWeather = () => {
    if (input === "") {
      setError("You have to enter a zipcode!");
      return;
    }
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        input +
        "&appid=475e1e1ad088c2c133cae8a3f647ccf5&units=imperial"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCity(data.name);
        setIcon(data.weather[0].icon);
        setTemp(Math.floor(data.main.temp));
        setHumidity(data.main.humidity);
        setDescription(data.weather[0].description);

        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            data.coord.lat +
            "&lon=" +
            data.coord.lon +
            "&appid=475e1e1ad088c2c133cae8a3f647ccf5&units=imperial"
        )
          .then((response) => response.json())
          .then((json) => {
            setTimezone(json.timezone);

            console.log(json);
          });
      });
  };

  return (
    <div className="container">
      <div className="cards pt-5 mb-3">
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <button onClick={getWeather} className="btn btn-primary">
          Enter zipcode
        </button>
        <h1 className="mb-4">Find Your Weather</h1>
        {city ? (
          <div className="row">
            <div className="col">
              <p>{city}</p>
              <img
                src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"}
                alt={description}
              />
            </div>
            <div className="col">
              <p>Condition: {description}</p>
              <p>Temperature: {temp} &deg;F</p>
              <p>Humidity: {humidity} %</p>
            </div>
            <p>
              {" "}
              <Moment format="dddd" tz={timezone}></Moment>
            </p>
            <p>
              {" "}
              <Moment format="h:mm a z" tz={timezone}></Moment>{" "}
            </p>
          </div>
        ) : null}
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Weather;
