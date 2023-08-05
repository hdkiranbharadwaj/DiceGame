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
  - This intriguing game involves two players who take turns rolling a dice.
  - The ultimate objective is for a player to achieve a precise total score of 20 points.
  - During your turn, gracefully tap the dice to initiate the roll.
  - In the event of rolling a one, alas, all accumulated points during that turn shall be relinquished, and the honor of the next turn shall be bestowed upon the opposing player.
  - Upon rolling any other number, a conundrum arises, presenting you with two choices:
    a. Embrace the fortune's favor and roll again, adding the newly rolled number to your current turn's score.
    b. Wisely opt to Hold, permitting the accumulation of points from your present turn to be gracefully added to your overall score, signifying the commencement of the other player's turn.
  - The pursuit of points can endure, as players maintain the liberty to continue rolling until they choose to Hold or encounter the fateful roll of a one.
  - Proceed with care, for only when you declare to Hold, the bounty of points shall be credited to your total score.
  - A momentous decree awaits those whose total score crosses the threshold of 20; they shall be proclaimed the unfortunate loser, granting the title of victor to the opposing player.

  Embrace the elegance of this game and savor the thrill of strategy and chance in each turn!

  Best wishes and enjoy the game!`;

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
