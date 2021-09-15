/* let js = "amazing";
// console.log(40 + 30 + 20);

console.log('jonas');
console.log(23);

let firstName = 'Jonas';
console.log(firstName);

let PI = 3.1415;

let myFirstJob = 'programmer';
let myCurrentJob = 'teacher';
console.log(myFirstJob);
console.log(myCurrentJob);

let javascriptIsFun = true;
console.log(myCurrentJob);
console.log(typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof "jonas");

console.log(typeof javascriptIsFun);
javascriptIsFun = 'YES';
console.log(typeof javascriptIsFun)

let year;
console.log(year)
console.log(typeof year)
year = 1991
console.log(typeof year)

console.log(typeof null) //it outputs 'Object'. Its a javascript's bug



//we use let for variables we know are gonna change
let age = 30
age = 31

//we use const for variables that cannot be changed
const birthYear = 1997
// birthYear = 1998     //gives an error
// const job;  //gives an error

lastName = 'Pirotta' //DONT DO IT!
console.log(lastName)



// OPERATORS
let currentYear = 2037
const ageJonas = currentYear - 1991
const ageSara = currentYear - 2012
console.log(ageJonas, ageSara)

console.log(ageJonas * 2, ageJonas / 2, ageJonas + ageSara, 2 ** 3) // 2 elevato alla terza
const firstName = 'Jonas'
const lastName = 'cardashan'
console.log(firstName + ' ' + lastName)

//assignment operators
let x = 10 + 90
console.log(x)
x += 10
console.log(x)
x++
console.log(x)
x--
console.log(x)

//comparison operators
console.log(ageJonas > ageSara)
const ifFullAge = ageSara >= 18

//operators precendence: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

let z, y //for now, undefined
z = y = 25 - 10 - 5 //first mathematical operations: RIGHT to LEFT
console.log(z, y)

const averageAge = (ageJonas + ageSara) / 2
console.log(averageAge)


//CODING CHALLENGE 1!
const markWeight = 78
const johnWeight = 95
const markHeight = 1.95
const johnHeight = 1.76

let markBMI = markWeight / (markHeight ** 2)
let johnBMI = johnWeight / (johnHeight ** 2)
let markHigherBMI = markBMI > johnBMI

console.log('bmi mark: ' + markBMI + '\n' + 'bmi john: ' + johnBMI + '\n' + 'bmi mark maggiore di quello di john? ' + markHigherBMI)


//STRINGS
const firstName = 'Jonas'
const job = 'teacher'
const birthYear = 1991
const year = 2037

const jonas = "i'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!'
console.log(jonas)

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!` //template literals
console.log(jonasNew)
console.log(`i can go on a new line
just going on a new line`)


//IF-ELSE STATEMENT (control structure)
const age = 15
if (age >= 18) {
    console.log('Sarah can start driving license')
} else {
    const yearsLeft = 18 - age
    console.log(`Sarah is too young, wait another ${yearsLeft} years`)
}


let century
const birthYear = 1991
if (birthYear <= 2000) {
    century = 20
} else {
    century = 21
}



//TYPE CONVERSION (explicit) AND COERCION (implicit)
const inputYear = '1991'
console.log(inputYear + 18) //everything concatenating with a string is converted to a string (coercion)
console.log(Number(inputYear) + 18) //explicit conversion


console.log('I am ' + 23)// coercion automatically converts 23 to a string
console.log('23' - '10' - 3) //minus does the opposite thing: converts the strings to numbers (if representing numbers)
console.log('23' / '2')//all to numbers
console.log('23' > '2')//all to numbers

let n = '1' + 1 // '11' string
console.log(typeof n)
n = n - 1 // 1 number
console.log(typeof n)
console.log(n)

// falsy values
console.log(Boolean(0)) //false
console.log(Boolean(undefined)) //false
console.log(Boolean('Jonas')) //true
console.log(Boolean({})) //true
console.log(Boolean('')) //false

const money = 234
if (money) {
    console.log('dont spend it all;')
} else {
    console.log('you should get a job')
}

let height
if (height) console.log('yayyyyy')
else console.log('height is undefined')


//equality operators
const age = 18
if (age === '18') console.log('esattamente 18') //strict
if (age == '18') console.log('18 sottoforma di String o Number') //loose


const favourite = Number(prompt("what's ur favourite number?"))
if (favourite === 23) {
    console.log('cooool 23 is a cool number')
} else if (favourite === 7) {
    console.log('also 7 is a cool number')
} else console.log('nahhh, this is a bad number')


if (favourite !== 23) console.log('why not 23????')



//LOGICAL OPERATORS
const hasDriverLicense = true
const hasGoodVision = true
const isTired = false

console.log(hasDriverLicense && hasGoodVision) //lazy evaluated operator (& its the not lazy evaluated version)
console.log(hasDriverLicense || hasGoodVision || isTired)
if (hasDriverLicense && hasGoodVision && !isTired) console.log('sarah can drive')
else console.log('sarah cant drive now')



//the SWITCH statement
const day = 'monday'
switch (day) { //it does the comparison STRICTLY (===)
    case 'monday':
        console.log('plan curse structure')
        break;
    case 'tuesday':
        console.log('prepare theory videos')
        break;
    case 'wednesday':
        console.log('plan curse structure')
        break;
    case 'thursday':
    case 'friday':
    case 'saturday':
    case 'sunday':
        console.log('record videos and editing them')
        break;

    default:
        console.log('not a valid day')
        break;
}



const age = 23
age >= 18 ? console.log('i like to drink wine 😆') : console.log(' i like to drink water 🚽...')

const drink = age >= 18 ? 'wine' : 'water'
console.log(drink)

console.log(`i like to drink ${age >= 18 ? 'wine' : 'water'}`)

//CODING CHALLENGE 4
let bill = 300
let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20
console.log(`the bill is ${bill}, so the tip was the ${bill >= 50 && bill <= 300 ? '15%' : '20%'}, equivalent to ${tip} dollars. The final cost of the lunch was ${bill + tip}`)

*/