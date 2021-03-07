import React, {useEffect, useState } from 'react';
import { apiURL, createMetroQuery } from '../apiHelpers.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBackground = styled.div`
  background: #002f5d;
  color: #fafafa;

  font-size: 1.2em;
  font-weight: 400;

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

const StyledSpan = styled.span`
  display: inline-block;
  width: 4.5em;
`;

const StyledDiv = styled.div`
  background: #002f5d;
  color: #fafafa;
  font-size: 1.2em;
  padding: 2em 0;
`;

function Timetable({ station, direction }) {
  const [metros, setMetros] = useState([]);

  const convertTime = (timestamp) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor(timestamp % 3600 / 60);
    const seconds = Math.floor(timestamp % 3600 % 60);
    const hms = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return hms;
  };

  useEffect(() => {
    if ((station !== '- -') && (direction !== '- -')) {
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
      }

      fetchTimetable();

      const timerID = setInterval(() => {
        fetchTimetable();
      }, 2000);
      // Clear interval after effect
      return () => clearInterval(timerID);
    }
  }, [station, direction]);

  if (metros.length === 0) {
    // No departing metros on terminals
    if (((station === 'Mellunmäki' || station === 'Vuosaari') && direction === 'east') ||
        ((station === 'Matinkylä' || station === 'Tapiola') && direction === 'west')) {
      return (
        <StyledDiv>
          <p>Päätepysäkki. Ei lähteviä metroja haluttuun suuntaan.</p>
        </StyledDiv>
      );
    } else if ((station === '- -') || (direction === '- -')) {
      return (
        <StyledDiv>
          <p>Valitse lähtöasema ja suunta.</p>
        </StyledDiv>
      );
    } else {
      return (
        <StyledDiv>
          <p>Ei tietoa lähtevistä metroista.</p>
        </StyledDiv>
      );
    }
  }

  return (
    <StyledBackground>
      <StyledTimetable>
        { metros.map(([id, depTime, dest]) => (
          <p key={ id }>
            <StyledSpan>{ depTime }</StyledSpan> { dest }
          </p>
        )) }
      </StyledTimetable>
    </StyledBackground>
  );
}

Timetable.propTypes = {
  station: PropTypes.string,
  direction: PropTypes.string
}

export default Timetable;