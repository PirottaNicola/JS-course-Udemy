'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const countriesAPIurl = 'https://restcountries.com/v2/'

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg)
    // countriesContainer.style.opacity = 1
}

const renderCountry = function (data, className = '') {
    const html = `
     <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`

    countriesContainer.insertAdjacentHTML('beforeend', html)
    // countriesContainer.style.opacity = 1
}
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
    });
};


//XMLhttpRequest()
const getCountryData = function (country) {

    const request = new XMLHttpRequest() //old way to do and ajax call
    request.open('GET', countriesAPIurl + 'name/' + country)
    request.send()

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        const html = `
     <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`

        countriesContainer.insertAdjacentHTML('beforeend', html)
        countriesContainer.style.opacity = 1
    })
}
// getCountryData('portugal')
// getCountryData('usa')
// getCountryData('italy')



//CALLBACK HELL --> nested callback to achieve asynchronous taks in sequence
const getCountryAndNeighbour = function (country) {
    const request = new XMLHttpRequest() //old way to do and ajax call
    request.open('GET', countriesAPIurl + 'name/' + country)
    request.send()

    request.addEventListener('load', function () {
        console.log(this.responseText);

        const [data] = JSON.parse(this.responseText)
        console.log(data);

        renderCountry(data)

        //get neighbour country
        const [neighbour] = data.borders
        if (!neighbour) return

        //AJAX call caountry 2
        const request2 = new XMLHttpRequest() //old way to do and ajax call
        request2.open('GET', countriesAPIurl + 'alpha/' + neighbour)
        request2.send()

        request2.addEventListener('load', function () {
            const data2 = JSON.parse(this.responseText)
            renderCountry(data2, 'neigbour')
        })
    })
}
// getCountryAndNeighbour('usa')

//other example of callback hell
// window.addEventListener('DOMContentLoaded', function () {
//     setTimeout(() => {
//         console.log('ZA WARUDO!');
//         setTimeout(() => {
//             console.log('1 second has passed');
//             setTimeout(() => {
//                 console.log('2 seconds have passed');
//                 setTimeout(() => {
//                     console.log('3 seconds have passed');
//                 }, 1000);
//             }, 1000);
//         }, 100);
//     }, 1000);
// })



//we can avoid going deep in the callback hell cause, thanks to ES6, we now can use PROMISES and FETCH API

//with XMLHttpRequest:
// const request = new XMLHttpRequest() 
// request.open('GET', countriesAPIurl + 'name/' + country)
// request.send()

//with fetch API
//const requestF = fetch(countriesAPIurl + 'name/' + 'portugal')//returns a Promise (a container for an asynchrously delivered value) in the state of 'pending'

// const getCountryData = function (country) {
//     fetch(countriesAPIurl + 'name/' + country)
//         //fetch returns a Promise, i handle that with .then()
//         .then(function (response) {
//             return response.json() //.json() returns a promise (cant access data yet!)
//         })
//         //.json() returns a promise, i handle that with another .then() (now i can access data!)
//         .then(function (data) {
//             renderCountry(data[0])
//         })
// }

//simpler wrote version
const getCountryData = function (country) {
    fetch(countriesAPIurl + 'name/' + country)//fetches something
        .then(response => response.json())//tranform the response to json
        .then(data => renderCountry(data[0]))//use the data
}
// getCountryData('italy')

//chaining promises
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)
            return response.json()
        })
}

const getCountryNeighbour = function (country) {
    //country 1
    getJSON(countriesAPIurl + 'name/' + country, 'country not found')
        .then(data => {
            console.log(data[0]);
            renderCountry(data[0]);

            //controlla che esistano i vicini
            let neighbour = ''
            console.log(data[0]['borders']);
            if (data[0]['borders'] !== undefined) neighbour = data[0].borders[0]
            else throw new Error('No neighbour found! ');//immediately rejects the promise!

            //country 2
            return getJSON(countriesAPIurl + 'alpha/' + neighbour, 'country not found')
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.error(err);
            renderError(`Something went wrong : ${err.message}. Try again!`)
        })
        .finally(() => {//always happens, no matter the result of the fetch
            countriesContainer.style.opacity = 1
        })
}

