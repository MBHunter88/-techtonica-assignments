import React, { useContext } from 'react';
import { AppContext } from '../helpers/Context';


function EndScreen() {
    const { score, setScore, setGameState, setCurrentQuestionIndex, questions, setQuestions } = useContext(AppContext);

  //calculate final score 
const results = () => {
  let finalScore = score / questions.length * 100
  if( finalScore > 70 ) {
    return (`${finalScore}% Congrats! You're a human Google search.`)
  } else {
    return (`${finalScore}% Try again.`)
  }
}

//reset game by resetting states to default 
    const restartGame = () => {
        setScore(0); // Reset score
        setCurrentQuestionIndex(0); // Reset question index
        setQuestions([]); // Reset questions or refetch if needed
        setGameState('menu'); // Go back to main menu
    };

    return (
        <div className='end-screen'>
            <h2>Results</h2>
            <h3>Your Score: {score} / {questions.length} </h3>
            <p>{results()}</p>
            <button onClick={restartGame}>Restart Game</button>
        </div>
    );
}

export default EndScreen;
