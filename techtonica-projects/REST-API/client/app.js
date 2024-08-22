//fetch data from backend
const fetchBattlecards = async () => {
    try {
        const response = await fetch(`http://localhost:5000/battlecards`);
        const data = await response.json();
        //console.log(data)
        displayBattleCards(data)
    } catch (error) {
        console.error('Failed to fetch battlecards:', error);
    }
};

//display data on frontend
const displayBattleCards = (data) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    data.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        cardElement.innerHTML = `
            <h2>${card.name}</h2>
            <p>Tier: ${card.tier}</p>
            <p>Attack: ${card.attack}</p>
            <p>Health: ${card.health}</p>
            <p>Abilities: ${card.abilities.join(', ')}</p>
        `;

        cardsContainer.appendChild(cardElement);
    });
}

// // Fetch and display battlecards when the page loads
window.onload = fetchBattlecards;