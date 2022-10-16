//Defino la clase libro y sus métodos (prestar, devuelto, agregarResenia)
class Libro {
    constructor(titulo, autor, editorial, resenia) {
        this.titulo = titulo;
        this.autor = autor;
        this.editorial = editorial;
        this.resenia = resenia;
        this.prestado = false;
    }

    //cambia el estado de prestado a true
    prestar() {
        this.prestado = true;
    }
    //cambia el estado de prestado a false
    devuelto() {
        this.prestado = false;
    }
    //reemplaza el valor del atributo reseña
    agregarResenia(resenia){
        this.resenia = resenia;
    }
}


//DEFINO ALGUNAS FUNCIONES QUE VOY A UTILIZAR
//Listar todos los libros
function listarTodos() {
    let i = 0;
    let fila = document.querySelector("#listaDeLibros");
    for (const libro of bibliotecaDiego) { 
        if(libro.prestado){
            fila.innerHTML += `<tr>
                                <th scope="row">${i+1}</th>
                                <td>${libro.titulo}</td>
                                <td>${libro.autor}</td>
                                <td>${libro.editorial}</td>
                                <td><button type="button" class="btn btn-outline-danger">prestado!</button></td>
                                <td><button type="button" class="btn btn-outline-warning" disabled >prestar</button></td>
                            </tr>`
        } else {
            fila.innerHTML += `<tr>
                                <th scope="row">${i+1}</th>
                                <td>${libro.titulo}</td>
                                <td>${libro.autor}</td>
                                <td>${libro.editorial}</td>                                
                                <td><button type="button" class="btn btn-outline-success">disponible!</button></td>
                                <td><button type="button" class="btn btn-outline-warning">prestar</button></td>
                            </tr>`
        }                     
        i+=1;
    }
}

//Lista los libros prestados -> devuelve un array nuevo solo con los prestados
const listarPrestados = () => {
    return bibliotecaDiego.filter(libro => libro.prestado)
}


//Función que devuelve la cantidad de libros
const contarLibros = () => bibliotecaDiego.length;


//Función que devuelve el último libro ingresado
function ultimoLibro(){
    return bibliotecaDiego[bibliotecaDiego.length-1];
}

//Función nombreUsuario
function nombreUsuario(){
    let nombreUsuario = prompt("Hola! Ingresá el nombre de usuario.")
    return nombreUsuario;
}





/* - - - - - - - - - - - - - */
//Llamo a las funciones que necesito para generar el contenido.

const usuario = nombreUsuario();

//info para la card "resumen"
let saludo = document.querySelector("#nombreUsuario");
saludo.innerHTML = `${usuario}`;

let total = document.querySelector("#total");
total.innerHTML = `${contarLibros()}`;

let prestados = listarPrestados();

let cantidadPrestados = document.querySelector("#prestados");
cantidadPrestados.innerHTML = `${prestados.length}`;

let ultimo = ultimoLibro();
let ultimoTitulo = document.querySelector("#ultimoTitulo");
ultimoTitulo.innerHTML = `<strong>${ultimo.titulo}</strong>`;
let ultimoAutor = document.querySelector("#ultimoAutor");
ultimoAutor.innerHTML = `${ultimo.autor.nombreAutor} ${ultimo.autor.apellidoAutor}` 

let ultimoEditorial = document.querySelector("#ultimoEditorial");
ultimoEditorial.innerHTML = `<strong>${ultimo.editorial.nombreEditorial}</strong>`;

//listo todos los libros para la table #misLibros
listarTodos();

//listo todos los libros que estén prestados
let listaDePrestados = document.querySelector("#listaDePrestados");
for (const prestado of prestados) {
    listaDePrestados.innerHTML += `<li class="list-group-item list-group-item-primary"><b>${prestado.titulo}</b>, de ${prestado.autor}, editado por ${prestado.editorial}, está prestado.</li>` 
}










