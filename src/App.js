import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { stations } from './apiHelpers.js';
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
        rgba(35, 47, 97, 0.55),
        rgba(35, 47, 97, 0.60)
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

/* Custom hook that gives the query string */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const stationQuery = useQuery().get('station');
  const directionQuery = useQuery().get('direction');

  /* Use station and direction from query string if possible */
  const [station, setStation] = useState(
    (stationQuery !== null) ? stationQuery : 'Valitse asema'
  );
  const [direction, setDirection] = useState(
    (directionQuery !== null) ? directionQuery : 'Valitse suunta'
  );

  const stationHandler = (newStation) => {
    setStation(newStation);
  };

  const directionHandler = (newDirection) => {
    setDirection(newDirection);
  };

  return (
    <Container>
      <GlobalStyle />
      <StyledApp>
        <h1>Seuraava metro</h1>

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
          options={ ['Mellunmäki/Vuosaari', 'Matinkylä/Tapiola'] }
          current={ direction }
          selectionHandler={ directionHandler }
        />

        <Timetable
          station={ station }
          direction={ direction }
        />

        <Footer />

      </StyledApp>
    </Container>
  );
}

export default App;
