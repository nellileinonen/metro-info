import './App.css';
import Clock from './components/Clock.js';
import Timetable from './components/Timetable.js';

function App() {
  return (
    <div className="App">
      <Clock />
      <h1>Metrot itään</h1>
      <p>Tapiola</p>
      <Timetable />
    </div>
  );
}

export default App;
