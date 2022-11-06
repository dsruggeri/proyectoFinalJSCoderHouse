//Recupero el usuarioActivo desde el sessionStorage
let usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));

const contenido = document.querySelector('#contenido');

//Capturo la info para la sección "resumen"
let username = document.querySelector('#username')
let saludo = document.querySelector('#nombreusuario');
let txtResumen = document.querySelector('#textoresumen');
let cardNovedades = document.querySelector('#novedades');
let txtNovedades = document.querySelector('#textoNovedades');




//Navegación por JS
const nav = document.querySelectorAll('.links');
console.log(nav)
for(let link of nav){
    link.addEventListener('click', crearNav)
}

function crearNav(evt){
    evt.preventDefault();
    const pagina = evt.target.dataset.nav;
    const url = "fragments/" + evt.target.dataset.nav; 

    fetch(url)
        .then(res => {
            return res.text();
        })
        .then(miContenido => {
            contenido.innerHTML = miContenido;
            if(pagina === "mislibros.html"){
                listarTodos();
                if(usuarioActivo.biblioteca.length == 0){
                    contenido.innerHTML += 
                        `<h3>No tenés libros en tu biblioteca...</h3>`
                }
            } else if (pagina === "misprestamos.html"){
                listarPrestados();
                if(usuarioActivo.biblioteca.filter(
                    (libro) => libro.prestado
                ).length === 0){
                    contenido.innerHTML += 
                        `<h3>No tenés libros prestados...</h3>`

                }
            }
            else if (pagina === "nuevolibro.html"){
                nuevoLibro();
            } else{
                salir();
            }
        })
        .catch(error => console.log(error));    
}

function salir(){
    let origen = window.location.origin;
    sessionStorage.clear();
    window.location = origen + "/index.html";
}


function listarTodos(){
    let fila = document.querySelector("#filalibros");
    let tabla = document.querySelector("#tablatodos");
    
    if(usuarioActivo.biblioteca.length == 0){
        Swal.fire(
            'No tenés libros cargados.',
            'No se puede listar lo que no se tiene',
            'warning'
          )
        
    } else {
        let contador = 0;
            for(libro of usuarioActivo.biblioteca){
                contador +=1;
                fila.innerHTML += `
                <th scope="row">${contador}</th>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.editorial}</td>
                <td>${libro.prestado ? 
                    `<button type="button" class="btn btn-danger accion prestado" disabled id="index${contador-1}"> prestado <span id="span${contador-1}" class="oculto">${contador-1}</span> </button></td>` 
                    : `<button type="button" class="btn btn-primary accion noprestado" id="index${contador-1}"> prestar <span id="span${contador-1}" class="oculto">${contador-1}</span> </button></td>`}</td>
                    <td><img src="images/trash_icon.png" class="icono trash" id="imgtrash${contador-1}"></td>
                    <td><img src="images/edit_icon.png" class="icono edit" id="imgedit${contador-1}"></td>`            
            
        }
         
    }
    prestar();
    eliminar();
    editarLibro();
}


function nuevoLibro() {
    const formNuevoLibro = document.querySelector("#formnuevolibro")
    const nuevoTitulo = document.querySelector("#nuevotitulo")
    const nuevoAutor = document.querySelector("#nuevoautor")
    const nuevoEditorial = document.querySelector("#nuevoeditorial")

    formNuevoLibro.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let usuarioTemp = JSON.parse(sessionStorage.getItem('usuarioActivo'));
        let libroTemp = {
            titulo: nuevoTitulo.value,
            autor: nuevoAutor.value,
            editorial: nuevoEditorial.value,
            resenia: "",
            prestado: false,
            prestadoA: ""
        }
        usuarioTemp.biblioteca.push(libroTemp);
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioTemp));
        Swal.fire(
            'Perfecto!',
            `${libroTemp.titulo} se cargó con éxito`,
            'success'
        )
        confirmarNuevoLibro();
    })
}

