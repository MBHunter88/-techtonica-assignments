import React, { useState } from "react"
import "./App/App.css"
import wizard from "./App/assests/wizard.jpg"

const TownHall = ({ onEnterCave, onEnterStore, onEnterDragonFight, onReturnToStart }) => {
  return (
    <>
    <div className="game-container">
    <h1>Town Hall</h1>
    <p>This is the heart of your journey. From here, you can prepare for the battles ahead, 
      restock your supplies, or face your greatest challenge.</p><br>
      </br>
      <img src={wizard} />
      <p style={{color: "yellow"}}>Start in the store and buy some supplies.</p>
    <div className="button-container">
      <button onClick={onEnterStore}>Enter Store</button>
      <button onClick={onEnterCave}>Enter Cave</button>
      <button onClick={onEnterDragonFight}>Fight the Dragon</button>
    </div>
    <div className="return-container">
    <button onClick={onReturnToStart}>Return to Start Menu</button>
    </div>
    </div>
    </>
  );
};

export default TownHall;
