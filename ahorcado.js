//CONSTANTES
const btnIniciar = document.querySelector('.iniciar-juego');
const btnAgregar = document.querySelector('.agregar-palabra');
const btnNuevoJuego = document.querySelector('.btn-nuevojuego');
const btnVolver = document.querySelector('.btn-volver');
const btnGuardarPalabra = document.querySelector('.btn-guardar');
const btnCancelar = document.querySelector('.btn-cancelar');
const btnSeguirGuardando = document.querySelector('.btn-guardar-seguir');
const btnCancelarModal = document.querySelector('.cancelar-modal');
const btnContinuarModal = document.querySelector('.continuar-modal');
const btnInicioModal = document.querySelector('.inicio-modal');
const btnVolverModal = document.querySelector('.volver-jugar-modal');
const nuevaPalabra = document.querySelector('#nueva-palabra');
const textarea = document.querySelector('#nueva-palabra');
const seccionInicio = document.querySelector('.botonera-inicio');
const seccionPalabrasNuevas = document.querySelector('.palabras-nuevas');
const seccionAhorcado = document.querySelector('.juego-ahorcado');


const modal = document.querySelector('.modal');
const modalGanaste = document.querySelector('.modal-ganaste');
const modalAviso = document.querySelector('.modal-aviso');




//VARIABLES
let palabras = ['PARTIDO', 'PEREZOSO', 'APARATO', 'COMPUTOS', 'TALADRO', 'PELOTA', 'SASTRE', 'SERENO', 'POLIEDRO', 'TREX', 'LUNA', 'HIPOTECA', 'CELESTE', 'ATENCION', 'DESLIZ', 'HELADO', 'CARTAS', 'CEREZA', 'RUGBY', 'FIESTA', 'TRAQUEA', 'FUNCION', 'MARTILLO', 'MISTERIO', 'CAMION', 'CULO', 'CIERVO', 'SANDWICH', 'ROBLOX', 'GATO', 'MOTONETA', 'LANCHA', 'PEZ', 'ESCUELA', 'FAMILIA', 'AMISTAD']

let palabraSecreta = '';
let intentos = 0;


//EVENTOS
btnInicioModal.onclick = irInicio;
btnVolverModal.onclick = seguirJugandoModal;
btnIniciar.onclick = iniciarJuego;
btnAgregar.onclick = irSeccionAgregar;
btnVolver.onclick = volverInicio;
btnGuardarPalabra.onclick = guardarYEmpezar;
btnCancelar.onclick = cancelar;
btnNuevoJuego.onclick = jugarDeNuevo;
btnSeguirGuardando.onclick = guardar;
btnCancelarModal.onclick = volverYCerrarModal;
btnContinuarModal.onclick = jugarYCerrarModal;

// FUNCIONES
function iniciarJuego() {
    seccionInicio.classList.add('escondido');
    seccionAhorcado.classList.remove('escondido');
    sortearPalabra();
    toggleModalAviso();
    setTimeout(toggleModalAviso, 3000);
}

function irSeccionAgregar() {
    seccionInicio.classList.add('escondido');
    seccionPalabrasNuevas.classList.remove('escondido');
    toggleModalAviso();
    setTimeout(toggleModalAviso, 3000);
}

function volverInicio() {
    seccionAhorcado.classList.add('escondido');
    seccionInicio.classList.remove('escondido');
    resetearPalabra();
    resetLetras();
    resetearAhorcado();
    
}

function volverYCerrarModal() {
    volverInicio()
    toggleModalPerdiste()
}

function jugarYCerrarModal() {
    toggleModalPerdiste()
    resetearAhorcado();
    resetLetras();
    resetearPalabra();
    sortearPalabra();
}

function irInicio() {
    toggleModalGanaste();
    volverInicio();
    resetLetras();
    resetearAhorcado();
    resetearPalabra();
}

function seguirJugandoModal() {
    toggleModalGanaste();
    resetLetras();
    resetearAhorcado();
    resetearPalabra();
    sortearPalabra();
}

function guardarYEmpezar() {
    seccionPalabrasNuevas.classList.add('escondido');
    seccionAhorcado.classList.remove('escondido');
    guardar();
    sortearPalabra()
}

function guardar() {
    let palabraNueva = textarea.value;
    palabras.push(palabraNueva);
    limpiarTextarea();
}

function cancelar() {
    seccionPalabrasNuevas.classList.add('escondido');
    seccionInicio.classList.remove('escondido');
}

function jugarDeNuevo() {
    resetearAhorcado();
    resetLetras();
    resetearPalabra();
    sortearPalabra();
}

function limpiarTextarea() {
    textarea.value = '';
}

