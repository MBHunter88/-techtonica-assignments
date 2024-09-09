import React, { useState } from 'react';
import "./App/App.css"


//define Player
const Player = () => {

  //initialize all Player stats
  const [health, setHealth] = useState(100);
  const [gold, setGold] = useState(150);
  const [inventory, setInventory] = useState([]);
  const [xp, setXp] = useState(0);
  const [currentWeaponIndex, setCurrentWeaponIndex] = useState(-1);

  return {
    
    health,
    setHealth,
    gold,
    setGold,
    inventory,
    setInventory,
    xp,
    setXp,
    currentWeaponIndex,
    setCurrentWeaponIndex,
   
  };
};

export default Player;
