'use strict';

const Person = function (firstName, birthYear) {//i can use only function declaration and function expressions, not arrow functions, to create an object (doesn't have this keyword)
    console.log(this)
    this.firstName = firstName
    this.birthYear = birthYear

    //never create methods inside the constructor! Very bad for performance!!! Define it in the prototype and use inheritance!!!
}
const jonas = new Person('Jonas', 1991)
//1. new {} is created
//2. function is called, this = {}
//3. {} linked to prototype
//4. function automatically returns {}
console.log(jonas);//object jonas

const matilda = new Person('Matilda', 2017)
const jack = new Person('Jack', 1975)
console.log(matilda, jack);
console.log(jonas instanceof Person);//true


//PROTOTYPES
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}
jonas.calcAge()//if JS doesn't find the method in the object, searches it in its prototype!

console.log(Person.prototype);//points to the prototype of objects inheriting from Person
console.log(jonas.__proto__);//__proto__ points to the object prototype
console.log(jonas.__proto__ === Person.prototype);//true
console.log(Person.prototype.isPrototypeOf(jonas));//true
console.log(Person.prototype.isPrototypeOf(Person));//false

//.prototypeOfLinkedObjects
Person.prototype.species = 'Homo Sapiens'//add property to the prototype
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));//true, property of jonas
console.log(jonas.hasOwnProperty('species'));//false, property of jonas but inherited from its prototype

console.log(jonas.__proto__)//prototype property of Person
console.log(jonas.__proto__.__proto__)//prototype property of Object (top of chain)
console.log(jonas.__proto__.__proto__.__proto__)//null


const arr = [1, 2, 43, 4, 4, 5, 5]
console.log(arr.__proto__);//prototype property of Array
console.log(arr.__proto__ == Array.prototype)
console.log(arr.__proto__.__proto__);//prototype property of Object

Array.prototype.unique = function () {
    return [...new Set(this)]//returns only unique elements
}//we added a new property (method) to the Array prototype, now all the arrays can use it! DONT DO IT ON BUILT IN OBJECTS!!!
console.log(arr.unique());

const h1 = document.querySelector('h1')
console.dir(h1);

console.dir(x => x + 1);


//CODING CHALLENGE #1
const Car = function (make, speed) {
    this.make = make
    this.speed = speed
}
Car.prototype.accelerate = function () {
    this.speed += 10
    console.log(this.speed);
}
Car.prototype.brake = function () {
    this.speed -= 10
    console.log(this.speed);
}

const saetta = new Car('bmw', 190)
const sally = new Car('porsche', 160)
console.log(saetta);
console.log(sally);
saetta.brake()
sally.accelerate()



//class expression
// const PersonCl = class{}

//class declaration
class PersonCl {
    //constructor
    constructor(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
    //methods (they are in the prototype of the object, not in the bject itself --> good performance)
    calcAge(year) {
        console.log(year - this.birthYear);
    }


    //getters and setters
    get ageIn2020() {
        return 2020 - this.birthYear
    }
    //set a property that already exists ////////////////////////////////
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }
    /////////////////////////////////////////////////////////////////////

    //static methods
    static hey() {
        console.log('hey there');
    }
}
//i can also add methods on the prototype as with the constructor function
PersonCl.prototype.greet = function () {
    console.log(`hey ${this.firstName}`);
}

const jessica = new PersonCl('Jessica Davis', 1996)
console.log(jessica);
jessica.calcAge(2020)
jessica.greet()

// 1. classes are NOT hoisted (cant use them before they are declared in the code)
// 2. classes are FIRST-CLASS CITIZES
// 3. classes are executed in strict mode


//SETTERS and GETTERS
//functions that get and set values
const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop()
    },
    set latest(mov) {
        this.movements.push(mov)
    }
}
console.log(account.latest);
account.latest = 50
//they are methods that have to be called like a property, CANT SPECIFY PARAMETERS
console.log(jessica.ageIn2020)
jessica.fullName


//STATIC METHODS
Person.hey = function () {
    console.log('hey mannnnnnnnn');
}
Person.hey()
// jonas.hey() //NO! its not inherited!


// Object.create()
//in the real world is the least used way to implement inheritance
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },
    init(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
}
const steven = Object.create(PersonProto)
steven.name = 'Steven'
steven.birthYear = 2002
console.log(steven);
steven.calcAge()
console.log(steven.__proto__);
console.log(PersonProto);

const sarah = Object.create(PersonProto)
sarah.init('Sarah', 1991)


//CODING CHALLENGE #2
class Car2 {
    constructor(make, speed) {
        this.make = make
        this.speed = speed
    }
    accelerate = function () {
        this.speed += 10
        console.log(this.speed);
    }
    brake = function () {
        this.speed -= 10
        console.log(this.speed);
        return this
    }
    get speedUS() {
        return this.speed / 1.6
    }
    set speedUS(speed) {
        this.speed = speed * 1.6
    }
}
const hutson = new Car2('hornet', 140)
console.log(hutson.speedUS);
hutson.accelerate()
hutson.brake()
hutson.speedUS = 50
console.log(hutson);



//Inheritance between classes: Constructor functions ///////////////
const Person1 = function (firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
}

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}

