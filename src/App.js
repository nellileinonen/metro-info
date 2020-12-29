import styled from 'styled-components';
import { stations, apiURL, defaultQuery, createMetroQuery, getNewDataNow, setNewDataNow } from './apiHelpers.js';
import Clock from './components/Clock.js';
import Station from './components/Station.js';
import Timetable from './components/Timetable.js';
import { useState, useEffect } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  height: 100%;

  background-image:
    linear-gradient(
      rgba(36,36,99, 0.65),
      rgba(36,36,99, 0.65)
    ),
    url(${process.env.PUBLIC_URL + '/background.jpg'});
  background-position: center;

`;

const StyledApp = styled.div`
  align-self: center;

  background-color: #fbfbfe;
  padding: 70px 100px 100px;
  border-radius: 2px;

  width: 250px;
  height: 450px;

  position:relative;
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
          console.error('No arriving metros');
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
            // TODO: check if terminal station, inform user
            console.error('No arriving metros');
            setMetros([]);
          }
        })
        .catch((error) => {
          // TODO: inform user
          console.error('Error:', error);
          setMetros([]);
        })
      }
      else {
        // TODO: inform user
        console.error('Could not get data');
        setMetros([]);
      }

    } else {
      /* If app state change was caused by change in metros state,
       * get new data every 15 seconds
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
              // TODO: check if terminal station, inform user
              console.error('No arriving metros');
              setMetros([]);
            }
          })
          .catch((error) => {
            // TODO: inform user
            console.error('Error:', error);
            setMetros([]);
          })
        }
        else {
          // TODO: inform user
          console.error('Could not get data');
          setMetros([]);
        }

      }, 5000);
      // Clear interval after effect
      return () => clearInterval(timerID);
    }
  }, [station, direction, metros]);

  return (
    <Wrapper>
      <StyledApp>
        <Clock />
        <Station
          stations={ stations }
          station={ station }
          direction={ direction }
          stationHandler={ stationHandler }
          directionHandler={ directionHandler }
        />
        <Timetable metros={ metros }/>
      </StyledApp>
    </Wrapper>
  );
}

export default App;
