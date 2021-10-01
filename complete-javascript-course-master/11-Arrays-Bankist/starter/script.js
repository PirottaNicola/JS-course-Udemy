'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //i use slice cause i dont want to modify the orignal array

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value"</div>${mov}€
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//compute the usernames
const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');

    return acc.userName;
  });
};
createUsername(accounts);
console.log(accounts);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${account.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  //DISPLAY MOVEMENTS
  displayMovements(acc.movements);
  //DISPLAY BALANCE
  calcDisplayBalance(acc);
  //DISPLAY SUMMARY
  calcDisplaySummary(acc);
};

//event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent from submitting
  e.preventDefault();
  //login
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //!!! optional chaining to execute only if the account exists !!!
    //DISPLAY UI AND MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //CLEAR INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//transferring money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.userName === inputTransferTo.value
  );
  //clear fields
  inputTransferAmount.value = inputTransferTo.value = '';

  //transfer condition test
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.userName !== currentAccount.userName
  ) {
    //doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add the movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//
//
//
//
//its a bad practice to chain methods that mutate the original array
console.log('///////////////////END OF APPLICATION/////////////////');
///////////////////END OF APPLICATION/////////////////
//
//
//
//
//
//
//
//ARRAY METHODS
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); //end index not included
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice()); //same as
console.log([...arr]); //this
//.splice()    -->   changes the original array
console.log(arr.splice(2));
console.log(arr); //splice mutates the orignal array!!!
//.reverse()   -->   changes the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'k', 'l', 'm', 'n'];
console.log(arr2.reverse());
console.log(arr2);
//.concat()
const letters = arr.concat(arr2);
console.log(letters); //same as
console.log(...arr, ...arr2); //this
//.join()
console.log(letters.join(' - '));

movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} you deposited ${movement}`);
  } else {
    `Movement ${i + 1} You withdrew ${Math.abs(movement)}`;
  }
}
console.log('------FOREACH-------');
movements.forEach((mov, i, arr) => {
  //always in this order: element, index, Array on which we are looping
  if (mov > 0) {
    console.log(`Movement ${i + 1} you deposited ${mov}`);
  } else {
    `Movement ${i + 1} You withdrew ${Math.abs(mov)}`;
  }
});
//0: function(200)
//1: function(450)
//2: function(400)
//...

// forEach with sets and maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

//Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, _, set) => {
  //key is useless, set doenst have indexes
  console.log(`${value}: ${value}`);
});

//coding challenge #1
const chekDogs = function (dogsGiulia, dogsKate) {
  const correctData = [dogsGiulia.slice(1, dogsGiulia.length - 2), dogsKate];
  const giulia = [...correctData[0]];
  const kate = [...correctData[1]];

  giulia.forEach((dog, key) => {
    console.log(
      `Dog number ${key} of Giulia is ${
        dog > 3 ? 'an adult' : 'a puppy'
      }, and is ${dog} years old`
    );
  });
  kate.forEach((dog, key) => {
    console.log(
      `Dog number ${key} of Kate is ${
        dog > 3 ? 'an adult' : 'a puppy'
      }, and is ${dog} years old`
    );
  });
};
chekDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

//.map()  .filter()  .reduce()
console.log(
  [4, 1, 15, 8, 3].map(element => {
    return element / 2;
  })
);
console.log(
  [4, 1, 15, 8, 3].filter(element => {
    return element > 10;
  })
);
console.log(
  [4, 1, 15, 8, 3].reduce((previous, current) => {
    return previous + current;
  })
);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const withdrawals = movements.filter(mov => mov < 0);

const balance = movements.reduce((acc, cur) => {
  //acc = accumulator
  return acc + cur; //we return the new value of the accumulator
}, 0); //initial value of the accumulator

//maximum value
console.log(movements);
const maximum = movements.reduce(
  (acc, cur) => (cur > acc ? cur : acc),
  movements[0]
);
console.log(maximum);

//CHAINING map filter and reduce
const eurToUsd = 1.1;
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

//.find() method
//retrieve first element of an array based on a filter
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//.some()
const anyDeposits = movements.some(mov => mov > 2000);
console.log(anyDeposits);

//.every()
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//.flat()
const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr3.flat());
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep); //doenst work anymore, i have to specify the depth
console.log(arrDeep.flat(2));

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//.flatMap()
const overalBalance2 = accounts
  .flatMap(acc => acc.movements) //combines map and flat. it's better for performance, but goes only one-level deep
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//.sort()
const owners = ['jonas', 'zach', 'adam', 'martha'];
console.log(owners.sort());
console.log(movements);
console.log(movements.sort()); //doesnt work couse sort() converts everything to strings

//return < 0: A,B (KEEP ORDER)
//return > 0: B,A (SWITCH ORDER)
movements.sort((a, b) => (a > b ? 1 : -1)); //ascending order
console.log(movements);
movements.sort((a, b) => (a < b ? 1 : -1)); //descending order
console.log(movements);

//.fill()
const x = new Array(7);
console.log(x);
x.fill(1);
console.log(x);
x.fill(222, 3, 5); //value, firstIndex, lastIndex
console.log(x);

//Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); //(current, index)
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});

//
//
//
//PRACICING WITH ARRAYS
//1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

//2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0); //count how many cur>=1000
console.log(numDeposits1000);
//prefixed ++ operator
let a = 10;
console.log(a++);
console.log(++a);

//3
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

//4
//this is a nice title --> This Is a Nice Title
const toTitleCase = function (title) {
  const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and']; //do not capitalize theese

  const capitalize = word => word[0].toUpperCase() + word.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (expections.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase); //always capitalize first letter of title
};
console.log(toTitleCase('this is a nice title'));
console.log(toTitleCase('this is LONG title but not too long'));
console.log(toTitleCase('an amaing title but on fire'));

//////////////////////coding challenge 4/////////////////////////////
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
const findRightQuantity = function (dogsArray) {
  dogsArray.forEach((dog, index) => {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
    console.log(dog);
  });
};
findRightQuantity(dogs);

//2
const judgeSarahsDog = function (dogsArray) {
  const sarah = dogs.find(dog => dog.owners.includes('Sarah'));
  console.log(
    `sarah's dog ${
      sarah.curFood > sarah.recommendedFood
        ? `is eating ${
            sarah.curFood - sarah.recommendedFood
          }g of food more than needed`
        : 'is eating right'
    }`
  );
};
judgeSarahsDog(dogs);

//3
const eatsTooMuch = dog => (dog.curFood > dog.recommendedFood ? true : false);
const ownersEatTooMuch = dogs
  .filter(dog => eatsTooMuch(dog))
  .map(dog => dog.owners) //voglio che a ogni cane che mangi troppo corrisponda il suo padrone
  .flat(); //da nested array a array normale
console.log(ownersEatTooMuch);

//4
console.log(`${[...ownersEatTooMuch].join("'s and ")}'s dogs eat too much!`);

//5

//
//
//
console.log('//////////////////// FINE TEORIA ///////////////////');