const Student = function (firstName, birthYear, course) {
    // this.firsName = firstName
    // this.birthYear = birthYear
    Person1.call(this, firstName, birthYear)//devo usare call per specificare a cosa deve puntare la this keyword
    this.course = course
}

//Linking Prototypes
// Student.prototype = Person.prototype  //NO! Messes up the prototype chain!!!
Student.prototype = Object.create(Person.prototype)


Student.prototype.introduce = function () {
    console.log(`my name is ${this.firstName} and i study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'Computer Science')
console.log(mike);
mike.introduce()
mike.calcAge()

console.log(mike.__proto__)
console.log(mike.__proto__.__proto__)
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);



//CODING CHALLENGE #3
const EV = function (make, speed, charge) {
    Car.call(this, make, speed)
    this.charge = charge
}
//Link the prototypes
EV.prototype = Object.create(Car.prototype)
EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo
}

EV.prototype.accelerate = function () {//overwrites the one inherited 
    this.speed += 20
    this.charge--
    console.log(`${this.make} is going at ${this.speed} km/h,
    with a charge of ${this.charge}`);
}

const tesla = new EV('Tesla', 120, 23)

tesla.chargeBattery(90)
console.log(tesla);
tesla.brake()
tesla.accelerate()


//Inheritance between classes: ES6 classes ///////////////
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        super(fullName, birthYear) //pass in the arguments of the constructor of the extended class. ALWAYS PUT IT FIRST!!!
        this.course = course
    }
}
const martha = new StudentCl('Martha', 2012, 'Computer Science')
console.log(martha);
martha.greet()
martha.calcAge(2020)
console.log(martha.ageIn2020)


//Inheritance between classes: Object.create() ///////////////
const mark = Object.create(PersonProto)

const StudentProto = Object.create(PersonProto)
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear)
    this.course = course
}
StudentProto.introduce = function () {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
}

const jay = Object.create(StudentProto)
jay.init('Jay', 2010, 'computer science')
jay.introduce()
jay.calcAge()




////////////////////////////////////////////////////////////

//PROTECTED properties and methods 
//theres no way to do real private methods in classes yet, probably in the future this feature will be added. For now we fake it, with a convention

class Account {
    constructor(owner, currency, pin) {
        this.owner = owner
        this.currency = currency
        //properties not based on inputs
        this.locale = navigator.language
        //protected properties (only a convention)
        this._movements = []
        this._pin = pin

        console.log(`thanks for opening an account, ${owner}`);
    }
    //Public Interface
    //this should be the correct way to access a protected value from the outside
    getMovements() {
        return this._movements
    }

    deposit(value) {
        this._movements.push(value)
    }
    withdraw(value) {
        this.deposit(-value)
    }
    _approveLoan() {
        return true
    }
    requestLoan(value) {
        if (this._approveLoan()) console.log('Loan approved');
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111)
acc1.deposit(250)
acc1.withdraw(140)
acc1.requestLoan(1000)
acc1._approveLoan()
acc1._movements //i can access it, but at least me and my team know that is a protected value that we should not access from outside the class
acc1.getMovements()//this should be the correct way to access it, because at least i cannot edit the value

console.log(acc1);


//PRIVATE CLASS FIELDS AND METHODS (proposal --> it will become avaiable soon)

// Public fields
// Private fields
// Public methods
// Private methods

class AccountSecure {
    //PUBLIC FIELDS (instances)
    locale = navigator.language

    //PRIVATE FIELDS (instances)
    #movements = []
    #pin

    constructor(owner, currency, pin) {
        this.owner = owner
        this.currency = currency
        this.#pin = pin //i can access it inside the class

        console.log(`thanks for opening an account, ${owner}`);
    }

    //Public Interface
    getMovements() {
        return this.#movements
    }

    //PUBLIC METHODS
    deposit(value) {
        this.#movements.push(value)
        return this
    }
    withdraw(value) {
        this.deposit(-value)
        return this
    }

    requestLoan(value) {
        if (this.#approveLoan()) console.log('Loan approved');
        return this
    }

    //PRIVATE METHODS
    #approveLoan() {
        return true
    }
}

const acc2 = new AccountSecure('Nicola', 'EUR', 2222)
// console.log(acc2.#movements); //cant access it!!!
// console.log(acc1.#approveLoan()); //same (doesn't work yet, even on chrome)



//CHAINING METHODS
acc2.deposit(300).deposit(500).withdraw(35).requestLoan().withdraw(4000) //all methods have to return 'this'
console.log(acc2.getMovements());


//CODING CHALLENGE #4
class EVCl extends Car2 {
    #charge

    super(make, speed) {
        this.#charge = charge
    }
    chargeBattery = function (chargeTo) {
        this.#charge = chargeTo
        return this
    }

    accelerate = function () {//overwrites the one inherited 
        this.speed += 20
        this.#charge--
        console.log(`${this.make} is going at ${this.speed} km/h,
    with a charge of ${this.#charge}`);
        return this
    }
}

const audi = new EVCl('Audi', 120, 23)
console.log(audi);
// console.log(audi.#charge)
audi.accelerate().accelerate().brake().chargeBattery(50).accelerate()