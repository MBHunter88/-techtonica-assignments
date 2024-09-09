import React, { useState } from "react"
import "./App/App.css"
import dragonStartImg from "./App/assests/dragonbackground.png"

const StartMenu = ({ onStart }) => {
    return (
        <>
        <div className="game-container">
        <h1>Dragon Slayer</h1>
        <img src={dragonStartImg} />
        <p>The fate of the kingdom rests in your hands. 
          Begin your journey and prepare to face the challenges ahead. 
          Are you ready to step into the world of adventure, fight 
          fearsome creatures, and protect the realm?</p>
        <div className="button-container">
        <button onClick={onStart}>Start Game</button>
      </div>
      </div>
      </>
    );
  };
  
  export default StartMenu;
  