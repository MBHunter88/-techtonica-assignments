import React, { useState } from 'react'
import Question from './components/Questions'
import './App.css'

function App() {
const [question, setQuestion] = useState([])


  return (
    <>
      <h1>Hello World!</h1>
      <div>
      <Question question={question} setQuestion={setQuestion}/>
      </div>
    </>
  )
}

export default App
