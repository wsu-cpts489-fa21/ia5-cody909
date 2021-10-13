import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faRetweet } from '@fortawesome/free-solid-svg-icons'


export default function WeatherStation(props) {
  const longitude = props.longitude;
  const latitude = props.latitude;
  const refreshIcon = <FontAwesomeIcon icon={faRetweet}></FontAwesomeIcon>

  const [units, setUnits] = useState("metric");

  const [metricObservations, setMetricObservations] = useState({
    place: "",
    retrieved: "",
    conditions: "",
    visibility: "",
    visibilityUnit: "",
    temp: "",
    tempUnit: "",
    humidity: "",
    wind: "",
    windUnit: "",
    windDirection: "",
    windDirectionUnit: "",
  });

  const [observations, setObservations] = useState({
    place: "",
    retrieved: "",
    conditions: "",
    visibility: "",
    visibilityUnit: "",
    temp: "",
    tempUnit: "",
    humidity: "",
    wind: "",
    windUnit: "",
    windDirection: "",
    windDirectionUnit: "",
  });

  // const [stationProperties, setStationProperties] = useState({
  //   gridId: "",
  //   gridX: 0,
  //   gridY: 80,
  // });

  const getCurrentObservations = async () => {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=f763b34d246506fdbef713181cc24c56"
    );
    const currWeather = await response.json();
    setObservations({
      place: currWeather.name,
      retrieved:
        new Date().toLocaleDateString() +
        " at " +
        new Date().toLocaleTimeString(),
      conditions: currWeather.weather[0].main,
      visibilityUnit: "Meters",
      temp: Math.round(currWeather.main.temp - 273.15),
      tempUnit: "C",
      humidity: currWeather.main.humidity,
      visibility: currWeather.visibility,
      wind: currWeather.wind.speed,
      windUnit: "Meters/sec",
      windDirection: currWeather.wind.deg,
      windDirectionUnit: "Degrees",
    });
    setMetricObservations({
      place: currWeather.name,
      retrieved:
        new Date().toLocaleDateString() +
        " at " +
        new Date().toLocaleTimeString(),
      conditions: currWeather.weather[0].main,
      visibilityUnit: "Meters",
      temp: Math.round(currWeather.main.temp - 273.15),
      tempUnit: "C",
      humidity: currWeather.main.humidity,
      visibility: currWeather.visibility,
      wind: currWeather.wind.speed,
      windUnit: "Meters/sec",
      windDirection: currWeather.wind.deg,
      windDirectionUnit: "Degrees",
    });
  };

  // const getGridPoints = async () => {
  //   const response = await fetch(
  //     "https://api.weather.gov/points/" + latitude + "," + longitude
  //   );
  //   const gridPoints = await response.json();
  //   setStationProperties({
  //     stationId: gridPoints.properties.gridId,
  //     gridX: gridPoints.properties.gridX,
  //     gridY: gridPoints.properties.gridY,
  //   });
  // };

  useEffect(() => {
    getCurrentObservations();
    //getGridPoints();
  }, []);

  const toggleUnits = () => {units === "imperial" ? switchToMetric() : switchToImperial();}

  const switchToImperial = () => {
    setObservations({
      ...observations,
      tempUnit: "F",
      temp: Math.round((observations.temp * 9) / 5 + 32),
      visibility: Math.round(observations.visibility * 3.281),
      visibilityUnit: "Feet",
      wind: Math.round(observations.wind * 3.281),
      windUnit: "Feet/sec",
    });
    setUnits("imperial");
  };

  const switchToMetric = () => {
    setObservations(metricObservations);
    setUnits("metric");
  }

  const refresh = () => {
    if(units === "imperial") {

    }
}

  return (
    <section className="jumbotron ws-centered ws-padding">
      <h1>Weather Conditions at {observations.place}</h1>
      <p>
  <i>Last updated: {observations.retrieved} <button onClick={getCurrentObservations}>{refreshIcon}</button></i>
      </p>
      <p>Conditions: {observations.conditions}</p>
      <p>
        Visibility:{" "}
        {observations.visibility + " " + observations.visibilityUnit}
      </p>
      <p>
        Temp: {observations.temp}&deg;&nbsp;{observations.tempUnit}
      </p>
      <p>Humidity: {observations.humidity}%</p>
      <p>Wind Speed: {observations.wind + " " + observations.windUnit}</p>
      <p>
        Wind Direction:{" "}
        {observations.windDirection + " " + observations.windDirectionUnit}
      </p>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id={"switch-" + props.stationId}
          onClick={toggleUnits}
        />
        <label
          className="custom-control-label"
          htmlFor={"switch-" + props.stationId}
        >
          &nbsp;&deg;{observations.tempUnit}
        </label>
      </div>
    </section>
  );
}
