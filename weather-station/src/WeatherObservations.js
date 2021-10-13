import WeatherStation from "./WeatherStation";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function WeatherObservations() {

  const [stationsInfo, setStationsInfo] = useState({
    stations: [],
    stationCount: 0,
  });

  const [input, setInput] = useState("");

  const downButtonIcon = <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>;
  const upButtonIcon = <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>;
  const deleteButtonIcon = <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>;
  const addStationButtonIcon = <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>;

  const getLocSuccess = (position) => {
    setStationsInfo({
      stations: [
        {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          stationId: stationsInfo.stationCount + 1,
        },
      ],
      stationCount: stationsInfo.stationCount + 1,
    });
  };

  const getLocError = (err) => {
    const currentCount = stationsInfo.stationCount;
    setStationsInfo({
      stations: [
        {
          lat: 47.61,
          lon: -122.33,
          stationId: currentCount + 1,
        },
      ],
      stationCount: currentCount + 1,
    });
  };

  useEffect(() => {
    setUserStations();
  }, []);

  const getUserLocation = async () => {
    await navigator.geolocation.getCurrentPosition(getLocSuccess, getLocError);
  };

  const setUserStations = () => {
    const userDataJSON = localStorage.getItem('cody@gmail.com');
    const userData = JSON.parse(userDataJSON);
    const userStations = userData.weatherStations;
    if(userStations.length >= 1){
      const count = userStations[userStations.length - 1].stationId
      setStationsInfo({
        stations: userStations,
        stationCount: count,
      })
    } else {
      getUserLocation()
    }
  }

  const addStation = async (newStation) => {
    if (newStation != null) {
      //Need to see if we can find the station through the API
      const response = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          newStation +
          "&appid=f763b34d246506fdbef713181cc24c56"
      );
      const stationData = await response.json();
      //See if the requested station exists
      if (stationData != null && stationData.hasOwnProperty("coord")) {
        //Push new station into stations list and update state
        let newStations = [...stationsInfo.stations];
        const currentCount = stationsInfo.stationCount;
        newStations.push({
          lat: stationData.coord.lat,
          lon: stationData.coord.lon,
          stationId: currentCount + 1,
        });
        setStationsInfo({
          stations: newStations,
          stationCount: currentCount + 1,
        });
        localStorage.setItem('cody@gmail.com', JSON.stringify({
          password: 'password123',
          weatherStations: newStations}))
      } else {
        alert("Sorry, that weather location could not be found.");
      }
    }
  };

  const showDialog = () => {

  };

  const deleteWeatherStation = (stationIndex) => {

  };

  const moveWeatherStationUp = (stationIndex) => {

  }

  const moveWeatherStationDown = (stationIndex) => {

  }

  let rows = [];
  if (stationsInfo.stations.length !== 0) {
    for (let i = 0; i < stationsInfo.stations.length; ++i) {
      rows.push(
        <div>
          <WeatherStation
            key={stationsInfo.stations[i].stationId}
            latitude={stationsInfo.stations[i].lat}
            longitude={stationsInfo.stations[i].lon}
            stationId={stationsInfo.stations[i].stationId}
          />
        </div>
      );
    }
    return (
      <div>
        {rows}
        <button className="float" id="addStationBtn" onClick={showDialog}>
          {addStationButtonIcon}
        </button>
        {/* { show ? <h1 show={show}>Am I hidden ? </h1> : null} */}
      </div>
    );
  } else {
    return <h1>no stations added</h1>;
  }
}
