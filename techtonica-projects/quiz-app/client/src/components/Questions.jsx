import React, { useState } from 'react'


//create a fetch request to generate questions to display 

function Question({ question, setQuestion }) {
  
     //fetch trivia api 
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/trivia`); //fetch data from server.js
        console.log(response)
      //error handling to check for response from server
      if (!response.ok) { //if not ok (codes 200-299) throw error
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      const data = await response.json();
      const randomQuestion = data.results[Math.floor(Math.random() * data.results.length)]
      setQuestion(randomQuestion); //updates questions from parsed data api request
      console.log(randomQuestion)
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
      setQuestion([]) //clears data on error
    } 
  };
 
  const handleClick =  () => {
    fetchQuestions()
  }
  

  return (
    <>
     <h2>Trivia Question</h2>
      <button onClick={handleClick}>Generate Questions</button>
      {question && (
       <div>
       <p><strong>Category:</strong> {question.category}</p>
       <p><strong>Question:</strong> {question.question}</p>
     </div>
        
      )}
    </>
  )
}

export default Question;