import styled from 'styled-components';

const StyledTimeSpan = styled.span`
  font-size: 1.6em;
  display: inline-block;
  width: 4.5em;
`;

const StyledDestSpan = styled.span`
  display: inline-block;
  width: 5em;
`;

function Timetable({ metros }) {
  return (
    <div>
        {metros.map(([id, depTime, dest]) => (
          <p key={id}>
            <StyledTimeSpan>{depTime}</StyledTimeSpan> <StyledDestSpan>{dest}</StyledDestSpan>
          </p>
        ))}
    </div>
  );
}

export default Timetable;
