import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';





  test('renders contact list fetched from database', async () => {
      // ARRANGE:
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
            { name: 'Harry Potter', email: 'test@hogwarts.com', phone: '123456789' }
        ]),
    })
  );

  render(<App />);

  // ACT & ASSERT:
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  })



