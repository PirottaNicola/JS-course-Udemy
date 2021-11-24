// Remember, we're gonna use strict mode in all scripts now!
'use strict'

const temperatures1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5]
const temperature2 = [34, 4, -45, 5, 6, 67, 'error']
const temperatures = temperatures1.concat(temperature2)

let maxT = 0
let minT = 0
for (let i = 0; i < temperatures.length; i++) {
    const currentTemp = temperatures[i];
    if (typeof currentTemp !== 'number') continue
    console.log(currentTemp)
    if (currentTemp > maxT) maxT = currentTemp
    if (currentTemp < minT) minT = currentTemp
}
console.log(minT + ' ' + maxT);
console.log(`the difference between the highest and lowest temperature is: ${maxT - minT}`);

const measureKelvin = function () {
    const measurement = {
        type: 'temp',
        unit: 'celsius',
        value: Number(prompt('degrees celsius: '))
    }
    console.table(measurement);

    const kelvin = measurement.value + 273
    return kelvin
}

console.log(measureKelvin(100));


const t1 = [17, 21, 23]
const t2 = [12, 5, -5, 0, 4]

function maxTemperature(arr1, arr2) {
    const temperature = arr1.concat(arr2)

    for (let i = 0; i < temperature.length; i++) {
        console.log(`day number ${i + 1}: max temperature equal to ${temperature[i]}...`);
    }
}

maxTemperature(t1, t2)