import React, {useEffect, useState } from 'react';
import { apiURL, createMetroQuery } from '../apiHelpers.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledContainer = styled.div`
  padding-left: 10px;
`;

const StyledSpan = styled.span`
  font-size: 1.6em;
  display: inline-block;
  width: 4.5em;
`;

const StyledDiv = styled.div`
  width: 15em;
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
    console.log('station or direction changed');
    console.log(station);
    console.log(direction);

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

    console.log('get now');
    fetchTimetable();

    console.log('get in itervals');
    const timerID = setInterval(() => {
      fetchTimetable();
    }, 2000);

    // Clear interval after effect
    return () => clearInterval(timerID);

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
    <StyledContainer>
      { metros.map(([id, depTime, dest]) => (
        <p key={ id }>
          <StyledSpan>{ depTime }</StyledSpan> { dest }
        </p>
      )) }
    </StyledContainer>
  );
}

Timetable.propTypes = {
  station: PropTypes.string,
  direction: PropTypes.string
}

export default Timetable;