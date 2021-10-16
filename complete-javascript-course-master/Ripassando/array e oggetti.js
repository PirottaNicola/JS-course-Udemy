'use strict'

const giorni = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica']
console.log(giorni);
console.log(giorni.pop());
console.log(giorni);
console.log(giorni.push('domenica'));
console.log(giorni);
console.log(giorni[0]);
console.log(giorni.indexOf('martedi'));
console.log(giorni.includes('mercoledi'));

console.log('//////////////////////////////////////');

const persona = {
    nome: '',
    cognome: '',
    eta: '',
    famiglia: ''
}
console.log(persona);
persona.nome = 'nicola'
persona.cognome = 'pirotta'
persona.eta = 24
persona.famiglia = ['tommaso', 'francesco', ['ugo', 'maria']]
console.log(persona);
console.log(persona.nome);
console.log(persona['nome']);//can compute the field name
persona.numero = 3664306706
console.log(persona.numero);
console.log(Object.keys(persona));
console.log(Object.values(persona));

console.log('///////////////////////////////////////');

const [l, , m] = giorni//primo in l, terzo in m
console.log(l, m);
const [primo] = persona.famiglia//solo primo elemento
console.log(primo);
//REST (sinistra): al posto di VARIABILI divise da virgole
const [...family] = persona.famiglia
console.log(family);
const [tommy, ...restOfFamily] = persona.famiglia
console.log(tommy, restOfFamily);
//SPREAD (destra): al posto di VALORI divisi da virgole
const familia = [...persona.famiglia]
console.log(familia);

for (const giorno of giorni.entries()) {
    console.log(giorno);
}
const [...giorniConIndice] = giorni.entries()
console.log(giorniConIndice);

console.log('////////////////////////////////////////');

let nome = 'nicola'
console.log(nome.slice(1));
nome = 'nicola'
console.log(nome.slice(-1));
nome = 'nicola'
console.log(nome.slice(2));
nome = 'nicola'
console.log(nome.slice(-2));
nome = 'nicola'
console.log(nome.slice(1, 4));
nome = 'nicola pirotta'
const separati = nome.split(' ')
console.log(separati);
console.log(separati.join(' '));
console.log(separati.join(' ').padEnd(20, '*'));//aggiungi * fino a lunghezza 20
const [...lettere] = nome
console.log(lettere);
const lettereDiverse = new Set(lettere.filter(l => l !== ' '))
console.log(lettereDiverse);

console.log('//////////////////////////////////////////');
