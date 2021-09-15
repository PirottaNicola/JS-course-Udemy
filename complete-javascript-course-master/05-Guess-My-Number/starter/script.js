'use strict';

/* console.log(document.querySelector('.message').textContent)

document.querySelector('.message').textContent = 'Correct number!'
document.querySelector('.number').textContent = 13
document.querySelector('.score').textContent = 10

document.querySelector('.guess').value = 23
console.log(document.querySelector('.guess').value)
 */
let secretNumber = Math.trunc(Math.random() * 20) + 1

let score = 20;
let highScore = 0

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value)
    console.log(guess);

    if (score > 1) {
        if (!guess) {
            document.querySelector('.message').textContent = 'no number'
        }
        //se inserisco il numero corretto
        if (guess === secretNumber) {
            document.querySelector('.message').textContent = 'CORRECT NUMBER!!!'
            document.querySelector('body').style.backgroundColor = '#60b347'
            document.querySelector('.number').textContent = secretNumber
            if (highScore < score) {
                highScore = score
                document.querySelector('.highscore').textContent = score
            }

        }
        //più alto
        if (guess > secretNumber) {
            document.querySelector('.message').textContent = 'too high'
            score--
        }
        //più basso
        if (guess < secretNumber) {
            document.querySelector('.message').textContent = 'too low'
            score--
        }
        document.querySelector('.score').textContent = score
    } else {
        document.querySelector('.message').textContent = 'YOU LOST'
        document.querySelector('.score').textContent = 0
    }


    document.querySelector('.again').addEventListener('click', function () {
        secretNumber = Math.trunc(Math.random() * 20) + 1
        score = 20
        document.querySelector('body').style.backgroundColor = '#222'
        document.querySelector('.message').textContent = 'start guessing...'
        document.querySelector('.score').textContent = score
        document.querySelector('.guess').value = ' '
    })
})