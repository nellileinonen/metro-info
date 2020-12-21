import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';

const StyledStation = styled.div`
  padding-bottom: 25px;
`;

const StyledTitle = styled.h1`
  font-weight: 400;
  padding-bottom: 15px;
`

const StyledButton = styled.button`
  background: transparent;
  border: none;

  text-decoration: underline;
  text-decoration-thickness: 4px;
  text-underline-offset: 5px;
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
  padding-right: 10px;
  font-size: 1.3em;
`;

const StyledLabel = styled.label`
  color: white;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const StyledSelect = styled.select`
  width: 210px;
  padding: 5px;

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
        Metrot <StyledButton onClick={ directionHandler }>{ direction }</StyledButton>
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

export default Station;
