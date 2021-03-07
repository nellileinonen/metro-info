import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { stations } from './apiHelpers.js';
import Clock from './components/Clock.js';
import Select from './components/Select.js';
import Timetable from './components/Timetable.js';
import Footer from './components/Footer.js';
import backgroundImage from './images/background.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Saira Semi Condensed', sans-serif;
    margin: 0;
    background-color: #fcfcff;

    @media (min-width: 550px) {
      height: 100vh;

      background-image:
      linear-gradient(
        rgba(36,36,99, 0.65),
        rgba(36,36,99, 0.65)
      ),
      url(${backgroundImage});
      background-position: center;
    }
  }
`;

const Container = styled.div`
  h1 {
    font-weight: 400;
    margin-top: 30px;
  }

  @media (max-width: 226px) {
    h1 {
      font-size: 1.4em;
    }
  }

  @media (min-height: 750px) and (max-width: 549px){
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h1 {
      margin-bottom: 1.2em;
    }
  }

  @media (min-width: 550px) {
    max-width: 550px;
    background-color: #fcfcff;

    /* Center horizontally but define some margin on top */
    margin: 10vh auto auto auto;

    h1 {
      padding-top: 1.2em;
    }
  }
`;

const StyledApp = styled.div`
  text-align: center;
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
      <GlobalStyle />
      <Clock />
      <StyledApp>
        <h1>Seuraavat metrot</h1>

        <Select
          type={ 'station' }
          title={ 'Lähtöasema' }
          options={ stations }
          current={ station }
          selectionHandler={ stationHandler }
        />

        <Select
          type={ 'direction' }
          title={ 'Suunta' }
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
