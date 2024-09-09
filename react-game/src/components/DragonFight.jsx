import React, { useState, useEffect } from "react"
import "./App/App.css"
import dragonimg from "./App/assests/dragonimg.jpg"

const DragonFight = ({ onReturnClick, health, setHealth, gold, setGold, inventory, xp, setXp, currentWeaponIndex, setMode }) => {
    const dragon = { name: 'Dragon', power: 20, health: 300 };
    const [isFighting, setIsFighting] = useState(false);

    const [enemy, setEnemy] = useState(null);
    const [enemyHealth, setEnemyHealth] = useState(null);
    const [enemyPower, setEnemyPower] = useState(null);

    // Initialize enemy stats when the enemy is set
    useEffect(() => {
        if (enemy) {
            setEnemyHealth(enemy.health);
            setEnemyPower(enemy.power);
        }
    }, [enemy]);

    const playerAttack = () => {
        if (isEnemyHit()) {
            const damage = inventory[currentWeaponIndex]?.power + Math.floor(Math.random() * xp);
            setEnemyHealth(prevHealth => prevHealth - damage);
            if (enemyHealth - damage <= 0) {
                alert(`${enemy.name} defeated! You gained XP and gold!`);
                setXp(xp + enemyPower);
                setGold(gold + 100); // More gold for defeating the dragon
                setIsFighting(false);
            }
        } else {
            alert("You missed!");
        }
        const enemyDamage = enemyAttackValue();
        setHealth(health - enemyDamage);
        if (health - enemyDamage <= 0) {
            alert("You have been defeated by the Dragon! The game will reset.");
            handleDefeat();
        }
    };

    const enemyAttackValue = () => {
        return enemyPower * 5 - Math.floor(Math.random() * xp);
    };

    const isEnemyHit = () => {
        return Math.random() > 0.2;
    };

    const handleDefeat = () => {
        setHealth(100);
        setEnemy(null);
        setIsFighting(false);
        setTimeout(() => {
            setMode('start');
        }, 2000);
    };

    return (
        <>
    <div className="game-container">
       <h1>Dragon Fight</h1>
       <p>Confront the mighty dragon in a battle for the kingdom.</p>
       <div className="player-stats">
      <p>Health: {health}</p>
      <p>Gold: {gold}</p>
      <p>XP: {xp}</p>
      <p>Current Weapon: {inventory.length > 0 ? inventory[currentWeaponIndex].name : "Empty"}</p>
      </div>
      {isFighting ? (
        <>
        <img src={dragonimg}/>
          <p>Dragon: {dragon.name} (Health: {dragon.health})</p>
          <div className="button-container">
          <button onClick={playerAttack}>Attack</button>
          <button onClick={() => setIsFighting(false)}>Run</button>
          </div>
        </>
      ) : (
        <div className="button-container">
       <button onClick={() => {
                        setEnemy(dragon);
                        setIsFighting(true);
                    }}>Fight Dragon</button>
        </div>
      )}
      <div className="return-container">
      <button onClick={onReturnClick}>Return to Town Hall</button>
      </div>
      </div>
        </>
    )
}

export default DragonFight