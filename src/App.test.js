import ReactDOM from 'react-dom';
import App from './App';

it('renders without crahsing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
