
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';


test('renders without crashing', () => {
  render(<App />);
  const title = screen.getByText(/eventonica/i);
  expect(title).toBeTruthy();
});

test('fetches event list upon load', async () => {
  // ARRANGE:
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { name: 'Fairy Fest', date: 'January 12, 2025', category: 'Music', location: 'Compton' }
        ]),
    })
  );


  render(<App />);

  // ACT & ASSERT:
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
