// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

// event listeners
eventListeners();

function eventListeners() {
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    // cuando el documento esta listo
    console.log("antes");
    document.addEventListener('DOMContentLoaded', () => {
        console.log("dentro");
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHtml();
    });
}

// funciones
function agregarTweet(e) {
    e.preventDefault();

    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validacion
    if (tweet === '') {
        mostrarError('un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // creamos el html que agrega mensajes
    crearHtml();

    // reiniciar formulario
    formulario.reset();
}

// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertar mensaje
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)

    // elimina mensaje despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHtml() {

    limpiarHtml();

    if (tweets.length > 0) {

        tweets.forEach(tweet => {
            // crear el html
            const li = document.createElement('li');
            // añadir el texto
            li.innerText = tweet.tweet;
            // inserto el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// agrega los tweets a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHtml() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}