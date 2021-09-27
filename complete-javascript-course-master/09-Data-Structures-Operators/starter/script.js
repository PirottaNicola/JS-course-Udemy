'use strict';

/*

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },
  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  },
  orderPizza: function (mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);

  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};


//destructuring arrays
const arr = [2, 3, 4]
const a = arr[0]
const b = arr[1]
const c = arr[2]

const [x, y, z] = arr
console.log(x, y, z)

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//switching variables
const temp = main
main = secondary
secondary = main
console.log(main, secondary)

[main, secondary] = [secondary, main]
console.log(main, secondary)


const [starter, mainCourse] = restaurant.order(2, 0)
console.log(starter, mainCourse)

//nested destructuring
const nested = [2, 4, [5, 6]]
// const [i, , j] = nested
// console.log(i, j)
const [i, , [j, k]] = nested
console.log(i, j, k)

//default values
const [p = 1, q = 1, r = 1] = [8, 9] //i set default values, to not get undefined if accessing and unexisting position of the array
console.log(p, q, r)


//deconstructuring objects
const { name, openingHours, categories } = restaurant //dont need to follow the order, but i have to write the exact names of the properties
console.log(name, openingHours, categories)

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant; //if i want to rename the variables differently from the object properties
console.log(restaurantName, hours, tags);

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters)

//mutating variables
let a = 111
let b = 999
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

//nested objects
const { fri: { open, close } } = openingHours;
console.log(open, close);



//example
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2
})




//the SPREAD OPERATOR ...
const arr = [7, 8, 9]
const badNewArr = [1, 2, arr[0], arr[1], arr[2]]
console.log(badNewArr);

const newArr = [1, 3, ...arr]
console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocchi']
console.log(newMenu);

//copy array
const mainMenuCopy = [...restaurant.mainMenu]

//join arrays
const joinedMenu = [...newMenu, ...mainMenuCopy]
console.log(joinedMenu);

//iterables
const str = 'jonas'
const letters = [...str, ' ', 'S.']
console.log(letters);
console.log(...str);
//console.log(`${...str}`); NO! didn't expect items separated by commas


//example
const ingredients = ['pasta', 'zucchine', 'gamberetti']

restaurant.orderPasta(...ingredients)

//objects
const newRestaurant = { ...restaurant, founder: 'Giuseppe', foundedIn: 1998 }
const restaurantCopy = { ...restaurant }
restaurantCopy.name = 'ristorante roma'
console.log(restaurantCopy.name);
console.log(restaurant.name); //we have done an effective copy (not nested objects!)

//destructuring with REST
//REST pattern --> collects elements that are unused in the destruscturing pattern
const [a, b, ...others] = [1, 2, 3, 4, 5]
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);//it doesnt include skipped elemets!

//REST with objects
const { sat, ...weekDays } = restaurant.openingHours
console.log(weekDays);//contains remaining days (everyone but sat)

//functions with REST
const add = function (...numbers) {
  console.log(numbers)
  let sum = 0
  for (let i = 0; i < numbers.length; i++) sum += numbers[i]
  console.log(sum);
}
add(2, 3)
add(2, 3, 5, 6)
add(34, 5, 6, 6, 3, 23, 2, 2, 2, 4)

const x = [23, 5, 7]
add(...x)


restaurant.orderPizza('mushroom', 'onion', 'olives', 'spinach')
restaurant.orderPizza('mushroom')

//so:  SPREAD on the right --> expand,  REST  on the left --> compress




//SHORT CIRCUITING
console.log('-----OR-----');//it short circuit when the fist value is TRUE

console.log(3 || 'Jonas'); //3 --> short circuit evaluation
console.log('', 'Jonas'); //jonas --> '' is a falsy value
console.log(true, 'Jonas'); //true
console.log(undefined || null); //null --> both falsy values
console.log(undefined || 0 || '' || 'Hello'); //hello --> it's the first not-falsy value

const guest1 = restaurant.numGuests ? restaurant.numGuests : 10
console.log(guest1); //10, becase restaurant.numGuests is falsy cause doesn't exists


console.log('-----AND-----');//it short circuit when the fist value is FALSE

console.log(0 && 'Jonas'); //0
console.log(7 && 'Jonas'); //jonas
console.log('Hello' && 23 && null && 'Jonas'); //at null, it short circuits the rest of the evaluation


if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach') //se esiste il metodo orderPizza, eseguilo
}
//possiamo fare la stessa cosa con lo short circuiting
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach')



restaurant.numGuests = 0
const guests = restaurant.numGuests || 10 //se il numGuests è 0 allora conta come falso e verrà imposto a 10, ma io non voglio questo comportamento!!! posso risolvere con il Nullish
console.log(guests);
//Nullish : prende come falsy values solo NULL e UNDEFINED, non '' o 0
const guestsCorrect = restaurant.numGuests ?? 10
console.log(guestsCorrect);
console.log(0 ?? null); // 0

//tutte le volte che 0 è uno dei possibili valori assumibili devo usare il Nullish operator!





//CODING CHALLENGE
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [[
    'Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski',
  ],
  [
    'Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze',
  ]
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...players) {
    const [...playersWhoScored] = game.scored //array di marcatori
    for (const i in playersWhoScored) {
      if (playersWhoScored.includes(players[i])) {
        console.log(`${players[i]} ha segnato ${playersWhoScored.filter(player => player === players[i]).length} goal${playersWhoScored.filter(player => player === players[i]).length > 1 ? 's' : ''} `)
      }
    }
  }
};

console.log('----BM----');
const [BMgk, , ...BMfieldPlayers] = [game.players[0][0], ...game.players[0]];
console.log(BMgk);
console.log(BMfieldPlayers);

console.log('----BD----');
const [BDgk, , ...BDfieldPlayers] = [game.players[1][0], ...game.players[1]]
console.log(BDgk);
console.log(BDfieldPlayers);

console.log('----ALL----');
const allPlayers = [BMgk, ...BMfieldPlayers, BDgk, ...BDfieldPlayers]
console.log(allPlayers);

console.log('---with substitutes---');
const playersBMfinal = allPlayers.slice(0, 11)
playersBMfinal.push('Thiago', 'Coutinho', 'Perisic')
console.log(playersBMfinal);


const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

game.printGoals('p1', 'p2', 'Lewandowski', 'Hummels')

team1 >= team2 && console.log('Borussia Dortmund') //se team1 < team2 --> team1
team1 <= team2 && console.log('Bayern Monaco') //se team1 > team2 --> team2




//looping in arrays: FOR OF loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
for (const item of menu) console.log(item);

//.entries()
console.log([...menu.entries()]);

for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}
//possiamo farlo molto meglio con il deconstructuring
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}



//ENHANCED OBJECT LITERALS
//now we can compute the fields names, and write objects cleaner
const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const hours = {
  [weekDays[1]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
}

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //openingHours: openingHours

  //-------------ES6 enhanced object literals-------------------
  hours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza(mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);
  },
};


//OPTIONAL CHAINING
//without
if (restaurant.hours && restaurant.hours.mon) console.log(restaurant.hours.mon.open);
//with optional chaining
console.log(restaurant.hours?.mon?.open);

for (const day of weekDays) {
  const open = restaurant.hours[day]?.open ?? 'closed'
  console.log(`on ${day} we open at ${open}`);
}

//methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exists');

//arrays
const users = [{ name: 'Jonas', email: 'hello@jonas' }]
console.log(users[0]?.name ?? 'user array empty');





//get the properties' names of an object
const properties = Object.keys(hours)
console.log(properties);

for (const day of Object.keys(hours)) {
  console.log(day);
}
//get the properties' values of an object
const propertiesValues = Object.values(hours)
console.log(propertiesValues);

for (const day of Object.values(hours)) {
  console.log(day);
}

const entries = Object.entries(hours)
console.log(entries);
for (const [key, { open, close }] of entries) {
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}



//CODING CHALLENGE
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [[
    'Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski',
  ],
  [
    'Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze',
  ]
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
}

//1
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}
//2
let sum = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  sum += odd
}
console.log(`the average of odds is ${sum / odds.length}`);

//3
for (const [team, odd] of Object.entries(game.odds)) {
  const teamString = team === 'x' ? 'draw' : `victory ${game[team]}`
  console.log(`odd of ${teamString}:  ${odd}`);
}




const ordersSet = new Set(['pasta', 'pizza', 'pizza', 'risotto', 'pasta', 'pizza'])
console.log(ordersSet);
console.log(new Set('Jonas'));
console.log(ordersSet.size);
console.log(ordersSet.has('pizza'));
ordersSet.add('garlic bread');
ordersSet.delete('risotto')
//ordersSet.clear()

for (const order of ordersSet) console.log(order)

//example
const staff = ['waiter', 'sheff', 'waiter', 'manager', 'chef', 'waiter']
const staffUnique = [...new Set(staff)]
console.log(staffUnique);


//MAP
const rest = new Map()
rest.set('name', 'Classico Italiano')
rest.set(1, 'Firenze, Italy')
rest.set(2, 'Lisbon, Portugal')
console.log(rest.set('categories', ['italian', 'pizzeria', 'vegetaria', 'organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open')
  .set(false, 'we are closed'))

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21
console.log(rest.get(time > rest.get('open') && time < rest.get('close')))

console.log(rest.has('categories'));
rest.delete(2)
//rest.clear()

const arr = [1, 2]
rest.set(arr, 'test')
rest.set(document.querySelector('h1'), 'heading')
console.log(rest);
console.log(rest.get(arr));
console.log(rest.size);

const question = new Map([
  ['question', 'what\'s the best programming language?'],
  [1, 'C'],
  [2, 'java'],
  [3, 'javascript'],
  ['correct', 3],
  [true, 'correctttt'],
  [false, 'try again']
])
console.log(question);
//i can quickly go from Object to Map
// const hoursMap = new Map(Object.entries(openingHours))

//quiz app
console.log(question.get('question'))
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`answwer ${key}: ${value}`);
}
//const answer = Number(prompt('your answer:'))
const answer = 3
console.log(answer);
console.log(question.get(question.get('correct') === answer))

//convert map to array
console.log([...question]);
console.log([...question.keys()])
console.log([...question.values()])




//CODING CHALLENGE!!!
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1- array with all types of different events
const eventTypes = [...new Set(gameEvents.values())]; //from map to set to array
console.log(eventTypes);

//2- remove minute's 64 yellow card
gameEvents.delete(64);
console.log(gameEvents);

//3
console.log(
  `an event occurred on average every ${90 / gameEvents.size} minutes`
);

//4
for (const [key, value] of gameEvents) {
  console.log(
    `${key < 45 ? '[ FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`
  );
}




//****************************STRINGS**************************
//strings are PRIMITIVES --> strings are IMMUTABLE
const airline = 'TAP air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('A320'[0]);
console.log(airline.length);
console.log('A320'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7)); //end value not included

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //+1 to not include the space

console.log(airline.slice(-2)); //slices from the end
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('you got the middle seat');
  else console.log('you got lucky');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas')); //now my string its an object with its methods.
//this is what js does to call methods on a string, and its called BOXING

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//fixing passenger name
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//comparing emails
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io \n';

//  const lowerEmail = loginEmail.toLowerCase();
// console.log(lowerEmail);
// const trimmedEmail = lowerEmail.trim(); //removes spaces and line terminators
// console.log(trimmedEmail); 
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

//replacing
const priceGB = '288,97@';
const priceUS = priceGB.replace('@', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'all passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate')); //will work in the future
console.log(announcement.replace(/door/g, 'gate')); //regular expression that selects
//all global occurencies of 'door'

//Booleans
const plane2 = 'A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.startsWith('Air'));
console.log(plane2.startsWith('A3'));
console.log(plane2.endsWith('neo'));

//check if baggage is allowed
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('gun') || baggage.includes('knife'))
    console.log('not allowed');
  else console.log('baggage allowed');
};
checkBaggage('i have a laptop, some FOOD and a PockEt Knife');
checkBaggage('socks and camera');
//SPLIT
console.log('a+very+nice+string'.split('+'));
const [firstName, lastName] = 'Jonas Pirotta'.split(' ');
//JOIN
const newName = ['mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');

//padding
const message = 'Go to gate 23';
console.log(message.padStart(25, '+'));
console.log('jonas'.padEnd(25, '+'));

const maskCreditCard = function (number) {
  const str = number + ''; //easy way to convert number to string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard('4523984578923475983475'));

//repeat
const message2 = 'bad weather... all departures delayed... ';
console.log(message2.repeat(5));

const planesInline = function (n) {
  console.log(`there are ${n} planes in line ${'💖'.repeat(n)}`);
};
planesInline(4);
planesInline(1);
planesInline(10);



//coding challenge 4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
//getting data when button pressed

function collectData() {
  const text = document.querySelector('textarea').value;
  let rows = text.split('\n');
  //delete spaces and put to lowerCase
  let rowsTrimLower = [];
  for (const s of rows) {
    rowsTrimLower.push(s.toLowerCase().trim());
  }
  //delete _ and uppercase the right letter
  let rowsCamelCased = [];
  for (const t of rowsTrimLower) {
    const i = t.indexOf('_');
    rowsCamelCased.push(
      t.slice(0, i) + t.charAt(i + 1).toUpperCase() + t.slice(i + 2)
    );
  }
  console.log(rowsCamelCased);
}
document.querySelector('button').addEventListener('click', collectData);


*/
