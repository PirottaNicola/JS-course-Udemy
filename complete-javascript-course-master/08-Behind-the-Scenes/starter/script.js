'use strict';
/* 
function calcAge(birthYear) {

    const age = 2037 - birthYear

    function printAge() {
        const output = `${firstName},  you are ${age}, born in ${birthYear}`
        console.log(output);

        if (birthYear >= 1991 && birthYear <= 1996) {
            const str = `oh, u are a millenial, ${firstName}`
            console.log(str)
        }
    }
    printAge()
}

const firstName = 'Jonas'
calcAge(1991)

//variable hoisting
console.log(me)
console.log(job)
console.log(year)

var me = 'Jonas'
let job = 'teacher'
const year = 1991


//functions hoisting
console.log(addDecl(2, 3)) //ok!
console.log(addExpr(2, 3)) //NO!
console.log(addArrow(2, 3)) //NO!

function addDecl(a, b) {
    return a + b
}
const addExpr = function (a, b) {
    return a + b
}
const addArrow = (a, b) => { a + b }



//example
if (!numProducts) deleteShoppingCart()
var numProducts = 10
function deleteShoppingCart() {
    console.log('all products deleted!');
}

var x = 1
let y = 2
const z = 3
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);



//the THIS keyword

console.log(this); //window, the global object

const calcAge = function (birthYear) {
    console.log(2037 - birthYear);
    console.log(this);
}
calcAge(1991)

const calcAgeArrow = (birthYear) => {
    console.log(2037 - birthYear);
    console.log(this);//this refers to the window object
}

const jonas = {
    year: 1991,
    calcAge: function () {
        console.log(this) //it points to jonas because jonas is the object calling the method
        console.log(2037 - this.year)
    }
}
jonas.calcAge()


const matilda = {
    year: 2017
}
matilda.calcAge = jonas.calcAge
matilda.calcAge() //this points to matilda, because matilda is the object calling the method, even if borrowed from another object


const f = jonas.calcAge
// f() //this keyword is undefined, because there is no owner of the function who the this keyword can point




var firstName = 'Matilda'

const jonas = {
    firstName: 'Jonas',
    year: 1991,
    calcAge: function () {
        console.log(this) //it points to jonas because jonas is the object calling the method
        console.log(2037 - this.year)

        /* const isMillenial = function () {
            console.log(this); //undefined, because its a regular function
            console.log(this.year >= 1981 && this.year <= 1996)
        }
        isMillenial() */

/*  //one type of solution (before ES6)
 const self = this
 const isMillenial = function () {
     console.log(self); 
     console.log(self.year >= 1981 && self.year <= 1996)
 }
 isMillenial()
 
 //second solution (arrow function)        
const isMillenial = () => {
    console.log(this); //this point to the owner of the calcAge method, jonas
    console.log(this.year >= 1981 && this.year <= 1996)
}
isMillenial()
},
greet: () => {
console.log(this)
console.log(`hey ${this.firstName}`)
} //this == undefined, its the this of the global object, cause arrow functions dont have the this keyword

}
jonas.greet()
jonas.calcAge()
 




//argument keyword (only in regular functions)
const addExpr = function (a, b) {
console.log(arguments)
return a + b
}
addExpr(2, 5)
var addArrow = (a, b) => { a + b }




let age = 30
let oldAge = age
age = 31
console.log(age);
console.log(oldAge);

const me = {
    name: 'jonas',
    age: 30,
}
const friend = me
friend.age = 27 //also changes the original!!! thats because EVERYTHING THAT IS NOT A PRIMITIVE TYPE, SO OBJECTS,ARRAYS,FUNCTIONS..., IS A REFERENCE TYPE
console.log('friend: ', friend);
console.log('Me: ', me);

*/



//primitive vs reference
//primitive types
let lastName = 'Williams'
let oldLastName = lastName
lastName = 'Davis'
console.log(lastName, oldLastName);

//reference types
const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
}
const marriedJessica = jessica
marriedJessica.lastName = 'Davis'
console.log('before marriage: ', jessica);
console.log('after marriage: ', marriedJessica);

//copying objects
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob']
}
const jessicaCopy = Object.assign({}, jessica2) ///!!! non funziona su oggetti annidati all'interno dell'oggetto iniziale !!!
jessicaCopy.lastName = 'Davis'
console.log('before marriage: ', jessica2);
console.log('after marriage: ', jessicaCopy);

jessicaCopy.family.push('Mary')
jessicaCopy.family.push('John')
console.log(jessica2.family);//the nested object its still a reference to the original!!!
console.log(jessicaCopy.family);

// --> ITS NOT EASY TO OBTAIN A DEEP CLONE!!! WE NEED AN EXTERNAL LIBRARY JUST FOR DOING THAT!!!



//****************  BEST PRACTICES  *****************
//dont use var
//declare variables and constants first, then functions 
//dont use arrow functions to define methods in objects

//be very carefull trying to copy objects (create deep clones)