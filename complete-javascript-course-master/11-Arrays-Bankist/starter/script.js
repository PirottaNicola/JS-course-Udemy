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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
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

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  console.log(balance);
  labelBalance.textContent = `${balance} EUR`;
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

//event handler
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
    //DISPLAY MOVEMENTS
    displayMovements(currentAccount.movements);
    //DISPLAY BALANCE
    calcDisplayBalance(currentAccount.movements);
    //DISPLAY SUMMARY
    calcDisplaySummary(currentAccount);
  }
});

//its a bad practice to chain methods that mutate the original array
console.log('///////////////////END OF APPLICATION/////////////////');
///////////////////END OF APPLICATION/////////////////

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

console.log('////////////////////FINE TEORIA///////////////////');
