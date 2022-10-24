//Recupero el usuarioActivo desde el sessionStorage
let usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));

let username = document.querySelector('#username')
let saludo = document.querySelector('#nombreusuario');
let txtResumen = document.querySelector('#textoresumen');
let cardNovedades = document.querySelector('#novedades');
let txtNovedades = document.querySelector('#textoNovedades');

let linkMisLibros = document.querySelector('#linkMisLibros');
linkMisLibros.addEventListener('click', listarTodos);

let linkMisPrestamos = document.querySelector('#linkMisPrestamos');
linkMisPrestamos.addEventListener('click', listarPrestados);

let btnCerraListarTodos = document.querySelector('#btncerrartablatodos');
btnCerraListarTodos.addEventListener('click', cerrarListarTodos);

let btnCerrarListaPrestados = document.querySelector('#btncerrartablaprestados');
btnCerrarListaPrestados.addEventListener('click', cerrarListarPrestados);


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
        txtResumen.innerHTML += `Aún no tenés libros cargados. Podés gestionar tus libros y préstamos desde los botones de la derecha -->`
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
        if(tabla.classList.contains('tabladelibros')){
            tabla.classList.remove('tabladelibros');
            let contador = 0;
            for(libro of usuarioActivo.biblioteca){
                contador +=1;
                fila.innerHTML += `
                <th scope="row">${contador}</th>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.editorial}</td>
                <td>${libro.prestado ? 
                    `<button type="button" class="btn btn-danger accion prestado" disabled id="index${contador-1}"> prestar <span id="span${contador-1}" class="oculto">${contador-1}</span> </button></td>` 
                    : `<button type="button" class="btn btn-primary accion noprestado" id="index${contador-1}"> prestar <span id="span${contador-1}" class="oculto">${contador-1}</span> </button></td>`}</td>
                    <td><img src="images/trash_icon.png" class="icono trash" id="imgtrash${contador-1}"></td>`            
            }
        }    
    }
    prestar();
    eliminar();
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
        if (tablaPrestados.classList.contains("tabladelibros")) {
            tablaPrestados.classList.remove("tabladelibros");
            for (libro of listaPrestados) {
                filaPrestados.innerHTML += `
            
            <td><span id="spantituloprestado${contador}">${libro.titulo}</span></td>
            <td>${libro.autor}</td>
            <td>${libro.editorial}</td>
            <td><button type="button" class="btn btn-success btnprestado" id="btnprestado${contador}"> cargar devolución </button></td></td>
            `;
            contador += 1;
            }
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

saludar();
resumen();
novedades();


//listarTodos();
//listarPrestados();



