/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var totalScores, roundScore, activePlayer, gameRunning, finalScore;

initialiseGame();

/* Note: querySelector needs to know the type of element it needs to search for 
e.g. class (.) or id (#) whereas getElementById assumes it's an Id so we don't pass ./#
These two can be used interchangeably although they have their specific use. 
*/

document.querySelector(".btn-roll").addEventListener("click", rollDice);


function rollDice() {
    if (gameRunning) {
        // Random number
        var dice = Math.floor(Math.random() * 6) + 1; // +1 is to make it return 1 to 6 instead of the 0 to 5.
        // Display result

        var diceDOM = document.querySelector(".dice");
        diceDOM.src = "dice-" + dice + ".png";
        diceDOM.style.display = "block";
        console.log(dice);

        // Update the round score IF the random number was NOT a 1
        if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
}

document.querySelector(".btn-hold").addEventListener("click", hold);

function hold() {
    if (gameRunning) {

        // Add current score to global score
        totalScores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent =
            totalScores[activePlayer];
        // Check if player wins the game
        if (totalScores[activePlayer] >= 100) {

            // display win text
            document.querySelector("#name-" + activePlayer).textContent = "WINNER";

            // prevent buttons from being clickable
            document.querySelector(".btn-roll").style.display = "none";
            document.querySelector(".btn-hold").style.display = "none";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gameRunning = false;
        } else {
            nextPlayer();
        }
    }
}

document.querySelector(".btn-new").addEventListener("click", initialiseGame);

function nextPlayer() {
    // Next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

function initialiseGame() {
    totalScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameRunning = true;

    // reset names
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    // reset roundSCore
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    // reset total score
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    // reset dice, roll and hold buttons
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".btn-roll").style.display = "block";
    document.querySelector(".btn-hold").style.display = "block";

    // remove winner player visual style
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');

    // remove active player visual style
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');

    // apply active player to Player 1 because Player 1 is always first
    document.querySelector(".player-0-panel").classList.add('active');
}
