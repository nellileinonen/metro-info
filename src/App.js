import './App.css';
import Clock from './components/Clock.js';
import Timetable from './components/Timetable.js';
import { useState, useEffect } from 'react';

function App() {
  const [metros, setMetros] = useState([]);

  // timestamp: seconds since midnight
  const convertTime = (timestamp) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor(timestamp % 3600 / 60);
    const seconds = Math.floor(timestamp % 3600 % 60);
    const hoursAndMinutes = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return hoursAndMinutes;
  }

  useEffect(() => {
    const apiURL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

    const apiQuery = `{stop(id: "HSL:2211601") {
                        name
                        stoptimesWithoutPatterns {
                          realtimeDeparture
                          headsign
                          trip {
                            id
                          }
                        }
                      }}`;

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql'
      },
      body: apiQuery
    }

    const getData = () => {
      fetch(apiURL, init)
      .then(response => response.json())
      .then(data => {
        const arrivals = data.data.stop.stoptimesWithoutPatterns;
        const nextMetros = arrivals.map(item => (
          [convertTime(item.realtimeDeparture), item.headsign, item.trip.id]
        ));
        setMetros(nextMetros);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMetros([]);
      });
    };

    if (metros.length === 0) {
      // Get data immediately if state is empty
      getData();
    } else {
      // Get new data every 15 seconds
      let timerID = setInterval(() => getData(), 15000);
      // Clear interval after effect
      return () => clearInterval(timerID);
    }
  }, [metros]);

  return (
    <div className="App">
      <Clock />
      <h1>Metrot itään</h1>
      <p>Tapiola</p>
      <Timetable metros={ metros }/>
    </div>
  );
}

export default App;
