import "./App.css";
import WeatherObservations from "./WeatherObservations";
import Login from "./Login";
import { useState, useCallback } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const wrapperSetIsLoggedIn = useCallback(
    (val) => {
      setIsLoggedIn(val);
    },
    [setIsLoggedIn]
  );

  const signout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
        <WeatherObservations />
        <button 
          className="signout"
          onClick={signout}
          >
            sign out</button>
        </div>
      ) : (
        <Login
          isLoggedIn={isLoggedIn}
          isLoggedInSetter={wrapperSetIsLoggedIn}
        />
      )}
    </div>
  );
}

export default App;
