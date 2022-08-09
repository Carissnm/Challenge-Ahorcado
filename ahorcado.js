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

//EVENTOS

btnIniciar.onclick = iniciarJuego;
btnAgregar.onclick = irSeccionAgregar;
btnVolver.onclick = volverInicio;
btnGuardarPalabra.onclick = guardarYEmpezar;
btnCancelar.onclick = cancelar;

// FUNCIONES
function iniciarJuego() {
    seccionInicio.classList.add('escondido');
    seccionAhorcado.classList.remove('escondido');
}

function irSeccionAgregar() {
    seccionInicio.classList.add('escondido');
    seccionPalabrasNuevas.classList.remove('escondido')
}

function volverInicio() {
    seccionAhorcado.classList.add('escondido');
    seccionInicio.classList.remove('escondido');
}

function guardarYEmpezar() {
    seccionPalabrasNuevas.classList.add('escondido');
    seccionAhorcado.classList.remove('escondido');
}

function cancelar() {
    seccionPalabrasNuevas.classList.add('escondido');
    seccionInicio.classList.remove('escondido');
}