function sortearPalabra(){
    const letterboxes = document.querySelector('.inputs');
    let posicionAleatoria = Math.floor(Math.random()*palabras.length)
    palabraSecreta = palabras[posicionAleatoria];
    for (let letra of palabraSecreta) {
        let box = document.createElement('div');
        box.className = 'contenedor-box'
        box.innerHTML = `<input data-id=${letra} class="box" type="text" disabled>`
        letterboxes.appendChild(box);
    }
    ;
    console.log(palabraSecreta)
    adivinarPalabra();
}

function adivinarPalabra() {
    let listaLetrasEquivocadas = []
    const letrasError = document.querySelector('.letra');
    const inputs = document.querySelectorAll('.box')
    let contador = 0;
    let palabra = [];

    document.onkeypress = e => {
        const inputs = document.querySelectorAll('.box')
        const tecla = e.key;
        if(/[A-Z]/.test(tecla) && !/[\W_]/.test(tecla) && tecla !== 'Alt' && tecla !== 'CapsLock' && tecla !== 'Shift' && tecla !== 'Control') {
            

            inputs.forEach((data, i) => {
                if(tecla === data.getAttribute('data-id')) {
                    data.value = tecla;
                    data.className = 'letra-visible box';

                    palabra[i] = data.value
                    if(palabra.join('') === palabraSecreta) {
                            setTimeout(toggleModalGanaste, 300)
                    }
                } else {
                    if(!listaLetrasEquivocadas.includes(tecla) && !palabraSecreta.includes(tecla)){
                        listaLetrasEquivocadas.push(tecla)
                        const letraError = document.createElement('p');
                        letraError.className = 'letra-error-parrafo';
                        letraError.textContent = tecla;
                        letrasError.appendChild(letraError)
                        intentos++;
                        dibujarAhorcado(intentos);
                    }
                }
                
            });
            
 
        }
        
    };
    
    
    if(contador === inputs.length) {
        modalGanaste.classList.remove('escondido');
    }
} 

function dibujarAhorcado(intentos) {
    switch(intentos) {
        case 1 :
            document.querySelector('.line-1').classList.remove('escondido');
            break;
        case 2 :
            document.querySelector('.line-2').classList.remove('escondido');
            break;
        case 3 :
            document.querySelector('.line-3').classList.remove('escondido');
            break;
        case 4 :
            document.querySelector('.head').classList.remove('escondido');
            break;
        case 5 :
            document.querySelector('.arm-l').classList.remove('escondido');
            break;
        case 6 :
            document.querySelector('.arm-r').classList.remove('escondido');
            break;
        case 7 :
            document.querySelector('.body').classList.remove('escondido');
            break;
        case 8 :
            document.querySelector('.leg-l').classList.remove('escondido');
            break;
        case 9 :
            document.querySelector('.leg-r').classList.remove('escondido');
            setTimeout(toggleModalPerdiste, 300)
            break;
    }
}

function resetearPalabra() {
    const letterboxes = document.querySelector('.inputs');
    // mientras haya hijos de .inputs removerlos
    while(letterboxes.firstChild) {
        letterboxes.removeChild(letterboxes.lastChild)
    }
}

function resetLetras() {
    const letrasError = document.querySelector('.letra');
    while(letrasError.firstChild) {
        letrasError.removeChild(letrasError.lastChild)
    }
}

function resetearAhorcado() {
    const ahorcado = document.querySelectorAll('.ahorcado1');
    ahorcado.forEach(item => {
        if(!item.classList.contains('escondido')) {
            item.classList.add('escondido')
        }
        intentos = 0;
    })
}

function toggleModalPerdiste() {
    const divModal = document.querySelector('.center');
    if(divModal.classList.contains('popup')) {
        divModal.classList.remove('popup');
    } else {
        divModal.classList.add('popup')
    }
    if(modal.classList.contains('escondido')) {
        modal.classList.remove('escondido');
    } else {
        modal.classList.add('escondido');
    }
}

function toggleModalGanaste() {
    const divModalGanaste = document.querySelector('.ganaste')
    if(divModalGanaste.classList.contains('popup')){
        divModalGanaste.classList.remove('popup');
    } else {
        divModalGanaste.classList.add('popup');
    }
    if(modalGanaste.classList.contains('escondido')) {
        modalGanaste.classList.remove('escondido');
    } else {
        modalGanaste.classList.add('escondido');
    }
}


function toggleModalAviso() {
    const divModalAviso = document.querySelector('.aviso');
    if(divModalAviso.classList.contains('popup')) {
        divModalAviso.classList.remove('popup');
    } else {
        divModalAviso.classList.add('popup');
    }
    
    if(modalAviso.classList.contains('escondido')) {
        modalAviso.classList.remove('escondido');
    } else {
        modalAviso.classList.add('escondido');
    }
}