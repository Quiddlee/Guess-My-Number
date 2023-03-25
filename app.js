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
  let guessedNum;
  let timeoutID;

  if (localStorage.getItem('highScore')) {
    highScore.textContent = localStorage.getItem('highScore');
  }

  const playAgain = () => {
    body.style.backgroundColor = '#222';
    userInput.value = '';
    scoreElem.textContent = score = 20;
    message.textContent = 'Start guessing...';
    number.textContent = '?';
    guessedNum = Math.floor(Math.random() * 20) + 1;
  };
  playAgain();

  guessBtn.addEventListener('click', () => {
    const userVal = +userInput.value;
    clearTimeout(timeoutID);

    if (!userVal) {
      timeoutID = setTimeout(() => message.textContent = 'Start guessing...',
                             3000);
      return message.textContent = '⛔ No number!';
    }

    if (guessedNum === userVal) {
      body.style.backgroundColor = '#60b347';
      message.textContent = '🎉 Correct Number!';
      number.textContent = guessedNum;

      if (score > +highScore.textContent) {
        highScore.textContent = score;
        localStorage.setItem('highScore', score);
      }
    }
    else {
      if (score === 0) return playAgain();
      scoreElem.textContent = --score;
      message.textContent = userVal > guessedNum ?
                            '📈 Too high!' :
                            '📉 Too low!';
    }
  });

  againBtn.addEventListener('click', playAgain);
});