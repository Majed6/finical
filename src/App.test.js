import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Goal', () => {
  render(<App />);
  const linkElement = screen.getByText(/Goal/i);
  expect(linkElement).toBeInTheDocument();
});
