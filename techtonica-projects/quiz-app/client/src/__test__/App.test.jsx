
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../App';
import userEvent from "@testing-library/user-event";


test('renders without crashing', () => {
  render(<App />);
});

test('renders start button', () => {
  render(<App />);
  screen.getByRole('button'); 
})

