'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const guessBtn = document.querySelector('.check');
  const message = document.querySelector('.message');
  const number = document.querySelector('.number');
  const scoreElem = document.querySelector('.score');
  const highScoreElem = document.querySelector('.label-highscore');
  const againBtn = document.querySelector('.again');
  const userInput = guessBtn.previousElementSibling;
  const body = document.body;
  const highScore = highScoreElem.firstElementChild;
  let score = +scoreElem.textContent;
  let guessingNum;

  if (localStorage.getItem('highScore')) {
    highScore.textContent = localStorage.getItem(
        'highScore');
  }

  const playAgain = () => {
    body.style.backgroundColor = '#222';
    userInput.value = '';
    scoreElem.textContent = score = 20;
    message.textContent = 'Start guessing...';
    number.textContent = '?';
    guessingNum = Math.floor(Math.random() * 20) + 1;
  };
  playAgain();

  guessBtn.addEventListener('click', () => {
    const userVal = +userInput.value;

    if (guessingNum === userVal) {
      body.style.backgroundColor = '#60b347';
      message.textContent = '🎉 Correct Number!';
      number.textContent = guessingNum;

      if (score > +highScore.textContent) {
        highScore.textContent = score;
        localStorage.setItem('highScore', score);
      }
    }
    else {
      if (score === 0) return playAgain();
      scoreElem.textContent = --score;
      message.textContent = userVal > guessingNum ?
                            '📈 Too high!' :
                            '📉 Too low!';
    }
  });

  againBtn.addEventListener('click', () => {
    playAgain();
  });
});