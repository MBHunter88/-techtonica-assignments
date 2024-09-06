import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import MainMenu from '../components/MainMenu';
import userEvent from "@testing-library/user-event";
import { AppContext } from '../helpers/Context';

const user = userEvent.setup();

//grab same mock data from api.test.js but utilize vitest instead of jest
const mockFetchQuestions = vi.fn(() => {
// Log when fetchQuestions is called
  console.log('Mock fetch called');  
  return Promise.resolve({
    json: () => Promise.resolve({
      results: {
        "category": "Entertainment: Music",
        "correct_answer": "The Bangles",
        "difficulty": "medium",
        "incorrect_answers": [
          "R.E.M.",
          "The Ocean Blue",
          "The Connells",
        ],
        "question": "Who was walking like an Egyptian in 1981?",
        "type": "multiple",
      }
    })
  });
});

test('button fetches data', async () => {
  // Render the MainMenu component with the mocked context
  render(
    <AppContext.Provider value={{ fetchQuestions: mockFetchQuestions }}>
      <MainMenu />
    </AppContext.Provider>
  );

  const buttonEl = screen.getByRole('button');

  // Simulate a button click and log after interaction
  await user.click(buttonEl);
  
  // Ensure fetchQuestions was called
  expect(mockFetchQuestions).toHaveBeenCalledTimes(1); 
});