// const getCountryNeighbour = function (country) {
//     fetch(countriesAPIurl + 'name/' + country)
//         .then(response => {
//             console.log(response);

//             if (!response.ok)
//                 throw new Error(`Country not found (${response.status})`)

//             return response.json()
//         })
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];

//             if (!neighbour) return

//             //country 2
//             return fetch(countriesAPIurl + 'alpha/' + neighbour);//i need to return the promise to continue the chain
//         })
//         .then(response => response.json())
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.error(err);
//             renderError(`Something went wrong : ${err.message}. Try again!`)
//         })
//         .finally(() => {//always happens, no matter the result of the fetch
//             countriesContainer.style.opacity = 1
//         })
// }

// btn.addEventListener('click', function () {
//     getCountryNeighbour('italy')
// })



//CODING CHALLENGE #1
const whereAmI = function () {
    getPosition()
        .then(pos => {
            console.log(pos.coords);
            const { latitude: lat, longitude: lon } = pos.coords
            fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
        })
        .then(response => {
            if (!response.ok) throw new Error(`problem with geocoding: ${response.status}`)
            console.log(response);
            return response.json()
        })
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`)
            return fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)//to allow the .catch() to work
        })
        .catch(err => console.log(`Something went wrong: ${err}`))
}
btn.addEventListener('click', whereAmI)

//the EVENT LOOP in practice
console.log('Test Start');//first

setTimeout(() => { //fifth (callback queue has lower priority than microtask queue)
    console.log('0 sec timer');
}, 0);

Promise.resolve('Resolved promise 2').then(res => {//fourth (even if its a long task, the timer will have to wait for this, cause its in the microtask queue)
    for (let i = 0; i < 1000000000; i++) { }
})

Promise.resolve('Resolved promise 1').then(res => console.log(res))//third (microtask queue has priority over callback queue)
console.log('test end');//seconds



//building a simple promise
//simulating a lottery using promises
const lotteryPromise = new Promise(function (resolve, reject) {
    //here is the asynchronous behavior that we want to handle with the promise
    console.log('Lottery draw is happening...');
    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve('You win!!!')
        } else reject('You lost')
    }, 2000);
})

lotteryPromise
    .then(res => console.log(res))
    .catch(err => console.log(err))


//Promisifying setTimeout
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}

// wait(2)
//     .then(() => {
//         console.log('1 second passed');
//         return wait(1)
//     })
//     .then(() => {
//         console.log('2 second passed');
//         return wait(1)
//     })
//     .then(() => {
//         console.log('3 second passed');
//         return wait(1)
//     })
// we escaped the callback hell!


//.resolve() --> resolve the promise immediately
Promise.resolve('abc').then(x => console.log(x))
Promise.reject(new Error('Problem')).catch(x => console.error(x))


//Promisifying the geolocation API
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // )
        navigator.geolocation.getCurrentPosition(resolve, reject)//(success callback, error callback)
    })
}
//getPosition().then(pos => console.log(pos))



//CODING CHALLENGE #2
const imgContainer = document.querySelector('.images')

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img')
        img.src = imgPath

        img.addEventListener('load', function () {
            imgContainer.append(img)
            resolve(img)
        })

        img.addEventListener('error', function () {
            reject(new Error('Image not found'))
        })
    })
}
let currentImg

// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img
//         console.log('image 1 loaded');
//         return wait(2)
//     })
//     .then(() => {
//         currentImg.style.display = 'none'
//         return createImage('./img/img-2.jpg')
//     })
//     .then(img => {
//         currentImg = img
//         console.log('image 2 loaded');
//         return wait(2)
//     })
//     .then(() => {
//         currentImg.style.display = 'none'
//     })
//     .catch(err => console.log(err))



//consuming promises wit ASYNC/AWAIT
const whereAmI2 = async function (country) {
    //prima avrei fatto
    // fetch('https://restcountries.com/v2/name/' + country)
    // .then(res => console.log(res))

    //ora posso fare più semplicemente:
    const res = await fetch('https://restcountries.com/v2/name/' + country)
    const data = await res.json()

    renderCountry(data[0])
}
whereAmI2('portugal')
console.log('first');

//error handling with TRY/CATCH
//with async await we cant use .catch()
try {
    let y = 1
    const x = 2
    x = 3
} catch (err) {
    // alert(err.message)
}


const whereAmI3 = async function () {
    try {
        // Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!resGeo.ok) throw new Error('Problem getting location data');

        const dataGeo = await resGeo.json();
        console.log(dataGeo);

        // Country data
        const res = await fetch(
            `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
        );

        // BUG in video:
        // if (!resGeo.ok) throw new Error('Problem getting country');

        // FIX:
        if (!res.ok) throw new Error('Problem getting country');

        const data = await res.json();
        console.log(data);
        renderCountry(data[0]);
    } catch (err) {
        console.error(`${err} 💥`);
        renderError(`💥 ${err.message}`);
    }
};
console.log('1: will get location');
whereAmI3()
console.log('2: finished getting location');

