import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";

function App() {
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState("");
  const [cityList, setCitylist] = useState([]);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=079b33b501019bc3f00b59c304494648&units=metric`;

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const onSearch = async () => {
    input === ""
      ? alert("Please Enter a city name")
      : setCitylist(() => {
          return [...cityList, input];
        });

    const response = await axios.get(url);
    const apidata2 = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=aa44733df8e04ac7a2d52654211103&q=${response.data.name}&aqi=no`
    );

    const dateTime = apidata2.data.location.localtime;
    const fullTime = new Date(dateTime);

    await setApiData({
      temp: `${response.data.main.temp} °C`,
      name: `${response.data.name}`,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      description: `${response.data.weather[0].description}`,
      humidity: `${response.data.main.humidity} %`,
      windSpeed: `${response.data.wind.speed}`,
      feelsLike: `${response.data.main.feels_like} °C`,
      minTemp: `${response.data.main.temp_min} °C`,
      maxTemp: `${response.data.main.temp_max} °C`,
      // Converted the time into 12 hr format and then assign it to the variable
      time: `${new Intl.DateTimeFormat("default", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      }).format(fullTime)}`,
    });
  };

  return (
    <div className="App">
      <div className="hero">
        <div className="logodiv">
          <h3 className="logo">Weather App</h3>
        </div>
        {`${apiData.humidity}` === "undefined" ? (
          `${apiData}` === "" && <p> </p>
        ) : (
          <div className="info">
            <span>
              <h1>{apiData.temp}</h1>
            </span>

            <span>
              <LocationOnIcon />
              <h3>{apiData.name}</h3>
              <p>{apiData.time}</p>
            </span>
            <span>
              <img src={apiData.icon} alt="" />
              <p>{apiData.description}</p>
            </span>
          </div>
        )}
      </div>

      <div className="sidebar">
        <div className="inputarea">
          <input
            type="text"
            placeholder="Search..."
            onChange={getInput}
            value={input}
          />
          <button onClick={onSearch}>
            <SearchIcon className="searchIcon" />
          </button>
        </div>
        <ul>
          {cityList.map((val, index) => {
            return <li key={index}>{val}</li>;
          })}
        </ul>
        <div className="sideBarDesc">
          <hr />
          {`${apiData.humidity}` === "undefined" ? (
            `${apiData}` === "" && <p> </p> && (
              <h2 className="welcome_text">
                Welcome to the weather app where u can search and find the
                weather of any city or any other location. This app is powered
                by{" "}
                <a href="https://openweathermap.org/"> openweathermap.org </a>.
                <p className="copyWrite">© Tanmay Paul </p>
              </h2>
            )
          ) : (
            <>
              <h2>Weather Details</h2>

              <div className="weatherDetails">
                <div className="detailsArea">
                  <p>Feels Like:</p>
                  <p>Min Temp:</p>
                  <p>Max Temp:</p>
                  <p>Humidity:</p>

                  <p>Wind:</p>
                </div>

                <div className="detailsValue">
                  <p>{`${apiData.feelsLike}`}</p>
                  <p>{`${apiData.minTemp}`}</p>
                  <p>{`${apiData.maxTemp}`}</p>
                  <p>{`${apiData.humidity}`}</p>

                  <p>{`${apiData.windSpeed}km/h`}</p>
                </div>
              </div>
            </>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
