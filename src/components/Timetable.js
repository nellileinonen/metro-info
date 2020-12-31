import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: 1.6em;
  display: inline-block;
  width: 4.5em;
`;

function Timetable({ metros }) {
  return (
    <div>
        {metros.map(([id, depTime, dest]) => (
          <p key={id}>
            <StyledSpan>{depTime}</StyledSpan> {dest}
          </p>
        ))}
    </div>
  );
}

export default Timetable;
