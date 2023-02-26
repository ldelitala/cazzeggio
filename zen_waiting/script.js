//selezioniamo il nostro wrapper
const wrapper = document.getElementById("wrapper");

//scriviamo una funzione per scegliere a random
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//salviamo le configurazioni che ci piacciono
const combinations = [
    { configuration: 1, roundness: 2 },
    { configuration: 1, roundness: 4 },
    { configuration: 1, roundness: 4 },
    { configuration: 2, roundness: 1 },
    { configuration: 2, roundness: 2 },
    { configuration: 3, roundness: 3 }
]

//cambiamo la configurazione ad intervalli regolari
setInterval(() => {
    //scegliamo a random la combinazione
    const index = randomInt(0, combinations.length - 1), combination = combinations[index];
    //e la impostiamo
    wrapper.dataset.configuration = combination.configuration;
    wrapper.dataset.roundness = combination.roundness;

}, 3000)