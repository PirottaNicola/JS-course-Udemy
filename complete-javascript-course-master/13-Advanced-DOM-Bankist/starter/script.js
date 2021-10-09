'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



// 
// 
// 

//SELECT ELEMENTS
console.log(document.documentElement);
console.log(document.head);

const header = document.querySelector('.header')
const allSection = document.querySelectorAll('.section')
console.log(allSection);

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button')//returns an HTMLCollection, automatically updated
console.log(allButtons);

document.getElementsByClassName('btn')//live HTMLCollection

//CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML

const message = document.createElement('div') //created a div
message.classList.add('cookie-message') //adding class
message.textContent = 'We use cookies fo improved functionality and analytics'
message.innerHTML = 'We use cookies fo improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>'
header.prepend(message) //append inside the hader, as first child
header.append(message) //i cant add the same node more times, in this case i change the position of it
// header.prepend(message.cloneNode(true))//i can do it cloning my node

// header.before(message) //as sibling
// header.after(message)


//DELETING ELEMENTS
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove()
})


//STYLES
message.style.backgroundColor = '#37383d'
message.style.width = '120%'

console.log(message.style.color)//works only if i inline'styled the element
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

document.documentElement.style.setProperty('--color-primary', 'orangered')

//ATTRIBUTES
const logo = document.querySelector('.nav__logo')
console.log(logo.alt);//works only with standard attributes
console.log(logo.src);
console.log(logo.className);

console.log(logo.designer);
console.log(logo.getAttribute('designer')); //works with all attributes

logo.setAttribute('company', 'Bankist')

console.log(logo.src);//absolute path
console.log(logo.getAttribute('src'));//relative path

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j')
logo.classList.remove('c', 'j')
logo.classList.toggle('c')
logo.classList.contains('c')

//scroll
const section1 = document.querySelector('.section')

// section1.scrollIntoView({ behavior: 'smooth' })

//eventListeners
const h1 = document.querySelector('h1')
const alertH1 = function (e) {
  alert('addEventListener: great! you are reading the title')
  //se vuoi che venga eseguito solo una volta, .remove() qui
}
h1.addEventListener('', alertH1)

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1) //dopo 3 secondi rimuovi
}, 3000);


//----------- BUBBLING -------------------------------------------------------
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})` //rgb(255,255,255): composto da tre valori compresi tra 0 e 255

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target, e.currentTarget);//e.target è il PRIMO elemento sul quale è stato triggerato l'evento. Quindi l'elemento che abbiamo cliccato. e.currentTarget è invece l'elemento sul quale è stato attualmente triggerato l'evetntListener.

  //possiamo stoppare la propagazione dell'evento!
  // e.stopPropagation()
})
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  console.log('CONTAINER', e.target, e.currentTarget);
})
//quando clicco su un link, l'evento si propaga anche a nav__links che lo contiene! Cioè, cliccare su nav__link triggera anche l'eventListener di nav__links (BUBBLING). Quando invece clicco sulla barra dei link, questo non si propaga al singolo link!!!

//posso anche forzare l'eventLister a lavorare in CAPTURING invece che in BUBBLING, cioè a propagare l'evento dall'alto verso il basso (CAPTURING), invece che dal basso verso l'alto (BUBBLING), in questo modo:

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor()
//   console.log('CONTAINER', e.target, e.currentTarget);
// }, true) //di default è false (bubbling)



//EVENT DELEGATION
//invece che mettere un eventListener su ogni link, posso metterlo sulla navbar e poi seguire il link in base al' event.target, che punterà all'effettivo link sul quale ho schiacciato

//add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()
  console.log(e.target);//the actual link i've clicked

  //if i clicked the navbar and not a link, do nothing, else go to section
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})
//event delegation is even more useful when i've to react to events that happens on elements not present when the page first loads


//DOM TRAVERSING
//already selected h1 previously

//going downwards: child
console.log(h1.querySelectorAll('.highlight'));//in this case querySelector search only between the child elements of h1
console.log(h1.childNodes);//getting all children (even not-element nodes, like text)
console.log(h1.children)//getting all child nodes (not text)

//going upwards
console.log(h1.parentNode);//direct parent (node)
console.log(h1.parentElement);//direct parent (even if not a node)

h1.closest('.header').style.background = 'var(--gradient-secondary)'//selects the closest parent with that specific class
h1.closest('h1').style.background = 'var(--gradient-primary)'

//going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el != h1) el.style.transform = 'scale(1.1)'
})


//a TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')//to get the button even if i click on the text inside

  //Guard close
  if (!clicked) return; //do nothing if clicked is null (if i clicked outside the buttons)

  tabs.forEach((t) => t.classList.remove('operations__tab--active'))//make the other buttons go down before rising the selected one
  clicked.classList.add('operations__tab--active')

  //hide the others content areas
  tabContent.forEach((t) => t.classList.remove('operations__content--active'))
  //activate the right content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})



//fade menu buttons when hover one
const nav = document.querySelector('.nav')

const handleHover = function (e, opacity) {

  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }

}
//passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5))//bind returns a copy of the given function with the specified 'this' value 
nav.addEventListener('mouseout', handleHover.bind(1))


//sticky navigation (BAD)
const initialCoords = section1.getBoundingClientRect()
console.log(initialCoords);

window.addEventListener('scroll', function (e) {//scroll is not very efficent, avoid if u can

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
})


//Intersection Observer API
const obsCallback = function (entries, observer) {
  //will be called everytime the observer intersect the root element at the threshold percentage
  entries.forEach(entry => console.log(entry))
}
const obsOptions = {
  root: null, //null indicates the whole viewport
  threshold: [0, 0.2]//appena entrato, dopo il 20%
}
const observer = new IntersectionObserver(obsCallback, obsOptions)//observes when the intersection occurrs
observer.observe(section1)



//sticky navigation (GOOD)
const head = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})
headerObserver.observe(head)


//reveal elements when they enter the viewport
const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
});


//lazy loading images
//laod images only when come into the viewport
const imgTargets = document.querySelectorAll('img[data-src]')//tutte le img con la proprietà data-src
const loadingImg = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })

  imgObserver.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))



//efficient script loading: DEFER and ASYNC
