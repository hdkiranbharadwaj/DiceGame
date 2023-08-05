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
  const instructions = `Welcome to the Dice Game!

  How to Play:
  - Two players take turns rolling a dice.
  - Goal: Be the first to reach an exact total of 20 points.
  - Roll a one, lose your turn's points, and the other player goes next.
  - Roll other numbers, choose to roll again or hold to add points.
  - Continue rolling until you hold or roll a one.
  - The player whose score exceeds 20 loses, declaring the other player the winner.

  Enjoy the excitement and have fun playing!`;

  alert(instructions);
}
showGameInstructions();

const init = function () {
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;

showGameInstructions();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
    
let notactive=activePlayer==1?0:1;
    document
    .querySelector(`.player--${notactive}`)
    .classList.remove('player--loser');
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
const otherwinner = function () {

document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
let notactive=activePlayer==1?0:1;
document.querySelector(`.player--${notactive}`).classList.add('player--loser');
document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
diceEl.classList.add('hidden');
}
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
let notactive=activePlayer==1?0:1;
document.querySelector(`.player--${notactive}`).classList.add('player--loser');
      diceEl.classList.add('hidden');
    }
else if (scores[activePlayer] > 20) {
      playing = false;
      switchPlayer();
      otherwinner();
}
       else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
