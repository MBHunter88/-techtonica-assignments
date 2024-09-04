import React, { useContext } from 'react';
import { AppContext } from '../helpers/Context';

function EndScreen() {
    const { score, setScore, setGameState, setCurrentQuestionIndex, questions, setQuestions } = useContext(AppContext);

const results = () => {
  let calc = score / questions.length * 100
  if( calc > 70 ) {
    return(`${calc}% You are so smart!`)
  } else {
    return (`${calc}% You may want to study...`)
  }
}


    const restartGame = () => {
        setScore(0); // Reset score
        setCurrentQuestionIndex(0); // Reset question index
        setQuestions([]); // Reset questions or refetch if needed
        setGameState('menu'); // Go back to main menu
    };

    return (
        <div>
            <h2>Quiz Finished!</h2>
            <h3>Your Score: {score} / {questions.length} </h3>
            <p>{results()}</p>
            <button onClick={restartGame}>Restart Game</button>
        </div>
    );
}

export default EndScreen;
