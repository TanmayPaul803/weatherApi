import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";

function App() {
  const [input, setInput] = useState("");
  // const [cityName, setCityName] = useState("");
  const [apiData, setApiData] = useState("");
  const [cityList, setCitylist] = useState([]);
  // const [allData, setAlldata] = useState({ temp: "" });

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    // setCityName(input);
    setCitylist(() => {
      return [...cityList, input];
    });
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=079b33b501019bc3f00b59c304494648&units=metric`
      )
      .then((response) => {
        console.log(response);
        setApiData({
          temp: `${response.data.main.temp} °C`,
          name: `${response.data.name}`,
          icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
          description: `${response.data.weather[0].description}`,
          humidity: `${response.data.main.humidity} %`,
          windSpeed: `${response.data.wind.speed}`,
          feelsLike: `${response.data.main.feels_like} °C`,
          minTemp: `${response.data.main.temp_min} °C`,
          maxTemp: `${response.data.main.temp_max} °C`,
        });
      });

    setInput("");
    // setAlldata({ temp: `${apiData.main.temp}` });
  };

  return (
    <div className="App">
      <div className="hero">
        <h3 className="logo">Weather App</h3>
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
              <p>time</p>
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
          <h2>Weather Details</h2>
          {`${apiData.humidity}` === "undefined" ? (
            `${apiData}` === "" && <p> </p>
          ) : (
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
          )}
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
