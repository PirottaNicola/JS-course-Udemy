/* 'use strict';

let hasDriverLicense = false
const passTest = true

if (passTest) hasDriverLicense = true
if (hasDriverLicense) console.log('i can drive')



//FUNCTIONS
function logger() {
    console.log('i am a function!')
}
logger() // invoking/calling/running the function

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges)
    const juice = `juice with ${apples} apples and ${oranges} oranges`
    return juice
}

console.log(fruitProcessor(5, 0))
console.log(fruitProcessor(2, 3))



//function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear
}
const age1 = calcAge1(1997)
console.log(age1)

//function expression
const calcAge2 = function (birthYear) { //anonymous function
    return 2037 - birthYear
}
const age2 = calcAge2(1992)
console.log(age2)

//arrow function
const calcAge3 = (birthYear) => { return 2037 - birthYear } // with curly braces u have to explicitly return a value
console.log(calcAge3(1993))

const calcAge4 = (birthYear) => (2037 - birthYear)// with parenteses the return is implicit
console.log(calcAge4(1991))



const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear
    const retirement = 65 - age
    return `${firstName} retires in ${retirement}`
}
console.log(yearsUntilRetirement(1990, 'bob'))



function cutFruitPieces(fruit) {
    return fruit * 4
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples)
    const orangePieces = cutFruitPieces(oranges)
    const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`
    return juice
}
console.log(fruitProcessor(2, 3))



const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3

const team1Score = calcAverage(20, 50, 90)
const team2Score = calcAverage(17, 4, 14)
console.log(`team 1 score: ${team1Score}
team 2 score: ${team2Score}`)

const winCheck = (team1Average, team2Average) => {
    if ((team1Average / team2Average) >= 2) {
        console.log('team 1 wins')
    }
    else if ((team2Average / team1Average) >= 2) {
        console.log('team 2 wins')
    }
    else console.log('noone wins')
}
winCheck(team1Score, team2Score)


//ARRAYS
const friends = ['micheal', 'steven', 'peter']
console.log(friends)

console.log(friends[0])
console.log(friends[2])

console.log(friends.length)
console.log(friends[friends.length - 1]) //pick last element of the array

friends[2] = 'john'
console.log(friends[2]) //with CONST, only PRIMITIVE values will be immutable!!!, arrays are not primitive values!!!

const jonas = ['jonas', 'fumagalli', 2037 - 1991, 'teacher', friends]
console.log(jonas)


function calcAge1(birthYear) {
    return 2037 - birthYear
}
const years = [1990, 1889, 1991, 1998]
console.log(calcAge1(years[0]))
console.log(calcAge1(years[1]))
console.log(calcAge1(years[2]))
console.log(calcAge1(years[3]))

const ages = [calcAge1(years[0]), calcAge1(years[1]), calcAge1(years[2]), calcAge1(years[3])]



const friends = ['micheal', 'steven', 'peter']

//add elements
const newLength = friends.push('Jay') //add element as last of the original array, return the new lenght
console.log(friends, newLength)

friends.unshift('Jacob') //add element as first of the orignal array and return the new length
console.log(friends)

//remove elements
const popped = friends.pop() //remove the last element and returns it
console.log('i removed ' + popped + ' so the new array is ' + friends)

const shifted = friends.shift() //rmeove the first element and returns it
console.log('i removed ' + shifted + ' so the new array is ' + friends)

//search
console.log(friends.indexOf('steven')) //strict comparison
console.log(friends.includes('peter')) //strict comparison


const bill = [20, 200, 300, 400]
const tip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20

const tips = [tip(bill[0]), tip(bill[1]), tip(bill[2]), tip(bill[3])]
console.log(tips)


//OBJECTS

const jonasObject = { //object literal syntax
    firstName: 'Jonas',
    lastName: 'Fumagalli',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['micheal', 'peter', 'steven'],
    newObject: {
        name: 'nicola',
        surname: 'pirotta'
    },
    hasDriverLicense: true,
    calcAge: function name(params) { //we need an expression
        return 2037 - age
    }
}
console.log(jonasObject)

console.log(jonasObject.age) //dot notation
console.log(jonasObject['age'])//bracket notation. Biggest difference, we can compute the value to search
const nameKey = 'Name'
console.log(jonasObject['first' + nameKey])

const interestedIn = prompt('what do u want to know about jonas? choose between firstName, lastName, age, job, friends')

if (jonasObject[interestedIn]) console.log(jonasObject[interestedIn])
else console.log('wrong request')

//add fields
jonasObject.location = 'italy'
console.log(jonasObject)

console.log(`${jonasObject.firstName} has ${jonasObject.friends.length} friends, and his best friends is called ${jonasObject.friends[0]}`)



//objects methods
const jonasObject = { //object literal syntax
    firstName: 'Jonas',
    lastName: 'Fumagalli',
    birthYear: 1991,
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['micheal', 'peter', 'steven'],
    newObject: {
        name: 'nicola',
        surname: 'pirotta'
    },
    hasDriverLicense: true,
    calcAge: function name() { //we need an expression
        console.log(this + ' is calling the method') //use of the 'this' keyword
        this.age = 2037 - this.birthYear
    }
}
//console.log(jonasObject.calcAge(1991))
//console.log(jonasObject['calcAge'](1991))
console.log(jonasObject.calcAge())

const Mark = {
    firstName: 'Mark',
    lastName: 'Killers',
    weight: 120,
    height: 1.45,
    BMIvalue: undefined,
    bmi: function () {
        this.BMIvalue = this.weight / this.height ** 2
    }
}
const John = {
    firstName: 'John',
    lastName: 'Wick',
    weight: 90,
    height: 1.90,
    BMIvalue: undefined,
    bmi: function () {
        this.BMIvalue = this.weight / this.height ** 2
    }

}
John.bmi()
Mark.bmi()

console.log(`Between ${Mark.firstName} ${Mark.lastName} and ${John.firstName} ${John.lastName} the one with and higher BMIvalue its ${Mark.BMIvalue > John.BMIvalue ? Mark.firstName : John.firstName}, equal to ${Mark.BMIvalue > John.BMIvalue ? Mark.BMIvalue : John.BMIvalue}`)



//other control structures: LOOPS

const names = ['nicola', 'ugo', 'maria']
for (let rep = 0; rep < names.length; rep++) {
    const element = names[rep];
    console.log(element)
}

const jonas = ['Jonas', 'pirotta', 2037 - 1991, 'teacher', ['michael', 'peter', 'steven']]

const types = []
for (let i = 0; i < jonas.length; i++) {
    console.log(jonas[i])
    types.push(typeof jonas[i])
}
console.log(types)


const years = [1999, 1998, 1997, 1990]
const ages = []

for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i])
}
console.log(ages)

console.log('ONLY STRINGS')
for (let i = 0; i < jonas.length; i++) {
    if (typeof jonas[i] !== 'string') continue; //skip the rest, go to next iterations
    console.log(jonas[i], typeof jonas[i])
}

//looping backwards
for (let i = jonas.length - 1; i >= 0; i--) {
    console.log(i, jonas[i])
}

//loop inside a loop
for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`--- starting exercise ${exercise}`)

    for (let rep = 1; rep < 6; rep++) {
        console.log(`Exercise ${exercise} Lifting weight repetition ${rep} 💪`)
    }
}

let rep = 1
while (rep <= 10) {
    console.log(`lifting weights repetition ${rep}`)
    rep++
}

let dice = Math.trunc(Math.random() * 6) + 1
console.log(dice)
while (dice != 6) {
    console.log(`yout rolled a ${dice}`)
    dice = Math.trunc(Math.random() * 6) + 1
    if (dice === 6) console.log('loop is about to end...')
}


*/