function confirmarNuevoLibro(){
    let botonOK = document.querySelector(".swal2-confirm");
    let origen = window.location.origin;
    botonOK.addEventListener('click', (evt) => {
        evt.preventDefault();
        contenido.innerHTML = "";
        window.location = origen + "/mibiblioteca.html";
    })
}


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
        txtResumen.innerHTML = `Tenés <strong>${totalLibros}</strong>  libros en tu biblioteca. 
                                Actualmente, hay <strong><span id="prestados">${totalPrestados}</span></strong> libros prestados.
                                `;
                                
        if(totalPrestados > 0){
            prestados.classList.add("rojo");
        }
    } else {
        txtResumen.innerHTML += `Aún no tenés libros cargados. Podés gestionar tus libros y préstamos desde la barra de navegación`
    }
}

function novedades(){
    if(usuarioActivo.biblioteca.length === 0){
        cardNovedades.classList.add("oculto");
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




function cerrarListarTodos(){
    let tabla = document.querySelector("#tablatodos");
    let fila = document.querySelector("#filalibros");
    tabla.classList.add('tabladelibros');
    fila.innerHTML = '';
}

function listarPrestados() {
    let filaPrestados = document.querySelector("#filalibrosprestados");
    let tablaPrestados = document.querySelector("#tablaprestados");
    let contador = 0;
    let listaPrestados = usuarioActivo.biblioteca.filter(
        (libro) => libro.prestado
    );
    if (listaPrestados.length === 0) {
        Swal.fire(
            'No tenés libros prestados.',
            '...bastante mezquindad...',
            'error'
          );        
    } else {
        
            
            for (libro of listaPrestados) {
                filaPrestados.innerHTML += `
            
            <td><span id="spantituloprestado${contador}">${libro.titulo}</span></td>
            <td>${libro.autor}</td>
            <td>${libro.editorial}</td>
            <td><button type="button" class="btn btn-success btnprestado" id="btnprestado${contador}"> cargar devolución </button></td></td>
            `;
            contador += 1;
            
        }
        devolucion();
    }
}

function cerrarListarPrestados(){
    let filaPrestados = document.querySelector("#filalibrosprestados");
    let tablaPrestados = document.querySelector("#tablaprestados");
    tablaPrestados.classList.add('tabladelibros');
    filaPrestados.innerHTML = '';
}

function prestar(){
    let botonesAccion = document.querySelectorAll('.accion');
    for(i=0; i < botonesAccion.length; i++){
        let spanIndex = document.querySelector("#span"+`${i}`);
        let boton = document.querySelector("#index"+`${i}`);
        boton.addEventListener('click', function() {
            boton.setAttribute("disabled","");
            boton.classList.remove("btn-success");
            boton.classList.add("btn-danger");
            setPrestado(spanIndex.innerHTML);
        })
    }
}

function devolucion(){
    let botonesDevolver = document.querySelectorAll('.btnprestado');
    for(i=0; i < botonesDevolver.length; i+=1){
        let btnPrestar = document.querySelector("#btnprestado"+`${i}`);
        let tituloPrestado = document.querySelector("#spantituloprestado"+`${i}`).innerHTML;
        btnPrestar.addEventListener('click', () => {
            btnPrestar.setAttribute("disabled","")
            setDevolucion(tituloPrestado); 
        });
    }

}

function setPrestado(indice){
    let temporalUsuario = JSON.parse(sessionStorage.getItem('usuarioActivo'));
    if(!usuarioActivo.biblioteca[indice].prestado){
        usuarioActivo.biblioteca[indice].prestado = true;
        temporalUsuario.biblioteca[indice].prestado = true;
        sessionStorage.setItem('usuarioActivo', JSON.stringify(temporalUsuario));
        
    } else {
        usuarioActivo.biblioteca[indice].prestado = false;
        sessionStorage.setItem('usuarioActivo', JSON.stringify(temporalUsuario));
    }
    window.location.reload();       
}

function setDevolucion(titulo){
    let temporalUsuario = JSON.parse(sessionStorage.getItem('usuarioActivo'));
    for(i=0; i < usuarioActivo.biblioteca.length; i += 1){
        if(usuarioActivo.biblioteca[i].titulo === titulo){
            usuarioActivo.biblioteca[i].prestado = false;
            temporalUsuario.biblioteca[i].prestado = false;
            sessionStorage.setItem('usuarioActivo', JSON.stringify(temporalUsuario));
        } 
    }
    window.location.reload();   
}

function eliminar(){
    let botonesEliminar = document.querySelectorAll(".trash");
    for(i = 0; i < botonesEliminar.length; i += 1){
        let indice = i;
        let botonTrash = document.querySelector('#imgtrash'+`${i}`);
        //console.log(botonTrash);
        //console.log(usuarioActivo.biblioteca[i]);
        botonTrash.addEventListener('click', function(){
            usuarioActivo.biblioteca.splice(indice,1);
            sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
            window.location.reload();
        })
    }
}

function editarLibro() {
    let botonesEditar = document.querySelectorAll('.edit');
    for (i = 0; i < botonesEditar.length; i += 1) {
        let indice = i;
        let btnEditar = document.querySelector('#imgedit' + `${i}`);

        btnEditar.addEventListener('click', () => {
            let libroTemp = usuarioActivo.biblioteca[indice];
            console.log(indice);
            console.log(usuarioActivo);
            console.log(libroTemp);
            formEditarLibro(libroTemp, indice);
        })
    }
}

    function formEditarLibro(libroTemp, indice) {
        
        contenido.innerHTML = `
            <div class="container formulario">
                <h1>Editar Libro</h1>
                <br>
            </div>
        
            <div class="container formulario">
                <form action="../mibiblioteca.html"  id="formeditarlibro">
                    <div class="mb-3">
                        <label for="nuevotitulo" class="form-label">titulo...</label>
                        <input type="text" class="form-control" id="nuevotitulo" placeholder="${libroTemp.titulo}">
                    </div>
                    <div class="mb-3">
                        <label for="nuevoautor" class="form-label">autor...</label>
                        <input type="text" class="form-control" id="nuevoautor" placeholder="${libroTemp.autor}">
                    </div>
                    <div class="mb-3">
                        <label for="nuevoeditorial" class="form-label">editorial...</label>
                        <input type="text" class="form-control" id="nuevoeditorial" placeholder="${libroTemp.editorial}">
                    </div>
                    <div class="mb-3">
                        <label for="nuevoresenia" class="form-label">nueva reseña...</label>
                        <textarea class="form-control" id="nuevoresenia" placeholder="${libroTemp.resenia}"></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">actualizar</button>
                    </div>
                </form>
            </div>
                                `
        let formulario = document.querySelector('#formeditarlibro');
        formulario.addEventListener('submit', (evt) => {
            evt.preventDefault();
            let nuevotitulo = document.querySelector('#nuevotitulo')
            let nuevoautor = document.querySelector('#nuevoautor')
            let nuevoeditorial = document.querySelector('#nuevoeditorial')
            let nuevoresenia = document.querySelector('#nuevoresenia')
            if(nuevotitulo.value !== ""){
                libroTemp.titulo = nuevotitulo.value;
            }
            if(nuevoautor.value !== ""){
                libroTemp.autor = nuevoautor.value;
            }
            if(nuevoeditorial.value !== ""){
                libroTemp.editorial = nuevoeditorial.value;
            }
            if(nuevoresenia.value !== ""){
                libroTemp.resenia = nuevoresenia.value;
            }          
            usuarioActivo.biblioteca[indice] = libroTemp;
            sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

            Swal.fire(
                'Perfecto!',
                'Libro editado con éxito',
                'success'
            )
            confirmarEditLibro();
        })
    }

    function confirmarEditLibro() {
        let botonOK = document.querySelector(".swal2-confirm");
        let origen = window.location.origin;
        botonOK.addEventListener('click', (evt) => {
            evt.preventDefault();
            window.location = origen + "/mibiblioteca.html";

        })
    }




    saludar();
    resumen();
    novedades();
    









