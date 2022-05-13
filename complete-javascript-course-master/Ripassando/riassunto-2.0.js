//! LWC

//importa funzione da classe apex
import nomeMetodo from '@salesforce/apex/nomeClasse.nomeMetodo';

//definisci campo classe
userConsents = [] //popolati da apex
consents = {} //popolato da js

//non appena la pagina carica (connected callback)
async connectedCallback () {
//chiama funzione apex asincrona e salva risultato
this.userConsents = await nomeMetodo({ nomeParametro : valore })//ritorna array di consensi

//gestire toggle sulla pagina
<lightning-input type='toggle' data-aft={consent.id} onchange={handleConsentChange} checked={consent.accepted}></lightning-input>

//per ogni valore preso da apex, aggiorno il valore in consents (che viene poi retrieviato dalla pagina)
this.userConsents.forEach(u => this.consents[u.id] = u.accepted)// consents = {id1 : true; id2 : false; id3 : true}
 
}

handleConsentChange (e) {
    const aft = e.target.dataset.aft //access the data- property called aft
    const checked = e.target.dataset.checked //access the data- property called checked
    this.consents[aft] = checked //consents = { aft : true } 
}