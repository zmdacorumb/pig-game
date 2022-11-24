'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, current, activePlayer, gameStatus;
const init = () => {
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  gameStatus = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner', 'player--active');
  dice.classList.add('hidden');
};
init();

const changePlayer = () => {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//按下骰子按鈕
btnRoll.addEventListener('click', function () {
  if (gameStatus) {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${diceNum}.png`;
    dice.classList.remove('hidden');

    if (diceNum !== 1) {
      current += diceNum;

      document.getElementById(`current--${activePlayer}`).textContent = current;

      // player0El.classList.contains('player--active')
      //   ? (current0El.textContent = current)
      //   : (current1El.textContent = current);
    } else {
      changePlayer();
      // current = 0;
      // current0El.textContent = 0;
      // current1El.textContent = 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});

//按下HOLD
btnHold.addEventListener('click', function () {
  scores[activePlayer] += current;
  console.log(scores[activePlayer]);
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    gameStatus = false;
    dice.classList.add('hidden');
  } else {
    changePlayer();
  }

  //   if (score0El.textContent >= 100) {
  //     player0El.classList.add('player--winner');
  //   } else if (score1El.textContent >= 100) {
  //     player1El.classList.add('player--winner');
  //   } else {
  //     current = 0;
  //     current0El.textContent = 0;
  //     current1El.textContent = 0;
  //     player0El.classList.toggle('player--active');
  //     player1El.classList.toggle('player--active');
  //   }
});

//按下重置鈕

btnNew.addEventListener('click', init);
