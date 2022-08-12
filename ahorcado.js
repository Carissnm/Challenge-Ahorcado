//CONSTANTES
const btnIniciar = document.querySelector('.iniciar-juego');
const btnAgregar = document.querySelector('.agregar-palabra');
const btnNuevoJuego = document.querySelector('.btn-nuevojuego');
const btnVolver = document.querySelector('.btn-volver');
const btnGuardarPalabra = document.querySelector('.btn-guardar');
const btnCancelar = document.querySelector('.btn-cancelar');
const nuevaPalabra = document.querySelector('#nueva-palabra');
const seccionInicio = document.querySelector('.botonera-inicio');
const seccionPalabrasNuevas = document.querySelector('.palabras-nuevas');
const seccionAhorcado = document.querySelector('.juego-ahorcado');
const textarea = document.querySelector('#nueva-palabra');
const btnSeguirGuardando = document.querySelector('.btn-guardar-seguir');
const modal = document.querySelector('.modal');
const btnModalCancelar = document.querySelector('.cancelar-modal');




//VARIABLES
let palabras = ['PARTIDO', 'PEREZOSO', 'APARATO', 'COMPUTOS', 'TALADRO', 'PELOTA', 'SASTRE', 'SERENO', 'POLIEDRO', 'TREX', 'LUNA', 'HIPOTECA', 'CELESTE', 'ATENCION', 'DESLIZ', 'HELADO', 'CARTAS', 'CEREZA', 'RUGBY', 'FIESTA', 'TRAQUEA', 'FUNCION', 'MARTILLO', 'MISTERIO', 'CAMION', 'CULO']

let palabra = '';
let intentos = 0;


//EVENTOS

btnIniciar.onclick = iniciarJuego;
btnAgregar.onclick = irSeccionAgregar;
btnVolver.onclick = volverInicio;
btnGuardarPalabra.onclick = guardarYEmpezar;
btnCancelar.onclick = cancelar;
btnNuevoJuego.onclick = jugarDeNuevo;
btnSeguirGuardando.onclick = guardar;
btnModalCancelar.onclick = mostrarOcultarMensajePerder;

// FUNCIONES
function iniciarJuego() {
    seccionInicio.classList.add('escondido');
    seccionAhorcado.classList.remove('escondido');
    sortearPalabra();
}

function irSeccionAgregar() {
    seccionInicio.classList.add('escondido');
    seccionPalabrasNuevas.classList.remove('escondido')
}

function volverInicio() {
    seccionAhorcado.classList.add('escondido');
    seccionInicio.classList.remove('escondido');
    resetearPalabra();
    resetLetras();
    resetearAhorcado();
    
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
    let posicionAleatoria = Math.round(Math.random()*palabras.length)
    let palabra = palabras[posicionAleatoria];
    for (let letra of palabra) {
        let box = document.createElement('div');
        box.className = 'contenedor-box'
        box.innerHTML = `<input data-id=${letra} class="box" type="text" disabled>`
        letterboxes.appendChild(box);
    }
    ;
    console.log(palabra)
    adivinarPalabra();
}

function adivinarPalabra() {
    let listaLetrasEquivocadas = []
    const letrasError = document.querySelector('.letra');

    document.onkeypress = e => {
        const inputs = document.querySelectorAll('.box')
        const tecla = e.key;
        if(/[A-Z]/.test(tecla) && !/[\W_]/.test(tecla) && tecla !== 'Alt' && tecla !== 'CapsLock' && tecla !== 'Shift' && tecla !== 'Control') {
            

            inputs.forEach(data => {
                if(tecla === data.getAttribute('data-id')) {
                    data.value = tecla;
                    data.className = 'letra-visible box';
                    console.log(tecla)
                } else {
                    if(!listaLetrasEquivocadas.includes(tecla) && !palabra.includes(tecla)){
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
            mostrarOcultarMensajePerder();
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

function mostrarOcultarMensajePerder() {
    if(!modal.classList.contains('escondido')){
        modal.classList.add('escondido');
    } else {
        modal.classList.remove('escondido')
    }
}


