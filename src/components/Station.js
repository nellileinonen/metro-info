import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiMapPin } from 'react-icons/fi';

const StyledStation = styled.div`
  padding-bottom: 1.5em;
`;

const StyledTitle = styled.h1`
  font-weight: 400;
  padding: 0.5em 0;

  @media (min-width: 401px) {
    padding: 0 0 0.5em 0;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  border: none;

  text-decoration: underline;
  text-decoration-thickness: 0.13em;
  text-underline-offset: 0.2em;
  text-decoration-color: #ff6620;

  :hover {
    background: #ff6620;
    transition-duration: 0.4s;
    border-radius: 2px;
  }

  font-family: 'Poppins', 'Helvetica', sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const StyledSpan = styled.span`
  display: inline-block;
  padding-right: 0.3em;
  font-size: 1.3em;
`;

const StyledLabel = styled.label`
  z-index: -1;
  position: absolute;
`;

const StyledSelect = styled.select`
  width: 12em;
  padding: 0.2em;

  font-family: 'Poppins', 'Helvetica', sans-serif;
  font-size: 1em;
`;

function Station({ stations, station, direction, stationHandler, directionHandler }) {

  const handleChange = () => {
    const newStation = document.getElementById("stationSelect").value;
    stationHandler(newStation);
  }

  return (
    <StyledStation>
      <StyledTitle>
        Metrot
        {` `}
        <StyledButton onClick={ directionHandler }>
          { (direction === 'east') ? 'itään' : 'länteen'}
        </StyledButton>
      </StyledTitle>
      <div>
        <StyledSpan><FiMapPin /></StyledSpan>
        <StyledLabel htmlFor="stationSelect">Valitse asema</StyledLabel>
        <StyledSelect id="stationSelect" value={ station } onChange={ () => handleChange() }>
          {stations.map(item => (
            <option  key={ item } value={ item }>{ item }</option>
          ))}
        </StyledSelect>
      </div>
    </StyledStation>
  );
}

Station.propTypes = {
  stations: PropTypes.array,
  station: PropTypes.string,
  direction: PropTypes.string,
  stationHandler: PropTypes.func,
  directionHandler: PropTypes.func
}

export default Station;
