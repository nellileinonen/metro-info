import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Timetable from './Timetable';

let container = null;
beforeEach(() => {
  // Setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with empty metro timetable info', () => {
  act(() => {
    render(
      <Timetable metros={[]} station='Kulosaari' direction='west' />, container
    );
    expect(container.textContent).toBe('Ei tietoa lähtevistä metroista.');
  });
});

it('renders with empty metro timetable info on terminals', () => {
  act(() => {
    render(
      <Timetable metros={[]} station='Mellunmäki' direction='east' />, container
    );
    expect(container.textContent).toBe('Päätepysäkki. Ei lähteviä metroja haluttuun suuntaan.');
  });

  act(() => {
    render(
      <Timetable metros={[]} station='Vuosaari' direction='east' />, container
    );
    expect(container.textContent).toBe('Päätepysäkki. Ei lähteviä metroja haluttuun suuntaan.');
  });

  act(() => {
    render(
      <Timetable metros={[]} station='Matinkylä' direction='west' />, container
    );
    expect(container.textContent).toBe('Päätepysäkki. Ei lähteviä metroja haluttuun suuntaan.');
  });

  act(() => {
    render(
      <Timetable metros={[]} station='Tapiola' direction='west' />, container
    );
    expect(container.textContent).toBe('Päätepysäkki. Ei lähteviä metroja haluttuun suuntaan.');
  });
});