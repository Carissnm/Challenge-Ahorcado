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
const reset = document.querySelector('.reset');
const letrasError = document.querySelector('.letra');




//VARIABLES
let palabras = ['PARTIDO', 'PEREZOSO', 'APARATO', 'COMPUTOS', 'TALADRO', 'PELOTA', 'SASTRE', 'SERENO', 'POLIEDRO', 'TREX', 'LUNA', 'HIPOTECA', 'CELESTE', 'ATENCION', 'DESLIZ', 'HELADO', 'CARTAS', 'CEREZA', 'RUGBY', 'FIESTA', 'TRAQUEA', 'FUNCION', 'MARTILLO', 'MISTERIO', 'CAMION', 'CULO']

let palabra = '';


//EVENTOS

btnIniciar.onclick = iniciarJuego;
btnAgregar.onclick = irSeccionAgregar;
btnVolver.onclick = volverInicio;
btnGuardarPalabra.onclick = guardarYEmpezar;
btnCancelar.onclick = cancelar;
btnNuevoJuego.onclick = jugarDeNuevo;



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
}

function guardarYEmpezar() {
    seccionPalabrasNuevas.classList.add('escondido');
    seccionAhorcado.classList.remove('escondido');
    let palabraNueva = textarea.value;
    palabras.push(palabraNueva);
    limpiarTextarea();
    sortearPalabra()
}

function cancelar() {
    seccionPalabrasNuevas.classList.add('escondido');
    seccionInicio.classList.remove('escondido');
}

function jugarDeNuevo() {
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
    palabra = palabras[posicionAleatoria];
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


    document.addEventListener('keypress', function(e) {
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
                    }
                }
                
            });
            
 
        }
        
    });
    
} 

function resetearPalabra() {
    const letterboxes = document.querySelector('.inputs');
    // mientras haya hijos de .inputs removerlos
    while(letterboxes.firstChild) {
        letterboxes.removeChild(letterboxes.lastChild)
    }
}
const resetLetras = () => {
    while(letrasError.firstChild) {
        letrasError.removeChild(letrasError.lastChild)
    }
    console.log(letrasError)
}





