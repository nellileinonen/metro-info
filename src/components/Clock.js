import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledClock = styled.div`
  font-size: 0.6em;
  font-weight: 400;

  width: 4.5em;
  text-align: left;

  position: absolute;
  right: 0.5em;
  top: 0.5em;

  @media (max-width: 249px) {
    font-size: 0.7em;
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
      { time }
    </StyledClock>
  );
}

export default Clock;
