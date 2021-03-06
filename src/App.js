import React, { useState } from 'react';
import styled from 'styled-components';
import { stations } from './apiHelpers.js';
import Clock from './components/Clock.js';
import Select from './components/Select.js';
import Timetable from './components/Timetable.js';
import Footer from './components/Footer.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledApp = styled.div`
  flex-shrink: 0;
  margin: auto;

  background-color: #fbfbfe;
  border-radius: 2px;
  padding: 1.5em 2em 2em 2em;
  min-height: 30em;
  min-width: 16em;

  position:relative;

  @media (min-width: 400px) {
    padding: 4em 5em;
  }
`;

function App() {
  const [station, setStation] = useState('- -');
  const [direction, setDirection] = useState('- -');

  const stationHandler = (newStation) => {
    setStation(newStation);
  };

  const directionHandler = (newDirection) => {
    setDirection(newDirection);
  };

  return (
    <Container>
      <StyledApp>
        <Clock />

        <h1>Seuraavat metrot</h1>

        <Select
          type={ 'station' }
          title={ 'Lähtöasema:' }
          options={ stations }
          current={ station }
          selectionHandler={ stationHandler }
        />

        <Select
          type={ 'direction' }
          title={ 'Suunta:' }
          options={ ['Mellumäki/Vuosaari', 'Matinkylä/Tapiola'] }
          current={ direction }
          selectionHandler={ directionHandler }
        />

        <Timetable
          station={ station }
          direction={ direction }
        />

      </StyledApp>
      <Footer />
    </Container>
  );
}

export default App;
