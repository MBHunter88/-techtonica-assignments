import React, { useState, useEffect } from "react"
import "./App/App.css"
import murlocimg from "./App/assests/murloc.png"
import sludgerimg from "./App/assests/sludger.png"

const Cave = ({ onReturnClick, health, setHealth, gold, setGold, inventory, setMode, xp, setXp, currentWeaponIndex }) => {
     console.log("Current Weapon Index in Cave:", currentWeaponIndex);
     console.log("Current Weapon Object in Cave:", inventory[currentWeaponIndex]);

    const caveEnemies = [
        { name: 'Sludger', power: 2, health: 15 },
        { name: 'Murloc', power: 8, health: 60 },
    ];
    const [isFighting, setIsFighting] = useState(false);
    const [enemy, setEnemy] = useState(null);
    const [enemyHealth, setEnemyHealth] = useState(null)
    const [enemyPower, setEnemyPower] = useState(null)
    
    // Use effect to initialize enemy stats when the enemy is set
    useEffect(() => {
        if (enemy) {
            setEnemyHealth(enemy.health);
            setEnemyPower(enemy.power);
        }
    }, [enemy]);

    //function to hold logic for player attack
    const playerAttack = () => {
        if (!inventory[currentWeaponIndex]){
            alert("You don't have a weapon, go to the store buy one")
        }
        if (isEnemyHit()) { //if hit is landed
            const damage = inventory[currentWeaponIndex]?.power + Math.floor(Math.random() * xp) //number of damage = the weapon power level + the calculated player xp
            setEnemyHealth(prevHealth => prevHealth - damage) //subtract damage from current health to update state
            if (enemyHealth - damage <= 0) {
                alert(`${enemy.name} defeated! You gained XP and gold!`)
                setXp(xp + enemyPower);
                setGold(gold + 20);
                setIsFighting(false)
            } 
            //test
            console.log("Enemy Health:", enemyHealth);
            console.log("Damage to be dealt:", damage);
            console.log("Inventory:", inventory);
            console.log("Current xp:", xp);

        } else {
            alert("you missed!")
        }
        const enemyDamage = enemyAttackValue();
        setHealth(health - enemyDamage)
        if (health - enemyDamage <= 0) {
            alert("You have been defeated! The game will reset.")
            handleDefeat()
        }
    };

    //get enemy attack value based on enemy power and player xp
    const enemyAttackValue = () => {
        return enemyPower * 5 - Math.floor(Math.random() * xp)
    };

    //set 80% chance of player hitting enemy
    const isEnemyHit = () => {
        return Math.random() > 0.2
    };


    // player loses fight once health reaches 0 then game will reset
    const handleDefeat = () => {
        setHealth(100); // Reset player's health
        setEnemy(null); // Clear the current enemy
        setIsFighting(false); // Exit fight mode
        setTimeout(() => {
            setMode('start'); // Return to Start Menu
        }, 2000); // Wait for 2 seconds before returning to start
    }



    return (

        <>
        <div className="game-container">
            <h1>Cave</h1>
            <p>Face the monsters lurking in the dark.</p>
            <div className="player-stats">
            <p>Health: {health}</p>
            <p>Gold: {gold}</p>
            <p>XP: {xp}</p>
            <p>Current Weapon: {inventory.length > 0 ? inventory[currentWeaponIndex].name : "Empty"}</p>
            </div>
            
            {isFighting ? (
                <>
  
                    <p>Enemy: {enemy.name} (Health: {enemyHealth})</p>
                    <div className="button-container">
                        <button onClick={playerAttack}>Attack</button>
                        <button onClick={() => setIsFighting(false)}>Run</button>
                    </div>
                </>
            ) : (
                <>
              <img src={sludgerimg} />
                __
              <img src={murlocimg} />
                    <div className="button-container">
                        <button onClick={() => {
                            setEnemy(caveEnemies[0]);
                            setIsFighting(true)
                        }}>Fight Sludger</button>
                        <button onClick={() => {
                            setEnemy(caveEnemies[1]);
                            setIsFighting(true)
                        }}>Fight Murloc</button>
                        
                    </div>
                    <div className="return-container">
                        <button onClick={onReturnClick}>Return to Town Hall</button>
                    </div>
                    
                </>
            )}
            </div>
        </>
    );

}
export default Cave