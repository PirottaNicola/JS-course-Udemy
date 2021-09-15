'use strict';

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnsCloseModal = document.querySelector('.close-modal')
const btnsOpenModal = document.querySelectorAll('.show-modal')
console.log(btnsOpenModal);

const closeModal = () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
const openModal = () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', openModal);
}

btnsCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
    console.log(e); // the key who triggered the event listener
    if (e.key === 'Escape') {
        if (!modal.classList.contains('hidden')) closeModal()
    }
})