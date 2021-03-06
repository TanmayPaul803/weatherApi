import axios from "axios";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=malda&appid=079b33b501019bc3f00b59c304494648&units=metric`
      );
      console.log(response);
    }
    getData();
  });

  return (
    <div className="App">
      <h1>hii</h1>
    </div>
  );
}

export default App;
