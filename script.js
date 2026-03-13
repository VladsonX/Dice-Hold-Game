'use strict';

const player0 = {
  name: document.querySelector('#name--0'),
  scoreEl: document.querySelector('#score--0'),
  currentScoreEl: document.querySelector('#current--0'),
  section: document.querySelector('.player--0'),
};

const player1 = {
  name: document.querySelector('#name--1'),
  scoreEl: document.querySelector('#score--1'),
  currentScoreEl: document.querySelector('#current--1'),
  section: document.querySelector('.player--1'),
};

const players = [player0, player1];

const diceEl = document.querySelector('#dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnQuit = document.querySelector('.btn--quit');

// Menu
const menu = document.querySelector('#menu');
const playground = document.querySelector('#playground');
const logInForm = document.querySelector('#logIn');
logInForm.addEventListener('submit', newGame);
//

const scores = [];
let currentScore;
let activePlayerIndex;
let playing;

function switchPlayers() {
  currentScore = 0;
  players[activePlayerIndex].currentScoreEl.textContent = currentScore;

  players[activePlayerIndex].section.classList.remove('player--active');
  activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
  players[activePlayerIndex].section.classList.add('player--active');
}

function rollDice() {
  const numberOfDots = Math.floor(Math.random() * 6) + 1;
  renderDice(diceEl, numberOfDots);

  if (numberOfDots === 1) {
    switchPlayers();
    return;
  }

  currentScore += numberOfDots;
  players[activePlayerIndex].currentScoreEl.textContent = currentScore;
}

function renderDice(dice, numberOfDots) {
  dice.classList.remove('dnone');

  const diceRows = dice.querySelectorAll('.dice__row');
  const diceDots = dice.querySelectorAll('.dice__dot');
  diceRows.forEach(e => e.classList.remove('center', 'end'));
  diceDots.forEach(e => e.classList.remove('display'));

  dice.classList.add('rotate');
  setTimeout(() => {
    dice.classList.remove('rotate');
  }, 500);
  switch (numberOfDots) {
    case 1: //1
      diceRows[1].classList.add('center');

      diceDots[2].classList.add('display');
      break;
    case 2: // 2
      diceRows[2].classList.add('end');

      diceDots[0].classList.add('display');
      diceDots[5].classList.add('display');
      break;
    case 3: //3
      diceRows[1].classList.add('center');
      diceRows[2].classList.add('end');

      diceDots[0].classList.add('display');
      diceDots[2].classList.add('display');
      diceDots[5].classList.add('display');
      break;
    case 4: //4
      diceDots[0].classList.add('display');
      diceDots[1].classList.add('display');
      diceDots[4].classList.add('display');
      diceDots[5].classList.add('display');
      break;
    case 5: //5
      diceRows[1].classList.add('center');

      diceDots[0].classList.add('display');
      diceDots[1].classList.add('display');
      diceDots[2].classList.add('display');
      diceDots[4].classList.add('display');
      diceDots[5].classList.add('display');
      break;
    case 6: //6
      diceDots[0].classList.add('display');
      diceDots[1].classList.add('display');
      diceDots[2].classList.add('display');
      diceDots[3].classList.add('display');
      diceDots[4].classList.add('display');
      diceDots[5].classList.add('display');
      break;
    default:
      break;
  }
}

function holdDice() {
  scores[activePlayerIndex] += currentScore;
  players[activePlayerIndex].scoreEl.textContent = scores[activePlayerIndex];

  if (scores[activePlayerIndex] >= 100) {
    winGame(activePlayerIndex);
  } else {
    switchPlayers();
  }
}

function winGame(activePlayerIndex) {
  players[activePlayerIndex].section.classList.add('player--winner');
  players[activePlayerIndex].section.classList.remove('player--active');
  playing = false;
}

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  switch (e.key) {
    case 'Enter':
      if (playing) rollDice();
      break;
    case ' ':
      e.preventDefault();
      if (playing) holdDice();
      break;
    case 'r':
    case 'R':
      if (menu.classList.contains('dnone')) {
        newGame(e);
      }
      break;
    case 'Escape':
      if (playing) quitGame();
  }
});

btnRoll.addEventListener('click', () => {
  if (playing) rollDice();
});
btnHold.addEventListener('click', () => {
  if (playing) holdDice();
});
btnNew.addEventListener('click', newGame);
btnQuit.addEventListener('click', quitGame);

function quitGame() {
  playground.classList.add('dnone');
  menu.classList.remove('dnone');
  playing = false;
}
function newGame(e) {
  if (e) e.preventDefault();
  menu.classList.add('dnone');
  playground.classList.remove('dnone');
  const nickNames = document.querySelectorAll('.menu__input');

  player0.name.textContent = nickNames[0].value;

  player1.name.textContent = nickNames[1].value;

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  diceEl.classList.add('dnone');
  playing = true;

  players.forEach(player => {
    player.currentScoreEl.textContent = 0;
    player.scoreEl.textContent = 0;
    player.section.classList.remove('player--winner');
    player.section.classList.remove('player--active');
  });

  activePlayerIndex = 0;
  players[activePlayerIndex].section.classList.add('player--active');
}

// Menu
