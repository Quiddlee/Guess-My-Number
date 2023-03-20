'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const guessBtn = document.querySelector('.check');
  const message = document.querySelector('.message');
  const number = document.querySelector('.number');
  const scoreElem = document.querySelector('.score');
  const highScoreElem = document.querySelector('.label-highscore');
  let score = +scoreElem.textContent;
  let highScoreNum = 0;
  let guessingNum = Math.floor(Math.random() * 20);

  guessBtn.addEventListener('click', () => {
    const userInput = +guessBtn.previousElementSibling.value;
    console.log(userInput, guessingNum);

    if (guessingNum === userInput) {
      document.querySelector('body').style.backgroundColor = '#60b347';
      message.textContent = '🎉 Correct Number!';
      number.textContent = guessingNum;
      highScoreElem.textContent = `🥇 Highscore: ${ score > highScoreNum ?
                                                   score :
                                                   highScoreNum }`;
    }
    else {
      scoreElem.textContent = --score;
      if (userInput > guessingNum) {
        message.textContent = '📈 Too high!';
      }
      else {
        message.textContent = '📉 Too low!';
      }
    }
  });
});