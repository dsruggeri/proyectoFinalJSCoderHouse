//Recupero el usuarioActivo desde el sessionStorage
//de manera global, porque lo voy a utilizar.
let usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));

let username = document.querySelector('#username')
let saludo = document.querySelector('#nombreusuario');
let txtResumen = document.querySelector('#textoresumen');
let cardNovedades = document.querySelector('#novedades');
let txtNovedades = document.querySelector('#textoNovedades');

function saludar(){
    username.innerHTML = `${usuarioActivo.username}` 
    saludo.innerHTML = `${usuarioActivo.nombre}`
}

function contarPrestados(){
    let contador = 0;
    for(libro of usuarioActivo.biblioteca){
        if(libro.prestado){
            contador += 1;
        } 
    }
    return contador;
}

function resumen(){
    let totalLibros = usuarioActivo.biblioteca.length;
    let totalPrestados = contarPrestados();
    if(totalLibros > 0){
        txtResumen.innerHTML += `Tenés <strong>${totalLibros}</strong>  libros en tu biblioteca. 
                                Actualmente, hay <strong><span id="prestados">${totalPrestados}</span></strong> libros prestados.
                                `;
                                
        if(totalPrestados > 0){
            prestados.classList.add("rojo");
        }
    } else {
        txtResumen.innerHTML += `Aún no tenés libros cargados. Podés gestionar tus libros y préstamos desde los botones de la derecha -->`
    }
}

function novedades(){
    if(usuarioActivo.biblioteca.length === 0){
        cardNovedades.classList.add("ocultar");
    } else {
        let ultimoLibro = usuarioActivo.biblioteca[usuarioActivo.biblioteca.length-1];
        txtNovedades.innerHTML += `
        <strong><span>${ultimoLibro.titulo}</span></strong>, 
        de <strong><span>${ultimoLibro.autor}</span></strong>, 
        es tu libro más nuevo. 
        Está editado por <strong><span>${ultimoLibro.editorial}</span></strong>        
                                  `
    }

}

saludar();
resumen();
novedades();

