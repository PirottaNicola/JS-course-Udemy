'use strict';

/* 
//default parameters
const bookings = [];

const createBooking = function (
  flightNumber,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNumber,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 3);

//value vs reference
const flight = 'LH234';
const jonas = {
  name: 'jonas pirotta',
  passport: 2324231453541234,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 2324231453541234) {
    alert('checked in');
  } else alert('wrong password');
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// //is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

//quando passo un oggetto a una funzione,se lo modifico, modifico anche l'originale!!!
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000000);
};
newPassport(jonas);
checkIn(flight, jonas);

//JAVASCRIPT ONLY PASS PARAMETERS BY VALUE!!!
//javascript DOES NOT pass by reference




//first class functions, higher order functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
const transformer = function (str, fn) {
  console.log(`original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('javascript is the best', upperFirstWord);
transformer('javascript is the best', oneWord);

//js yuses callbacks all the time 
const high5 = function () {
  console.log('👍');
};
document.body.addEventListener('click', high5);

['jonas', 'marta', 'adam'].forEach(high5);



const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('hey');
greeterHey('jonas');
greeterHey('steven');
greet('hello')('jonas');

//try the same with arrow functions
const greet1 = greeting1 => name1 => console.log(`${greeting1} ${name1}`);
greet1('hi')('bob');


const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book : function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${(flightNum, name)}` });
  },
};

lufthansa.book(239, 'Jonas pirotta');
lufthansa.book(635, 'carol denver');

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

//call method
const book = lufthansa.book;
// book(23, 'sarah williams') //regular function -->this is UNDEFINED!!!
book.call(eurowings, 23, 'Sarah Williams'); //in the call method, the first argument specifies the 'this' keyword value
book.call(lufthansa, 239, 'Mary Cooper');

//apply method (if i have an array with parameters) [deprecated]
const flightData = [583, 'george orwell'];
// book.apply(lufthansa, flightData);
//instead of apply we use call with the spread operator
book.call(lufthansa, ...flightData);

//||||||||||||||||||||||||| bind method |||||||||||||||||||||||
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(23, 'steven spielberg');
bookLH(239, 'mariah carries me');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('marta mamma di clark');
bookEW23('ben zio di peter');

console.log(lufthansa);
console.log(eurowings);

//with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// const addVAT = value => value * 0.23; posso scriverlo meglio con .bind :
const addVAT = addTax.bind(null, 0.23); //se non ho bisogno di this, metto null



//coding challenge 1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    var choice = Number(
      prompt(`What\'s your favourite programming language?
      ${this.options[0]}
      ${this.options[1]}
      ${this.options[2]}
      ${this.options[3]}
      (write option number) `)
    );
    if (typeof choice === 'number' && choice >= 0 && choice <= 3) {
      this.answers[choice]++;
    }
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    switch (type) {
      case 'array':
        console.log(this.answers);
        break;
      default:
        console.log(`Poll results are ${this.answers.join(',')}`);
        break;
    }
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));


  
*/
//immediately invoked function expressions
(function () {
  console.log('this could never run again');
  const isPrivate = 23; //i cant access this encapsuled data from outside the function
})();

(() => console.log('this will also never run again'))();

//CLOSURES
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();
//a closure make the function remember all the variables present by the time it was created
//a function has access to all the variables in the execution context in which it was created
//EVEN AFTER THAT EXECUTION CONTEXT IS GONE!!!
console.dir(booker);

//closure examples #1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f(); //it works!

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
//re-assigning f function
h();
f();
console.dir(f);

//closure examples #2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups , each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //ignored, the closure has priority over the scope-chain
boardPassengers(100, 3);

//coding challenge 2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
//i can access header even if the iife was executed immediately after the page loaded,
//way before i clicked on the body. Even if the environment of the function
//is gon, i can access the variables that were present when it was born
