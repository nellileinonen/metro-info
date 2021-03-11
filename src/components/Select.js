import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import directionIcon from '../images/direction-icon.png';
import pinIcon from '../images/pin-icon.png';

const StyledBlock = styled.div`
  display: inline-block;
  text-align: left;
  width: 80%;

  p {
    padding: 0 0 0 5px;
    margin: 0;
  }

  .active {
    max-height: 400px;
    overflow-y: scroll;
  }
`;

const StyledButton = styled.button`
  background: none;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #d6d6d6;

  padding: 10px 0 20px 0px;

  font: inherit;
  font-size: 1.1em;
  font-weight: 500;

  width: 100%;
  text-align: left;

  :hover {
    background: #f57300;
    border-color: #b33e00;
    transition-duration: 0.25s;
  }

  img {
    max-width: 60px;
    margin-bottom: -7px;
  }

  &.option {
    padding: 5px 0 5px 10px;
    border: none;
    border-radius: 0;
  }
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
    background: #FBFBFE;
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
    let optionLst = [];
    let searchParams = new URLSearchParams(useLocation().search);

    options.forEach(item => {
      searchParams.set(type, item);

      let option =
        <li key={ item } value={ item }>
          <Link
            to={{ pathname: 'timetable', search: searchParams.toString() }}
          >
            <StyledButton
              className='option'
              onClick={ () => handleSelection(item) }
            >
              { item }
            </StyledButton>
          </Link>
        </li>;

      optionLst.push(option);
    });

    return optionLst;
  };

  return (
    <div>
      <StyledBlock>
        <p>{ title }</p>
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
        <StyledList className={active ? ' active' : ''}>
          { createOptionList() }
        </StyledList>
      </StyledBlock>
    </div>
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
