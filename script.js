


'use strict';
//Selecting elements priorly
const player0El = document.querySelector('.player--0');
const player0E2 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;



// Function to display the game instructions in an alert dialog
function showGameInstructions() {
  const instructions = `Game Rules:
  1. Two players take turns rolling a dice.
  2. The goal is to be the first player to reach a total score of 20 points.
  3. On your turn, roll the dice by tapping on it.
  4. If you roll a one, you lose all the points accumulated during that turn, and your turn ends immediately. The control switches to the other player.
  5. If you roll any other number, you have two options:
     a. Roll again by tapping on the dice to add the rolled number to your current turn's score.
     b. Hold by tapping the "Hold" button. This adds the points from your current turn to your total score, and it becomes the other player's turn.
  6. Players can keep rolling until they decide to hold or roll a one.
  7. The accumulated points from each turn get added to your total score only if you choose to hold.
  8. The first player to reach or exceed a total score of 20 wins the game.

  Enjoy the game and have fun!`;

  alert(instructions);
}

// Call the function to show the game instructions when needed
showGameInstructions();

const init = function () {
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  player0El.classList.add('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player0E2.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] == 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
