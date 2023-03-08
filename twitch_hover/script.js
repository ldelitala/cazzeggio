
// *className: nome della classe a cui vogliamo applicare l'effetto
// *delayWord: quanto ritardo c'è tra l'apparizione di una parola e l'altra (in ms), valore di default 40ms
// *delayElements: quanto ritardo c'è tra un elemento e l'altro (in ms), valore di default 2000ms
const effetto_twitch = (className, delayWord, delayElements) => {

	//*FUNZIONI
	//*1) createWord
	//questa genererà le singole parole dentro elementi span con le classi "${nomeClasse}-words" e "${idClasse}-words"
	const createWord = (text, index, ritardo_fra_elementi, className, id) => {

		//creo l'elemento
		const word = document.createElement("span");
		//inserisco il contenuto
		word.innerHTML = `${text} `;
		//aggiungo le classi
		word.classList.add(`${className}-words`);
		//se ha un id aggiungo la classe id-words
		if (id != undefined) word.classList.add(`${id}-words`);

		//!aggiungo il ritardo di transizione della parola
		word.style.transitionDelay = `${ritardo_fra_elementi + (index * delayWord)}ms`;

		return word;
	};
    
	//*2) addWord
	//grazie alla funzione createWord, aggiungo il nuovo elemento span contentente la parola all'elemento che contiene la frase
	const addWord = (elemento, word, index, ritardo_fra_elementi, className, id) => {
		elemento.appendChild(createWord(word, index, ritardo_fra_elementi, className, id));
	};
    
	//*3) createElemento
	//dato il testo dell'elemento a cui aggiungere l'effetto, chiamo l'addWord per ogni parola
	const createEffetto = (elemento, testo, ritardo_fra_elementi, className, id) => {
		for (let index in testo) {
			addWord(elemento, testo[index], index, ritardo_fra_elementi, className, id);
		}
	};
	//* FINE FUNZIONI

	//controlliamo se i valori extra sono  stati inseriti o meno
	if (delayWord == undefined) delayWord = 40;
	if (delayElements == undefined) delayElements = 2000;

	//scorriamo gli elementi della classe
	//ritardo_fra_elementi ci servirà a settare il ritardo fra ogni elemento
	const elementiDellaClasse = document.getElementsByClassName(className);
	let ritardo_fra_elementi = 0;

	for (let i in elementiDellaClasse) {

		//prendiamo il contenuto dall'elemento HTML e cancelliamolo da lì
		//ps split(/\s+/) splitta gli spazi e se incontra tanti spazi consecutivi li sostituisce nell'array con un valore buleano (non chiedetemi come perché non lo so hem)
		//filter poi leva i valori buleani
		const testo = elementiDellaClasse[i].textContent.split(/\s+/).filter(Boolean);
		elementiDellaClasse[i].innerHTML = "";

		//aggiungiamo l'effetto all'elemento
		createEffetto(elementiDellaClasse[i], testo, ritardo_fra_elementi, className, elementiDellaClasse[i].id);

		//!SE VUOI CHE TUTTI GLI ELEMENTI DELLA CLASSE USINO L'EFFETTO CONTEMPORANEAMENTE COMMENTA QUESTA LINEA DI CODICE
		ritardo_fra_elementi += testo.length * 40 + delayElements;
	}
};

//* INSERIRE IL SEGUENTE CODICE SU CSS PER COMPLETARE L'EFFETTO
//*     .${className}-words {
//*         display: inline-block;
//*         margin: 0vmin 0.3vmin;
//*         position: relative;
//*         transform: translateY(40%);
//*         transition: none;
//*         opacity: 0;
//*         }

//*      .card:hover>.card-content>.${className}>.${className}-words {
//*          transform: translateY(0%);
//*          transition: opacity 0ms, transform 200ms cubic-bezier(.90, .06, .15, .90);
//*          opacity: 1;
//*          }

//* PUOI ANCHE SELEZIONARE LE PAROLE DI UNO SPECIFICO ELEMENTO CON IL SUO ID
//*     .${ID}-words{}

effetto_twitch("sub-title");
