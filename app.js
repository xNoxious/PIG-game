/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector(".dice").style.display = "none";
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

/* Note: querySelector needs to know the type of element it needs to search for 
e.g. class (.) or id (#) whereas getElementById assumes it's an Id so we don't pass ./#
These two can be used interchangeably although they have their specific use. 
*/

document.querySelector(".btn-roll").addEventListener("click", rollDice);


function rollDice() {
    // 1.Random number
    var dice = Math.floor(Math.random() * 6) + 1; // +1 is to make it return 1 to 6 instead of the 0 to 5.
    // 2.Display result

    var diceDOM = document.querySelector(".dice");
    diceDOM.src = "dice-" + dice + ".png";
    diceDOM.style.display = "block";
    console.log(dice);

    // 3.Update the round score IF the random number was NOT a 1
    if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
        // next player
        activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
    }
}