//with callbacks
whereAmI3()
    .then(city => console.log(`1: ${city}`))
    .catch(err => console.error(`2: ${err.message}`))
    .finally(() => console.log(`3: finished getting location`))

    //with immediately invoked async functions
    (async function () {
        try {
            const city = await whereAmI3();
            console.log(`1: ${city}`);
        } catch (err) {
            console.error(`2: ${err.message}`);
        }
        console.log('3: finished getting location');
    })()


//promises in parallel
const get3Countries = async function (c1, c2, c3) {
    try {
        // const [data1] = await getJSON(countriesAPIurl + 'name/' + c1)
        // const [data2] = await getJSON(countriesAPIurl + 'name/' + c2)
        // const [data3] = await getJSON(countriesAPIurl + 'name/' + c3)

        //i can run all the three promises in parallel
        //do this to improve performance when u dont need them to finish in a predefined order
        Promise.all([
            getJSON(countriesAPIurl + 'name/' + c1),
            getJSON(countriesAPIurl + 'name/' + c2),
            getJSON(countriesAPIurl + 'name/' + c3)
        ])

        console.log(data.map(d => d[0].capital));

    } catch (err) {
        console.log(err);
    }
}
get3Countries('portugal', 'canada', 'tanzania')




    //Promise.race()
    //the first settled (no matter if fulfilled or rejected) promise wins the race
    (async function () {
        const res = await Promise.race([
            getJSON('https://restcountries.com/v2/name/italy'),
            getJSON('https://restcountries.com/v2/name/france'),
            getJSON('https://restcountries.com/v2/name/spain')
        ])
        console.log(res[0]);
    })()

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(new Error('Request took too long!'))
        }, sec * 1000);
    })
}
Promise.race([
    //the fastest gonna win
    getJSON('https://restcountries.com/v2/name/tanzania'),
    timeout(0.15)
])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err))


//Promise.allSettled()
//return all the promises (do not short circuits like .all())
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success')
]).then(res => console.log('Promise.settled()', res))


//Promise.any() [ES2021]
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success')
]).then(res => console.log('Promise.any()', res))//true if at least one reolved



//CODING CHALLENGE #3
const imageArr = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']
const imgContainer = document.querySelector('.images')

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img')
        img.src = imgPath

        img.addEventListener('load', function () {
            imgContainer.append(img)
            resolve(img)
        })

        img.addEventListener('error', function () {
            reject(new Error('Image not found'))
        })
    })
}


const loadAll = async function (images) {
    try {
        const imgs = images.map(async img => await createImage(img))
        console.log(imgs);
        //returns promises! Not the images! Because the async function always returns a Promise. Invece uso:
        const imgsEl = await Promise.all(imgs)
        console.log(imgsEl);
        imgsEl.forEach(img => img.classList.add('parallel'))
    } catch (error) {
        console.log(error);
    }
}
loadAll(imageArr)

