import React, { useState, useEffect } from 'react';
import './Clock.css';

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
    <div>
      {time}
    </div>
  );
}

export default Clock;
