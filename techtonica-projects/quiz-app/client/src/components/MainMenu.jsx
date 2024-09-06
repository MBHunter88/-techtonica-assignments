import React, { useState, useContext } from 'react';
import { AppContext } from '../helpers/Context';

function MainMenu() {
  const { setGameState, fetchQuestions } = useContext(AppContext);
  const [difficulty, setDifficulty] = useState('easy');

  //update function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchQuestions(difficulty); // Pass difficulty to fetch questions
    setGameState('questions');
  };

  return (
    <div className="main-menu">
     <h2>The Ultimate Test of Brainpower!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
}

export default MainMenu;
