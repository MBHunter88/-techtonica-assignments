import React, { useState } from "react"
import "./App/App.css"
import witch from "./App/assests/witch.jpg"

const Store = ({ onReturnClick, health, setHealth, gold, setGold, inventory, setInventory, currentWeaponIndex, setCurrentWeaponIndex }) => {


  //weapons inventory
  const weapons = [
    {
      name: "Stick",
      power: 5
    },
    {
      name: "Dagger",
      power: 30
    },
    {
      name: "Claw-hammer",
      power: 50
    },
    {
      name: "Sword",
      power: 100
    },
    {} //added empty object to mitigate error for buying all weapons
  ]


  //buy items from store to add to inventory

  const buyItem = () => {
    // Check if there's a weapon available to buy
    if (currentWeaponIndex < weapons.length - 1) {
      if (gold >= 30) { // Check if enough gold
        const newWeapon = weapons[currentWeaponIndex + 1]; // Get the next weapon in the list
        setGold(gold - 30); // Deduct 30 gold from the player's total
        setInventory([...inventory, newWeapon]); // Add the new weapon to the inventory array
        setCurrentWeaponIndex(currentWeaponIndex + 1); // Update the index to point to the current weapon

        // Check if the next weapon is the last one
        if (currentWeaponIndex + 1 === weapons.length - 2) {
          alert("Congratulations! You have purchased the final weapon.");
        }
      } else {
        alert("Not enough gold!");
      }
    } else if (currentWeaponIndex === weapons.length - 1) {
      alert("You have purchased all available weapons.");
    }
  };




  console.log("Current Weapon :", weapons[currentWeaponIndex]);
  console.log("Next Weapon:", weapons[currentWeaponIndex + 1]);
  console.log("Inventory before:", inventory);




  //sell (remove) items from inventory 
  const sellItem = () => {
    if (inventory.length > 0) { //make sure there is at least one item to sell
      const lastItem = inventory.pop() // remove the last item from inventory
      setGold(gold + 15); //sell item for half the cost of original price
      setInventory([...inventory]); //update inventory state
      setCurrentWeaponIndex(currentWeaponIndex - 1) //decrement the currentWeapon by 1 to get previous weapon
    } else {
      alert("No items to sell!")
    }
  }

  //buy health for set amount of gold
  const buyHealth = () => {
    if (gold >= 10) {
      setGold(gold - 10)
      setHealth(health + 10)
    } else {
      alert("Not enough gold!")
    }
  }


  return (
    <>
      <div className="game-container">
        <h1>Store</h1>
        <p>Buy weapons and supplies.</p>
        <img src={witch} />
        <div className="player-stats">
          <p>Inventory: {inventory.length > 0 ? inventory.map(item => item.name).join(', ') : "Empty"}</p>
          <p>Gold: {gold}</p>
          <p>Health: {health}</p>

        </div>
        <div className="button-container">
          <button onClick={buyItem}>Buy {weapons[currentWeaponIndex + 1].name}</button>
          <button onClick={buyHealth}>Buy Health (10 Gold)</button>
          <button onClick={sellItem}>Sell Weapon</button>
        </div>
        <div className="return-container">
          <button onClick={onReturnClick}>Return to Town Hall</button>
        </div>
      </div>
    </>
  )
}

export default Store