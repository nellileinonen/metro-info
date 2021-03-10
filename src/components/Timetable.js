import React, {useEffect, useState } from 'react';
import { apiURL, createMetroQuery } from '../apiHelpers.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Clock from './Clock.js';
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

const StyledSpan = styled.span`
  display: inline-block;
  width: 4.5em;
`;

const Title = styled.p`
  font-size: 0.63em;
  color: #b9b9c9;

  margin-bottom: -1em;

  span {
    width: 7.3em;
  }
`;

const StyledIcon = styled.img`
  width: 15px;
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

          <Title>
            <StyledSpan>Lähtö</StyledSpan> Päätepysäkki
          </Title>

          { metros.map(([id, depTime, dest]) => (
            <p key={ id }>
              <StyledSpan>{ depTime }</StyledSpan> { dest }
            </p>
          )) }

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