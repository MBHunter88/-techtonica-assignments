// App.test.jsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../src/App';  // Adjust the path if needed
import '@testing-library/jest-dom'; // Provides matchers like toBeInTheDocument()

test('renders the Trivia App title', () => {
  // Render the App component
  render(<App />);
  
  // Check that the text "Trivia App" is present in the document
  expect(screen.getByText('Trivia App')).toBeInTheDocument();
});
