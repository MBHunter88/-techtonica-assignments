// cardsData.js
const battlegroundsCards = [
    {
        id: 1,
        name: "Alleycat",
        tier: 1,
        attack: 1,
        health: 1,
        abilities: ["Battlecry: Summon a 1/1 Cat"]
    },
    {
        id: 2,
        name: "Wrath Weaver",
        tier: 1,
        attack: 1,
        health: 3,
        abilities: ["After you play a Demon, deal 1 damage to your hero and gain +2/+2."]
    },
    {
        id: 3,
        name: "Murloc Tidehunter",
        tier: 1,
        attack: 2,
        health: 1,
        abilities: ["Battlecry: Summon a 1/1 Murloc Scout"]
    },
    {
        id: 4,
        name: "Old Murk-Eye",
        tier: 2,
        attack: 2,
        health: 4,
        abilities: ["Charge", "Has +1 Attack for each other Murloc on the battlefield."]
    },
    {
        id: 5,
        name: "Rat Pack",
        tier: 2,
        attack: 2,
        health: 2,
        abilities: ["Deathrattle: Summon a number of 1/1 Rats equal to this minion's Attack."]
    },
    {
        id: 6,
        name: "Zapp Slywick",
        tier: 4,
        attack: 7,
        health: 10,
        abilities: ["Windfury", "Attacks the lowest Attack minion."]
    },
    {
        id: 7,
        name: "Baron Rivendare",
        tier: 5,
        attack: 1,
        health: 7,
        abilities: ["Your minions trigger their Deathrattles twice."]
    },
    {
        id: 8,
        name: "Kangor's Apprentice",
        tier: 6,
        attack: 3,
        health: 6,
        abilities: ["Deathrattle: Summon two friendly Mechs that died this combat."]
    },
    {
        id: 9,
        name: "Voidlord",
        tier: 6,
        attack: 3,
        health: 9,
        abilities: ["Taunt", "Deathrattle: Summon three 1/3 Demons with Taunt."]
    },
    {
        id: 10,
        name: "Pogo-Hopper",
        tier: 2,
        attack: 1,
        health: 1,
        abilities: ["Battlecry: Gain +2/+2 for each other Pogo-Hopper you played this game."]
    }
];

export default battlegroundsCards;
