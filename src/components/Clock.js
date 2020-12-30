import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const StyledClock = styled.div`
  position: absolute;
  right: 0.5em;
  top: 0;
  padding: 0.5em;

  @media (min-width: 401px) {
    right: 1.5em;
    top: 1em;
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
