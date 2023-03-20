'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const guessBtn = document.querySelector('.check');
  const message = document.querySelector('.message');
  const number = document.querySelector('.number');
  const scoreElem = document.querySelector('.score');
  const highScoreElem = document.querySelector('.label-highscore');
  const againBtn = document.querySelector('.again');
  const userInput = guessBtn.previousElementSibling;
  const body = document.querySelector('body');
  let score = +scoreElem.textContent;
  let guessingNum = Math.floor(Math.random() * 20);

  if (localStorage.getItem('highScore')) {
    highScoreElem.firstElementChild.textContent = localStorage.getItem(
        'highScore');
  }

  guessBtn.addEventListener('click', () => {
    const userVal = +userInput.value;
    console.log(userVal, guessingNum);

    if (guessingNum === userVal) {
      body.style.backgroundColor = '#60b347';
      message.textContent = '🎉 Correct Number!';
      number.textContent = guessingNum;

      const highScore = highScoreElem.firstElementChild;
      if (score > +highScore.textContent) {
        highScore.textContent = score;
        localStorage.setItem('highScore', score);
      }
    }
    else {
      scoreElem.textContent = --score;
      if (userVal > guessingNum) {
        message.textContent = '📈 Too high!';
      }
      else {
        message.textContent = '📉 Too low!';
      }
    }
  });

  againBtn.addEventListener('click', () => {
    body.style.backgroundColor = '#222';
    userInput.value = '';
    scoreElem.textContent = 20;
    score = 20;
    message.textContent = 'Start guessing...';
    number.textContent = '?';
  });
});