import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const StyledClock = styled.div`
  position:absolute;
  right: 30px;
  top: 25px;
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
