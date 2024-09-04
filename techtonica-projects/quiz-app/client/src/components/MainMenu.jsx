import React, { useState, useContext } from 'react'
import { AppContext } from '../helpers/Context';

function MainMenu() {
const {fetchQuestions} = useContext(AppContext)

const startQuiz = () => {
    setTimeout(fetchQuestions(), 1000)
}

  return (
    <>
      <div className='main-menu'>
        <button onClick={() => {startQuiz()}}>Start Quiz</button>
      <h1>Main Menu</h1>
      </div>
    </>
  )
}

export default MainMenu; 