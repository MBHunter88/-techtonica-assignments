import React, { useState, useContext } from 'react'
import Question from './components/Questions'
import MainMenu from './components/MainMenu'
import EndScreen from './components/EndScreen'
import { AppContext } from './helpers/Context'
import './App.css'

function App() {
  //state management to add to useContext hook
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  //fetch questions from trivia api 
  const fetchQuestions = async (difficulty) => {
    try {
      const response = await fetch(`/api/trivia?amount=10&difficulty=${difficulty}`); //fetch data from server.js

      //error handling to check for response from server
      if (!response.ok) { //if not ok (codes 200-299) throw error
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json();
      setQuestions(data.results); //updates questions from parsed data api request
      console.log(data.results)
      setCurrentQuestionIndex(0)
      setGameState('questions')

    } catch (error) {
      console.error('Error fetching trivia questions:', error);
      setQuestions([]) //clears data on error
    }
  };

  //useContext hook to be able to share state across components

  return (
    <>
      <div className='app-container'>
        <h1>Brain Buster!</h1>
        <AppContext.Provider value={{
          gameState,
          setGameState,
          score,
          setScore,
          questions,
          setQuestions,
          currentQuestionIndex,
          setCurrentQuestionIndex,
          fetchQuestions
        }}>
          {gameState === 'menu' && <MainMenu />}
          {gameState === 'questions' && <Question />}
          {gameState === 'end' && <EndScreen />}
        </AppContext.Provider>
      </div>
    </>
  )
}

export default App
