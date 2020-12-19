import './Timetable.css';

function Timetable({ metros }) {
  return (
    <table>
      <tbody>
      {metros.map(([depTime, dest, id]) => (
        <tr key={id}>
          <td>{depTime}</td>
          <td>{dest}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Timetable;
