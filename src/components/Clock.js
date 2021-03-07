import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledClock = styled.div`
  position: absolute;
  right: 0.5em;
  top: 0;
  padding: 0.2em 0.5em 0.5em 0.5em;
  width: 3em;

  @media (min-width: 400px) {
    right: 1.5em;
    top: 1em;
  }

  @media (min-width: 550px) {
    position: fixed;
    top: 0;
    color: #fcfcff;
  }
`;

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB'));

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    // Clear interval after effect
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date().toLocaleTimeString('en-GB'));
  }

  return (
    <StyledClock>
      {time}
    </StyledClock>
  );
}

export default Clock;
