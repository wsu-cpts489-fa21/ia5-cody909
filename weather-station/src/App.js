import "./App.css";
import WeatherObservations from "./WeatherObservations";
import { useState, useCallback } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div className="App">
        <WeatherObservations />
    </div>
  );
}

export default App;
