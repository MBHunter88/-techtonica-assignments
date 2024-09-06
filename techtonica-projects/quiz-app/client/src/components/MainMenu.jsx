import React, { useContext } from 'react'
import { AppContext } from '../helpers/Context';



function MainMenu() {
    const { fetchQuestions } = useContext(AppContext)

    //function to fetch questions once game starts and delay transition to next gameState
    const startQuiz = () => {
        setTimeout(() => { fetchQuestions(), 1000 })

        

}
    

    return (
        <>
            <div className='main-menu'>
                <h2>The Ultimate Test of Brainpower!</h2>
                <button onClick={() => { startQuiz() }}>Start Quiz</button>
            </div>
        </>
    )
}

export default MainMenu; 