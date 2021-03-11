import React, {useEffect, useState } from 'react';
import { apiURL, createMetroQuery } from '../apiHelpers.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Clock from './Clock.js';
import Counter from './Counter.js';
import pinIconGrey from '../images/pin-icon-grey.png';

const StyledBackground = styled.div`
  background: #002f5d;
  color: #fafafa;

  font-size: 1.2em;
  font-weight: 400;

  padding: 2em 0;

  /* Positioning so that clock can be position absolute relative to this */
  position: relative;

  @media (min-width: 250px) {
    font-size: 1.6em;
    font-weight: 400;
  }

  @media (min-height: 750px) {
    margin-top: 1.3em;
  }
`;

const StyledTimetable = styled.div`
  display: inline-block;
  text-align: left;
`;

const StyledStation = styled.p`
  font-style: italic;
  font-size: 1em;
  color: #b9b9c9;
  margin: 0;
`;
/*
const StyledSpan = styled.span`
  display: inline-block;
  width: 4.5em;
`;
*/
/*
const Title = styled.p`
  font-size: 0.63em;
  color: #b9b9c9;

  margin-bottom: -1em;

  span {
    width: 7.3em;
  }
`;
*/

const Title = styled.th`
  font-size: 0.63em;
  font-weight: 400;
  color: #b9b9c9;
`;

const GreySpan = styled.span`
  display: block;
  font-size: 0.6em;
  font-weight: 400;
  color: #b9b9c9;
  margin-top: -5px;
`;

const StyledIcon = styled.img`
  width: 15px;
`;

function Timetable({ station, direction }) {
  const [metros, setMetros] = useState([]);

  /* TODO remove if not needed
  const timeToString = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    let hms = '';

    if (h !== 0) hms += `${h} h `;
    if (m !== 0) hms += `${m} min `;
    if (s !== 0) hms += `${s} s`;

    return hms;
  }

  const createCounter = (timestamp) => {
    let today = new Date();
    let timeToDeparture = timestamp - Math.round( (today.getTime() - today.setHours(0,0,0,0)) / 1000 );
    console.log(timeToDeparture);
    console.log(timeToString(timeToDeparture));

    return timeToString(timeToDeparture);
  };
  */

  useEffect(() => {
    if ((station !== 'Valitse asema') && (direction !== 'Valitse suunta')) {
      const fetchTimetable = () => {
        const apiQuery = createMetroQuery(station, direction);
        if (apiQuery !== '') {
          fetch(apiURL, apiQuery)
          .then(response => response.json())
          .then(data => {
            // Clear away metros with empty headsigns i.e. no destination (for example, on terminals)
            const temp = data.data.stop.stoptimesWithoutPatterns.filter(metro => metro.headsign !== null);
            if (temp.length > 0) {
              const nextMetros = temp.map(item => (
                  [
                    item.trip.id,
                    new Date(item.realtimeDeparture * 1000).toISOString().substr(11, 8),
                    item.realtimeDeparture,
                    item.headsign
                  ]
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
      }

      fetchTimetable();

      const timerID = setInterval(() => {
        fetchTimetable();
      }, 5000);
      // Clear interval after effect
      return () => clearInterval(timerID);
    }
  }, [station, direction]);

  const showError = () => {
    if (metros.length === 0) {
      // No departing metros on terminals
      if (((station === 'Mellunmäki' || station === 'Vuosaari') && direction === 'east') ||
          ((station === 'Matinkylä' || station === 'Tapiola') && direction === 'west')) {
        return (
            <p>Päätepysäkki. Ei lähteviä metroja haluttuun suuntaan.</p>
        );
      } else if ((station === 'Valitse asema') || (direction === 'Valitse asema')) {
        return (
            <p>Valitse lähtöasema ja suunta.</p>
        );
      } else {
        return (
            <p>Ei tietoa lähtevistä metroista.</p>
        );
      }
    }
  }

  return (
    <StyledBackground>
      <Clock />

      { metros.length !== 0
        ?
        <StyledTimetable>

          {/* TODO: Link to station selection
          <StyledStation>
            <a><StyledIcon src={ pinIconGrey }/> <span>{ station }</span></a>
          </StyledStation>
          */}

          <StyledStation>
            <StyledIcon src={ pinIconGrey }/> { station }
          </StyledStation>

          {/* TODO replace with table
          <Title>
            <StyledSpan>Lähtö</StyledSpan> Päätepysäkki
          </Title>

          { metros.map(([id, depTime, timestamp, dest]) => (
            <p key={ id }>
              <StyledSpan>{ depTime }</StyledSpan>
              <Counter timestamp={ timestamp } />
              { dest }
            </p>
          )) }
          */}

          <table>
            <thead>
            <tr>
              <Title>Lähtö</Title>
              <Title>Päätepysäkki</Title>
            </tr>
            </thead>
            <tbody>
            { metros.map(([id, depTime, timestamp, dest]) => (
                <tr key={ id }>
                  <td><Counter timestamp={ timestamp } /><br/><GreySpan>{ depTime }</GreySpan></td>
                  <td>{ dest }</td>
                </tr>
            )) }
            </tbody>
          </table>

        </StyledTimetable>
        :
        showError()
      }
    </StyledBackground>
  );
}

Timetable.propTypes = {
  station: PropTypes.string,
  direction: PropTypes.string
}

export default Timetable;