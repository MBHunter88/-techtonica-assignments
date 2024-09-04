import React, { useState } from 'react'


//create a fetch request to generate questions to display 

function Question() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
   // const [selectedAnswer, setSelectedAnswer] = useState()
    const [score, setScore] = useState(0)

    //shuffle array for questions/answers
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

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

            const allQuestions = shuffleArray(data.results)
            setQuestions(allQuestions); //updates questions from parsed data api request
            setCurrentQuestionIndex(0)
            console.log(allQuestions)
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
            setQuestions([]) //clears data on error
        }
    };

    //event handler to generate questions 
    const handleClick = () => {
        fetchQuestions()
    }

    //event handler to fetch next question
    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }

    //current question based on index 
    const currentQuestion = questions[currentQuestionIndex]

    //combine correct and incorrect answers in array
    const allAnswers = currentQuestion ? shuffleArray([currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]) : [];

    const handleAnswerSelection = (selectedAnswer) => {
        if(selectedAnswer === currentQuestion.correct_answer) {
          setScore(score + 1)
        }
        handleNextQuestion();
    }

    return (
        <>

            {questions.length === 0 && <button onClick={handleClick}>Generate Question</button>}
            {currentQuestion && currentQuestionIndex < questions.length - 1 && (
                <div>
                    <h2>Trivia Question {currentQuestionIndex + 1} out of {questions.length}</h2>
                    <h2>Score: {score}</h2>
                    <p><strong>Category:</strong> {currentQuestion.category}</p>
                    <p><strong>Question:</strong> {currentQuestion.question}</p>
                    <div className='answers'>
                        {allAnswers.map((answer, index) => (
                            <button onClick={() => handleAnswerSelection(answer)} key={index}>{answer}</button>
                        ))}
                    </div>
                
                </div>
            )}
        </>
    )
}

export default Question;