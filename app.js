'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const guessBtn = document.querySelector('.check');
  const number = document.querySelector('.number');
  const againBtn = document.querySelector('.again');
  const message = document.querySelector('.message');
  const userInput = guessBtn.previousElementSibling;
  let score = 20;
  let guessedNum;
  let timeoutID;
  let loseTimeout;

  const displayMessage = msg => message.textContent = msg;
  const animateMessage = (state) => {
    if (state === 'falsy') {
      message.animate([
                        {transform: 'translateX(-.5rem)'},
                        {transform: 'translate(0, .2rem)'},
                        {transform: 'translate(.4rem, 0)'},
                        {transform: 'translate(-.1rem, -.1rem)'},
                        {transform: 'translate(0, .1rem)'},
                        {transform: 'translate(0, -.03rem)'},
                        {transform: 'translate(0, .01rem)'},
                        {transform: 'translate(0, 0rem)'},
                      ], {
                        duration: 400,
                      });
    }
    else if (state === 'true') {
      message.animate([
                        {scale: '1'},
                        {scale: '1.1 1.2', transform: 'translateX(-.5rem)'},
                        {scale: '1 0.9', transform: 'translateX(-.1rem)'},
                        {scale: '1', transform: 'translateX(0)'},
                        {scale: '1.01', transform: 'translateX(.2rem)'},
                        {scale: '1', transform: 'translateX(0)'},
                      ], {
                        duration: 400,
                      });
    }
  };
  const displayNumber = num => number.textContent = num;
  const displayScore = score => document.querySelector(
      '.score').textContent = score;
  const changeBackground = widthHeight => {
    document.querySelector('.background').style.cssText = widthHeight;
  };
  const displayHighScore = hScore => {
    const highScore = document.querySelector(
        '.highscore');

    if (hScore) {
      highScore.textContent = hScore;
    }

    return highScore.textContent;
  };

  if (localStorage.getItem('highScore')) {
    displayHighScore(localStorage.getItem('highScore'));
  }

  const playAgain = () => {
    clearTimeout(loseTimeout);
    loseTimeout = null;

    changeBackground('width: 0; height: 0;');
    userInput.value = '';
    displayScore(score = 20);
    displayMessage('Start guessing...');
    displayNumber('?');
    number.style.width = '15rem';
    guessedNum = Math.floor(Math.random() * 20) + 1;
  };
  playAgain();

  guessBtn.addEventListener('click', () => {
    const userVal = +userInput.value;
    clearTimeout(timeoutID);

    if (!userVal) {
      animateMessage('falsy');
      timeoutID = setTimeout(() => displayMessage('Start guessing...'),
                             3000);
      return displayMessage('⛔ No number!');
    }

    if (guessedNum === userVal) {
      animateMessage('true');
      changeBackground('width: 220rem; height: 220rem;');
      displayMessage('🎉 Correct Number!');
      displayNumber(guessedNum);
      number.animate([
                       {width: '15rem'},
                       {width: '31.5rem'},
                       {width: '29.9rem'},
                       {width: '30.1rem'},
                       {width: '30rem'},
                     ], {
                       duration: 400,
                     });
      number.style.width = '30rem';

      if (score > +displayHighScore()) {
        displayHighScore(score);
        localStorage.setItem('highScore', score);
      }
    }
    else {
      animateMessage('falsy');
      displayScore(--score);
      displayMessage(userVal > guessedNum ? '📈 Too high!' : '📉 Too low!');

      if (score <= 0) {
        displayScore(0);
        displayMessage('💥 You lose the game!');

        loseTimeout = loseTimeout ?
                      loseTimeout :
                      setTimeout(() => playAgain(), 3000);
      }
    }
  });

  againBtn.addEventListener('click', () => {
    if (number.style.width === '30rem') {
      number.animate([
                       {width: '30rem'},
                       {width: '14.5rem'},
                       {width: '15rem'},
                       {width: '15.3rem'},
                       {width: '14.9rem'},
                       {width: '15rem'},
                     ], {
                       duration: 300,
                     });
    }
    animateMessage('true');
    playAgain();
  });
});