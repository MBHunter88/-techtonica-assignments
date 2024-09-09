//make sure the entire DOM loads before executing code
document.addEventListener('DOMContentLoaded', (event) => {
    //initialize variable to show initial stats and global variables for updated display
    let petHealth = 70;
    let petHappiness = 70;
    let alertText = "";
    let gameOverText = "";
    let petName = "";
    let currentAnimation = "neutral";

    //intialize variables for user input to name pet
    const petNameInput = document.getElementById('petNameInput');
    const submitNameButton = document.getElementById('submitName');
    const petNameDisplay = document.getElementById('petName');
    const nameInputSection = document.getElementById('nameInput');   
    //add event listener to submit name 
    submitNameButton.addEventListener('click', () => {
         petName = petNameInput.value.trim();   
         
        if (petName) {
            petNameDisplay.textContent = petName;
            petNameInput.value = ''; // Clear the input field
            nameInputSection.style.display = 'none'; //will hide display once name is submitted
        }
    });

    //update the display once conditions are met
    function updateDisplay() {
        const healthStat = document.getElementById("healthText");
        const happinessStat = document.getElementById("happinessText");
        const displayText = document.getElementById("text");
        healthStat.innerText = petHealth;
        happinessStat.innerText = petHappiness;
        petNameDisplay.innerText = petName;
        //call functions to update the innerText
        lowStatAlert();
        gameOver();
        //make sure that both alowStatAlert and gameOver don't display at the same time
        let combinedText = "";
        if (gameOverText !== "") {
            combinedText = gameOverText;
        } else {
            combinedText = alertText;
        }

        displayText.innerHTML = combinedText;
        //update the image of pet as the stats change
        updateAnimation();
        //clear the time interval to decrease stat
        clearHappinessDecreaseInterval();
        clearHealthDecreaseInterval();
    }
    //increase health by clicking on "feed" button and update the display 
    function increaseHealth() {
        if (petHealth < 100 && petHealth != 0) {
            petHealth += 3;
            updateDisplay();
        }
    }
    //increase happiness by clicking on "play" button and update the display 
    function increaseHappiness() {
        if (petHappiness < 100 && petHappiness != 0) {
            petHappiness += 3;
            updateDisplay();
        }
    }
    //increase both stats by cliking on "clean" button and update display 
    function increaseBothbyCleaning() {
        if ((petHappiness < 100 && petHappiness != 0) || (petHealth < 100 && petHealth != 0)) {
            petHappiness += 1;
            petHealth += 1;
            updateDisplay();
        }
    }

    //add event listeners to corresponding buttons
    document.getElementById("button1").onclick = increaseHealth;
    document.getElementById("button2").onclick = increaseHappiness;
    document.getElementById("button3").onclick = increaseBothbyCleaning;

    //call function 
    // updateDisplay();

    //set condtion for decreasing stats and update display
    function decreaseHealthStats() {
        if (petHappiness > 0) {
            petHappiness -= 1;
        }
        updateDisplay
    }
    function decreaseHappinessStats() {
        if (petHealth > 0) {
            petHealth -= 1;
        }
        updateDisplay();
    }

    //set interval for stat decrease
    let healthDecreaseInterval = setInterval(decreaseHealthStats, 600); //adjust for presentation 
    let happinessDecreaseInterval = setInterval(decreaseHappinessStats, 800); //adjust for presentation 

    //create alert when stats reach 20 
    function lowStatAlert() {
        //reset the alertText
        alertText = "";
        //make sure there is no gameOver alert displaying 
        if (gameOverText === "") {
            if (petHappiness < 20 && petHappiness > 0) {
                alertText = "Your pet is lonely! Click play to make them happy.";
            } else if (petHealth < 20 && petHealth > 0) {
                alertText = "Your pet is not feeling well! Feed and clean up their space to make them feel better.";
            }
        }
    }

    //clear the time interval once either stat reach 0
    function clearHealthDecreaseInterval() {
        if (petHealth == 0 || petHappiness == 0) {
            clearInterval(healthDecreaseInterval);
        }
    }
    function clearHappinessDecreaseInterval() {
        if (petHealth == 0 || petHappiness == 0) {
            clearInterval(happinessDecreaseInterval);
        }
    }

    //alert once stats reach 0 
    function gameOver() {
        //reset text
        gameOverText = "";
        if (petHappiness == 0) {
            gameOverText = "Your pet has run away";
        } else if (petHealth == 0) {
            gameOverText = "Your pet has died of starvation";
        } else {
            gameOverText = "";
        }
    }

   
 // Sprite animation code - AI generated and modified to run with original code
 const canvas = document.getElementById('petCanvas');
 const ctx = canvas.getContext('2d');
 const spriteSheet = new Image();
 spriteSheet.src = 'images/ai-spritesheet copy1.png';

 const FRAME_WIDTH = 512;
 const FRAME_HEIGHT = 512;
 const FRAME_COUNT = 4;

 //define frame sets for different states
 const ANIMATIONS = {
    happy: { x: 0, y: 0 },
    neutral: { x: 0, y: 1 },
    sick: { x: 1, y: 0 },
    sad: { x: 1, y: 1 }
};




 let currentFrame = 0;
 let animationSpeed = 500;
 let lastUpdateTime = Date.now();

 function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(spriteSheet,
        frameX * FRAME_WIDTH, frameY * FRAME_HEIGHT, // Source x, y
        FRAME_WIDTH, FRAME_HEIGHT, // Source width, height
        canvasX, canvasY, // Destination x, y
        FRAME_WIDTH, FRAME_HEIGHT); // Destination width, height
}


function animate() {
    const now = Date.now();
    const deltaTime = now - lastUpdateTime;

    if (deltaTime >= animationSpeed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const { x, y } = ANIMATIONS[currentAnimation];
        drawFrame(x, y, 0, 0);
        lastUpdateTime = now;
    }

    requestAnimationFrame(animate);
}


 function updateAnimation() {
    if (petHealth < 50 || petHappiness < 50) {
        currentAnimation = 'sad';
        animationSpeed = 800;
    } else if (petHealth < 20 || petHappiness < 20) {
        currentAnimation = 'sick';
        animationSpeed = 1000;
    } else if (petHealth > 80 && petHappiness > 80) {
        currentAnimation = 'happy';
        animationSpeed = 500;
    } else {
        currentAnimation = 'neutral';
        animationSpeed = 600;
    }
    console.log(`Current animation: ${currentAnimation}, Animation speed: ${animationSpeed}`);
}

 spriteSheet.onload = function() {
     console.log("Sprite sheet loaded successfully");
     canvas.width = FRAME_WIDTH;
     canvas.height = FRAME_HEIGHT;
     animate();
 };

 spriteSheet.onerror = function() {
     console.error("Failed to load sprite sheet");
 };

 

 // Function to simulate stats update
//  function updateStats() {
//      // Example logic to update stats
//      petHealth -= 10;
//      petHappiness -= 5;
//      updateAnimation();
//      updateDisplay();
//  }

//  // Simulate stats update every 3 seconds
//  setInterval(updateStats, 3000);

});
