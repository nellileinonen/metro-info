import styled from 'styled-components';
import React from 'react';

const StyledSpan = styled.span`
  font-size: 1.6em;
  display: inline-block;
  width: 4.5em;
`;

const StyledDiv = styled.div`
  width: 15em;
`;

function Timetable({ metros, station, direction }) {
  if (metros.length === 0) {
    // No departing metros on terminals
    if (((station === 'Mellunmäki' || station === 'Vuosaari') && direction === 'east') ||
        ((station === 'Matinkylä' || station === 'Tapiola') && direction === 'west')) {
      return (
        <StyledDiv>
          <p>Päätepysäkki. Ei lähteviä metroja haluttuun suuntaan.</p>
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
    <div>
      {metros.map(([id, depTime, dest]) => (
        <p key={id}>
          <StyledSpan>{depTime}</StyledSpan> {dest}
        </p>
      ))}
    </div>
  );
}

/* Check if metro info has changed.
 * Return false if unequal content is found, true is content is equal.
 */
function areEqual(prevProps, nextProps) {
  const prevMetros = prevProps.metros;
  const nextMetros = nextProps.metros;

  if (prevMetros.length === nextMetros.length) {
    if (prevMetros.length > 0) {

      for (let i = 0; i < prevMetros.length; i++) {
        for (let j = 0; j < prevMetros[i].length; j++) {
          if (!(prevMetros[i][j] === nextMetros[i][j])) {
            return false;
          }
        }
      }

      return true;

    } else {
      return true;
    }
  }
  else {
    return false;
  }
}

// Use React memo to re-render Timetable only if metro info changes
export default React.memo(Timetable, areEqual);
