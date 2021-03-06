import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import directionIcon from '../images/direction-icon.png';
import pinIcon from '../images/pin-icon.png';

const StyledContainer = styled.div`
  .active {
    max-height: 250px;
    overflow-y: scroll;
  }
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 10px 0 10px 0px;
  font: inherit;

  /* TODO */
  width: 250px;;

  text-align: left;

  :hover {
    color: white;
    background: #F26100;
    transition-duration: 0.25s;
  }

  img {
    max-width: 60px;
  }
`;

const StyledTitle = styled.div`
  background-color: #181940;
  color: white;
  padding: 10px 0;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0;

  /* Scrollbar styling for Firefox */
  scrollbar-color: #39396E #FBFBFE;
  scrollbar-width: thin;

  /* Scrollbar styling for other browsers */
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #39396E;
  }
  ::-webkit-scrollbar-track {
    background: #ededed;
  }

  /* Hide list when not toggled active */
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s linear;
`;

function Select({ type, title, options, current, selectionHandler }) {
  const [active, setActive] = useState(false);

  const toggle = () => {
    active ? setActive(false) : setActive(true);
  };

  const handleSelection = (newSelected) => {
    toggle();
    selectionHandler(newSelected);
  };

  const createOptionList = () => {
    let optionLst = options.map(item => (
      <li key={ item } value={ item }>
        <StyledButton onClick={ () => handleSelection(item) }>
          { item }
        </StyledButton>
      </li>
    ));

    console.log(optionLst);
    return optionLst;
  };

  return (
    <StyledContainer>
      { title }
      <div>
        <StyledButton aria-label={ title } onClick={ () => toggle() }>
          {
            type === 'direction'
            ?
            <img src={ directionIcon }/>
            :
            <img src={ pinIcon }/>
          }
          { current }
        </StyledButton>
      </div>
      <StyledList className={active ? ' active' : ''}>
        { createOptionList() }
      </StyledList>
    </StyledContainer>
  );
}

Select.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  current: PropTypes.string,
  selectionHandler: PropTypes.func,
}

export default Select;
