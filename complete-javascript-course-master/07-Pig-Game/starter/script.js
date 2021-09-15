'use strict';

//selection elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


let scores, currentScore, activePlayer, playing

//initialization
const init = () => {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true

    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active') //inizia sempre player0
    player1El.classList.remove('player--active')
}
init()

//switch player
const switchPlayer = () => {
    //swtich to the next player
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

//rolling dice functionalities
btnRoll.addEventListener('click', function () {
    if (playing) {
        //random number
        const dice = Math.trunc(Math.random() * 6) + 1
        //display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`
        //check for rolled
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        //add current score to active players's score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        //check if player score > 100 --> finish the game
        if (scores[activePlayer] >= 20) {
            //finish the game
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            diceEl.classList.toggle('hidden')

        } else {
            //switch to the next player
            switchPlayer()
        }
    }
})

btnNew.addEventListener('click', init)