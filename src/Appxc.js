import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [cityName, setCityName] = useState();
  const submit = () => {
    setCityName(input);
    console.log(cityName);
  };

  return (
    <div className="App">
      <div className="main">
        <h1>Weather App</h1>

        <div className="mainInfo">
          <h1>hii</h1>
          <span>
            <h3>hiu</h3>
            <p>date and time</p>
          </span>
          <span>
            {/* <img src={` http://openweathermap.org/img/wn/160.png`} alt="img" /> */}
            <p>hi</p>
          </span>
        </div>
      </div>
      <div className="sidebar">
        <input
          type="text"
          placeholder="Enter Your City"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <button onClick={submit}>Submit</button>
        <hr />
        <h3>Weather Details</h3>
        <div className="decArea">
          <div className="dec">
            <p>Minimum Temp:</p>
            <p>Maximum Temp:</p>
            <p>Humidity:</p>
          </div>
          <div className="val">
            {/* <p>{`${data.main.temp_min}°C`}</p>
            <p>{`${data.main.temp_max}°C`}</p>
            <p>{`${data.main.humidity}°C`}</p> */}
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
}

export default App;
