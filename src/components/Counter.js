import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Counter({ timestamp }) {
  let today = new Date();
  let timeToDeparture = timestamp - Math.round( (today.getTime() - today.setHours(0,0,0,0)) / 1000 );
  //console.log('seconds to departure: ', timeToDeparture);

  const [time, setTime] = useState(
    timeToDeparture
  );

  const tick = () => {
    setTime(time - 1);
  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    // Clear interval after effect
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  const toTimeString = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    
    let hms = '';

    if (h !== 0) hms += `${h} h `;
    if (m !== 0) hms += `${m} min `;
    if (s !== 0) hms += `${s} s`;

    //console.log('hms: ', hms);
    return hms;
  }

  return (
    <>
      { toTimeString(time) }
    </>
  );
}

Counter.propTypes = {
  timestamp: PropTypes.number,
}

export default Counter;
