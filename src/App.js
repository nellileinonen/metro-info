import styled from 'styled-components';
import { stations, apiURL, setStationsInfo, getNewDataNow, setNewDataNow,
         createStationsQuery, createDefaultQuery, createMetroQuery } from './apiHelpers.js';
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
  const [direction, setDirection] = useState('itään');
  const [metros, setMetros] = useState([]);

  const stationHandler = (newStation) => {
    // Set helper variable newDataNow to indicate that it's ok to fetch data from api immediately
    setNewDataNow(true);
    setStation(newStation);
  }

  const directionHandler = () => {
    // Set helper variable newDataNow to indicate that it's ok to fetch data from api immediately
    setNewDataNow(true);
    direction === 'itään' ? setDirection('länteen') : setDirection('itään')
  }

  const convertTime = (timestamp) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor(timestamp % 3600 / 60);
    const seconds = Math.floor(timestamp % 3600 % 60);
    const hms = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return hms;
  }

  /* Look for arriving metros that match the app state (station and direction) and
   * update new arriving metros to app state
   */
  const findAndSetArrivals = (dataJson) => {

    // Collect arriving metros
    let arrivals = [];
    for (let stop in dataJson) {
      // Clear away metros with empty headsigns i.e. no destination (for example, on terminals)
      const temp = dataJson[stop].stoptimesWithoutPatterns.filter(metro => metro.headsign !== null);
      const destination = temp.length > 0 ? temp[0].headsign : '';
      if (direction === 'itään') {
        if (temp.length > 0 && (destination === 'Vuosaari' || destination === 'Mellunmäki')) {
          arrivals = temp;
          // No need to check the rest of the data if right data already found
          break;
        }
      } else {
        if (temp.length > 0 && (destination === 'Tapiola' || destination === 'Matinkylä')) {
          arrivals = temp;
          // No need to check the rest of the data if right data already found
          break;
        }
      }
    }

    // Update arriving metros to app state
    if (arrivals.length > 0) {
      const nextMetros = arrivals.map(item => (
          [item.trip.id, convertTime(item.realtimeDeparture), item.headsign]
        ));
      setMetros(nextMetros);
    } else {
      console.error(`No arriving metros to direction '${direction}'`);
      setMetros([]);
    }
  }

  useEffect(() => {

    /***** Get list of all stations *****/

    let initStationsQuery = createStationsQuery();
    fetch(apiURL, initStationsQuery)
    .then(response => response.json())
    .then(data => {

      let stationsJson = data.data;
      let temp = [];

      for (let item in stationsJson) {
        for (let i = 0; i < stationsJson[item].length; i++) {
          const s = stationsJson[item];
          if (stations.includes(s[i].name) && s[i].vehicleType === 1) {
            temp.push(
              {
                'id': s[i].gtfsId,
                'name': s[i].name
              }
            )
          }
        }
      }
      // Remove duplicates because GraphQL query parameter 'Helsingin yliopisto' matches also
      // 'Aalto yliopisto' and vice versa
      const ids = temp.map(item => item.id)
      temp = temp.filter( ({id}, ind) => !ids.includes(id, ind + 1) );
      // Update array that holds info of station names and ids
      setStationsInfo(temp);

      /***** Get default data *****/

      const initDefaultQuery = createDefaultQuery();
      fetch(apiURL, initDefaultQuery)
      .then(response => response.json())
      .then(data => {

        // (Helper function findAndSetArrivals() can't be used here because
        // this effect should run only one time (no dependencies).)

        let arrivals = [];

        for (let stop in data.data) {
          // Clear away metros with empty headsigns i.e. no destination (for example, on terminals)
          const temp = data.data[stop].stoptimesWithoutPatterns.filter(metro => metro.headsign !== null);
          const destination = temp[0].headsign;
          // Default direction is 'itään'
          if (temp.length > 0 && (destination === 'Vuosaari' || destination === 'Mellunmäki')) {
            arrivals = temp;
            // No need to check the rest of the data if right data already found
            break;
          }
        }

        if (arrivals.length > 0) {
          const nextMetros = arrivals.map(item => (
              [item.trip.id, convertTime(item.realtimeDeparture), item.headsign]
            ));
          setMetros(nextMetros);
        } else {
          console.error(`No arriving metros to direction 'itään'`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMetros([]);
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    })

  }, []);


  useEffect(() => {
    if (getNewDataNow()) {
      // If app state change was caused by change in station or direction,
      // get new data immediately

      // Set helper variable newDataNow to indicate that next fetch from api
      // doesn't have to be immediately executed
      setNewDataNow(false);

      const init1 = createMetroQuery(station);
      fetch(apiURL, init1)
      .then(response => response.json())
      .then(data => {
        findAndSetArrivals(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMetros([]);
      })

    } else {
      // If app state change was caused by change in metros state,
      // get new data every 15 seconds

      let timerID = setInterval(() => {
        const init2 = createMetroQuery(station);
        fetch(apiURL, init2)
        .then(response => response.json())
        .then(data => {
          findAndSetArrivals(data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
          setMetros([]);
        })
      }, 15000);
      // Clear interval after effect
      return () => clearInterval(timerID);
    }
  });

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
