
//salviamo il "track" che contiene le immagini
const track = document.getElementById("image-track");

//quando si clicca con il mouse (o touch) ci salviamo la posizione x
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

//quando si rilascia settiamo il valore che tiene traccia del mouse (data-mouse-down-at) a zero 
//e salviamo la posizione corrente di dove siamo nel "track" (data-prev-percentage)
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

//con questa funzione gestiamo invece il movimento
const handleOnMove = e => {
  //se il mouse è a zero vuol dire che non stiamo cliccando, quindi la funzione non fa niente
  if(track.dataset.mouseDownAt === "0") return;
  //altrimenti vuol dire che stiamo cliccando e la funzione fa il suo dovere:

  //per prima cosa si salva in mouseDelta il valore della differenza tra il punto di partenza del mouse ed il punto attuale,
  //questo per capirne il movimento
  //inoltre salviamo in maxDelta il valore della dimensione della finestra, così da regolarci di conseguenza
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  //calcoliamo quindi la percentuale di quanto il mouse si sia spostato rispetto allo schermo
  //dopo lo aggiungiamo alla posizione attuale per capire esattamente dove muoverci
  //infine ci assicuriamo che la percentuale sia tra [0.-100]
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  //salviamo la percentuale della posizione attuale
  track.dataset.percentage = nextPercentage;
  
  //sposta il "track" alla posizione giusta
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  //sposta le immagini nella direzione opposta per effetto figo
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */
//PS e.touches[0] indica gli eventi del primo dito che tocca lo schermo

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

//questa linea di codice serve per gestire gli errori, in particolare se viene cancellato iltouch per qualche errore,
//allora esegue handleOnUp almeno dopo si ricorderà dov'era
window.ontouchcancel = e => handleOnUp(e.touches[0]);
