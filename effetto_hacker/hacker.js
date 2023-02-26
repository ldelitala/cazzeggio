
effetto_hacker("h1");

function effetto_hacker(attributo) {

    //costante da cui prendere le lettere per la randomizzazione della parola
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    //selezioniamo la parola che ci interessa
    document.querySelector(attributo).onmouseover = event => {

        //settiamo una variabile per tenere traccia del numero di volte in cui la parola selezionata viene randomizzata
        let iterations = 0;

        //randomizziamo la parola n volte
        const interval = setInterval(() => {

            //qui avviene la randomizzazione
            event.target.innerText = event.target.innerText.split('')
                .map((letter, index) => {

                    //se index<iterazioni ritorniamo il valore originale della parola
                    //!l'elemento selezionato deve avere l'attributo data-value settato con la parola stessa
                    //esempio: <h1 data-value='HELLOSCOREGGE'> HELLOSCOREGGE </h1>
                    if (index < iterations) {
                        return event.target.dataset.value[index];
                    }

                    //altrimenti randomizziamo
                    return letters[Math.floor(Math.random() * 26)];

                }).join('');

            //se abbiamo iterato tutta la parola ci fermiamo
            if (iterations >= event.target.dataset.value.length) clearInterval(interval);

            //cambiamo a intervalli irregolari per dare un effetto più HaCkEr
            iterations += 1 / 3;

        }, 20);
        //il numero dopo la graffa qua sopra è la velocità di esecuzione del tutto

    };
}