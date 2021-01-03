import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { stations, apiURL, defaultQuery, createMetroQuery, getNewDataNow, setNewDataNow } from './apiHelpers.js';
import Clock from './components/Clock.js';
import Station from './components/Station.js';
import Timetable from './components/Timetable.js';
import Footer from './components/Footer.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledApp = styled.div`
  flex-shrink: 0;
  margin: auto;

  background-color: #fbfbfe;
  border-radius: 2px;
  padding: 1.5em 2em 2em 2em;
  min-height: 30em;
  min-width: 16em;

  position:relative;

  @media (min-width: 401px) {
    padding: 4em 5em;
  }
`;

function App() {
  const [station, setStation] = useState('Tapiola');
  const [direction, setDirection] = useState('east');
  const [metros, setMetros] = useState([]);

  const stationHandler = (newStation) => {
    // Set helper variable newDataNow to indicate that it's ok to fetch data from api immediately
    setNewDataNow(true);
    setStation(newStation);
  }

  const directionHandler = () => {
    // Set helper variable newDataNow to indicate that it's ok to fetch data from api immediately
    setNewDataNow(true);
    direction === 'east' ? setDirection('west') : setDirection('east');
  }

  const convertTime = (timestamp) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor(timestamp % 3600 / 60);
    const seconds = Math.floor(timestamp % 3600 % 60);
    const hms = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return hms;
  }

  useEffect(() => {
    /* Get default data */
    if (defaultQuery !== '') {
      fetch(apiURL, defaultQuery)
      .then(response => response.json())
      .then(data => {
        // Clear away metros with empty headsigns i.e. no destination (for example, on terminals)
        const temp = data.data.stop.stoptimesWithoutPatterns.filter(metro => metro.headsign !== null);

        if (temp.length > 0) {
          const nextMetros = temp.map(item => (
              [item.trip.id, convertTime(item.realtimeDeparture), item.headsign]
            ));
          setMetros(nextMetros);
        } else {
          setMetros([]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMetros([]);
      })
    }
    else {
      console.error('Could not get data');
      setMetros([]);
    }

  }, []);

  useEffect(() => {
    const apiQuery = createMetroQuery(station, direction);

    if (getNewDataNow()) {
      /* If app state change was caused by change in station or direction,
       * get new data immediately
       */

      // Set helper variable newDataNow to indicate that next fetch from api
      // doesn't have to be immediately executed
      setNewDataNow(false);

      if (apiQuery !== '') {
        fetch(apiURL, apiQuery)
        .then(response => response.json())
        .then(data => {
          // Clear away metros with empty headsigns i.e. no destination (for example, on terminals)
          const temp = data.data.stop.stoptimesWithoutPatterns.filter(metro => metro.headsign !== null);
          if (temp.length > 0) {
            const nextMetros = temp.map(item => (
                [item.trip.id, convertTime(item.realtimeDeparture), item.headsign]
              ));
            setMetros(nextMetros);
          } else {
            setMetros([]);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setMetros([]);
        })
      }
      else {
        console.error('Could not get data');
        setMetros([]);
      }

    } else {
      /* If app state change was caused by change in metros state,
       * get new data every 2 seconds
       */

      let timerID = setInterval(() => {

        if (apiQuery !== '') {
          fetch(apiURL, apiQuery)
          .then(response => response.json())
          .then(data => {
            // Clear away metros with empty headsigns i.e. no destination (for example, on terminals)
            const temp = data.data.stop.stoptimesWithoutPatterns.filter(metro => metro.headsign !== null);
            if (temp.length > 0) {
              const nextMetros = temp.map(item => (
                  [item.trip.id, convertTime(item.realtimeDeparture), item.headsign]
                ));
              setMetros(nextMetros);
            } else {
              setMetros([]);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            setMetros([]);
          })
        }
        else {
          console.error('Could not get data');
          setMetros([]);
        }

      }, 2000);
      // Clear interval after effect
      return () => clearInterval(timerID);
    }
  }, [station, direction, metros]);

  return (
    <Container>
      <StyledApp>
        <Clock />
        <Station
          stations={ stations }
          station={ station }
          direction={ direction }
          stationHandler={ stationHandler }
          directionHandler={ directionHandler }
        />
        <Timetable
          metros={ metros }
          station={ station }
          direction={ direction }
        />
      </StyledApp>
      <Footer />
    </Container>
  );
}

export default App;
