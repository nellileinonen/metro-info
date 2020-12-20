import './Station.css';

function Station({ stations, station, direction, stationHandler, directionHandler }) {

  const handleChange = () => {
    const newStation = document.getElementById("stationSelect").value;
    stationHandler(newStation);
  }

  return (
    <>
      <h1>Metrot <button onClick={ directionHandler }>{ direction }</button></h1>

      <select id="stationSelect" value={ station } onChange={ () => handleChange() }>
        {stations.map(item => (
          <option key={ item } value={ item }>{ item }</option>
        ))}
      </select>

    </>
  );
}

export default Station;
