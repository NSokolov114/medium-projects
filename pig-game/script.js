'use strict';

// select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// resetting/starting a game

const scores = [0, 0];
let currentScore;
let activePlayer;
let playing;

const reset = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.getElementById('current--1').textContent = 0;
  document.querySelector('.player--1').classList.remove('player--winner');
  document.getElementById('current--0').textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

reset();

// rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate rnd number 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. diplay number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. switch to other player or add to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// keep current score

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check player's score >= 100
    if (scores[activePlayer] >= 100) {
      //  finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      //  switch active player
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
