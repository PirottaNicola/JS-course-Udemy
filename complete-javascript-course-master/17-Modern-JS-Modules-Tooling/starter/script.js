// //importing module
// import './shoppingCart.js'
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'


// console.log('Importing module');

// addToCart('apples', 5)
//  console.log(price, tq);

// //i can also import all the namespace and use it like and object
// import * as ShoppingCart from './shoppingCart.js'
// ShoppingCart.addToCart('bread', 10)
// console.log(ShoppingCart.totalPrice);


// import add from './shoppingCart.js' //import the default exported function
// add('pizza', 1)


// import { cart } from './shoppingCart.js'
// add('pizza', 3)
// add('bread', 2)
// add('apples', 1)
// console.log(cart);
// //--> the imported cart is NOT A COPY! it's a LIVE COLLECTION!


//////////////////////////////////////////////////////////////////
//the Module Pattern

// const ShoppingCart2 = (function () {
//     const cart = []
//     const shippingCost = 10
//     const totalPrice = 237
//     const totalQuantity = 23

//     const addToCart = function (product, quantity) {
//         cart.push({ product, quantity })
//         console.log(`${quantity} ${product} added to cart`);
//     }

//     const orderStock = function (product, quantity) {
//         cart.push({ product, quantity })
//         console.log(`${quantity} ${product} ordered from supplier`);
//     }

//     return {
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity
//     }

// })() //executed in the beginning, returning an object and assigning it to the variable ShoppingCart2. I can use it even after it has ended its execution thank to closures

// ShoppingCart2.addToCart('apple', 4)
// ShoppingCart2.addToCart('pizza', 2)
// console.log(ShoppingCart2);


////////////////////////////////////////////////////////////////////
// //COMMON JS MODULES (used in the past, still present)

// //dont work in the browser, but in Node.js
// //Export
// export.addtoCart = function (product, quantity) {
//     cart.push({ product, quantity })
//     console.log(`${quantity} ${product} added to cart`);
// }
// //Import
// const { addtoCart } = require('./shoppingCart.js')


///////////////////////////////////////////////////////////////////
//introduction to NPM (Node Package Manager: software on our pc, repository online)

import cloneDeep from 'lodash-es' //i can omit the path thanks to parcel


const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'pizza', quantity: 4 },
    ],
    user: { loggedIn: true }
}

const stateClone = Object.assign({}, state)//with plain js
const stateDeepClone = cloneDeep(state)//with lodash library

state.user.loggedIn = false
console.log(stateClone);//only a pointer to the original
console.log(stateDeepClone);//a truly DEEP CLONE


//POLYFILLING --> recreates newly introduces functions (like Array.find()) so that even older browsers can understand the code
import 'core-js/stable'
//polyfilling async functions
import 'regenerator-runtime/runtime'