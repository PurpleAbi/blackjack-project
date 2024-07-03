(() => {
    'use strict'
    let deck = [];
    const tiposCarta = ['C','D', 'H', 'S'];
    const cartasEspeciales = ['A','J','Q','K']

    let puntosJugador1 = 0,
        puntosCompu = 0;

    const btnCard = document.querySelector("#btnCard");
    const btnStop = document.querySelector("#btnStop")
    const btnRestart = document.querySelector("#btnRestart")

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasCompu = document.querySelector('#computadora-cartas');


    const marcadorPuntaje = document.querySelectorAll('small');

    const crearDeck = () => {
        for (let i = 2; i<= 10; i++ ){
            for (let tipo of tiposCarta){
                deck.push(i + tipo);
            }
        }

        for ( let tipo of tiposCarta){
            for (let esp of cartasEspeciales){
                deck.push(esp + tipo);
            }
        }

        // console.log(deck);
        // deck = _.shuffle(deck);
        // console.log(deck);
        return deck;   
    }

    crearDeck();

    function shuffle(deck) {
        let currentIndex = deck.length;
        while (currentIndex != 0) {
    
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [deck[currentIndex], deck[randomIndex]] = [
            deck[randomIndex], deck[currentIndex]];
        }
    }
    
    shuffle(deck);
    // console.log(deck);

    const pedirCarta = () => {

        if ( deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        const carta = deck.pop();
        return carta;
    }

    // pedirCarta();

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN(valor) ) ?
            (valor === 'A') ? 11 : 10 
            : valor * 1;
    }
    
    // const valor = valorCarta( pedirCarta() );
    // console.log({valor});

    const turnoCompu = (puntosMinimos ) => {

        do{ 
            const carta = pedirCarta();
        
            puntosCompu = puntosCompu + valorCarta( carta );
            marcadorPuntaje[1].innerText = puntosCompu;
            
            const imgCarta =document.createElement('img');
            imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            divCartasCompu.append( imgCarta );

            if ( puntosMinimos > 21 ) {
                break;
            }

        } while( (puntosCompu < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout( () =>{
            if (( puntosCompu > 21 ) || ( puntosJugador1 == 21 )) {
                alert('Ganaste!')
            } else if ( puntosCompu == puntosJugador1){
                alert('Nadie gana')
            }else if ( (puntosCompu == 21) || ( puntosCompu - puntosJugador1 === 0 == false) ){
                alert('Lo siento, perdiste. Gana la Computador')
            }
        }, 15 );
    }

    btnCard.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador1 = puntosJugador1 + valorCarta( carta );
        marcadorPuntaje[0].innerText = puntosJugador1;
        
        const imgCarta =document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append( imgCarta );

        
        if ( puntosJugador1 > 21 ){
            btnCard.disabled = true;
            btnStop.disabled = true;
            turnoCompu( puntosJugador1 );
        } else if ( puntosJugador1 === 21){
            btnCard.disabled = true;
            btnStop.disabled = true;
        }
        
    });

    btnStop.addEventListener('click', () => {
        btnCard.disabled = true;
        btnStop.disabled = true;
        
        turnoCompu( puntosJugador1 );
        
    });

    btnRestart.addEventListener('click', () => {
        crearDeck();
        shuffle(deck);
        
        marcadorPuntaje[0].innerText = 0;
        marcadorPuntaje[1].innerText = 0;
        
        puntosCompu = 0;
        puntosJugador1 = 0;
        
        btnCard.disabled = false;
        btnStop.disabled = false;
        
        divCartasCompu.innerHTML ='';
        divCartasJugador.innerHTML ='';


    });

})();