//Defino la clase libro y sus métodos (prestar, devuelto, agregarResenia)
class Libro {
    constructor(isbn, titulo, autor, editorial, resenia) {
        this.isbn = isbn;
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

//defino la clase Editorial
class Editorial {
    constructor(nombreEditorial) {
        this.nombreEditorial = nombreEditorial;
    }
}

//defino la clase Autor
class Autor {
    constructor(nombreAutor, apellidoAutor) {
        this.nombreAutor = nombreAutor;
        this.apellidoAutor = apellidoAutor;
    }
}

//Defino mi biblioteca como array vacío
const miBiblioteca = [];


//DEFINO ALGUNAS FUNCIONES QUE VOY A UTILIZAR
//Listar todos los libros
function listarTodos() {
    let i = 0;
    let fila = document.querySelector("#listaDeLibros");
    for (const libro of miBiblioteca) { 
        if(libro.prestado){
            fila.innerHTML += `<tr>
                                <th scope="row">${i+1}</th>
                                <td>${libro.titulo}</td>
                                <td>${libro.autor.nombreAutor} ${libro.autor.apellidoAutor}</td>
                                <td>${libro.editorial.nombreEditorial}</td>
                                <td><button type="button" class="btn btn-outline-danger">prestado!</button></td>
                                <td><button type="button" class="btn btn-outline-warning" disabled >prestar</button></td>
                            </tr>`
        } else {
            fila.innerHTML += `<tr>
                                <th scope="row">${i+1}</th>
                                <td>${libro.titulo}</td>
                                <td>${libro.autor.nombreAutor} ${libro.autor.apellidoAutor}</td>
                                <td>${libro.editorial.nombreEditorial}</td>                                
                                <td><button type="button" class="btn btn-outline-success">disponible!</button></td>
                                <td><button type="button" class="btn btn-outline-warning">prestar</button></td>
                            </tr>`
        }                     
        i+=1;
    }
}

//Lista los libros prestados -> devuelve un array nuevo solo con los prestados
const listarPrestados = () => {
    return miBiblioteca.filter(libro => libro.prestado)
}


//Función que devuelve la cantidad de libros
const contarLibros = () => miBiblioteca.length;


//Función que devuelve el último libro ingresado
function ultimoLibro(){
    return miBiblioteca[miBiblioteca.length-1];
}

//Función nombreUsuario
function nombreUsuario(){
    let nombreUsuario = prompt("Hola! Ingresá el nombre de usuario.")
    return nombreUsuario;
}

//creo varias editoriales para asignarle luevo a los libros
const interzona = new Editorial("Interzona");
const randomHouse = new Editorial("Random House");
const edicionesDeLaFlor = new Editorial("Ediciones de la flor");
const eternaCadencia = new Editorial("Eterna Cadencia");
const madreSelva = new Editorial("Madreselva");
const tusquets = new Editorial("Tusquets");
const emece = new Editorial("Emecé");
const godot = new Editorial("Ediciones Godot");
const colihue = new Editorial("Colihué");
const desdeLaGente = new Editorial("Desde la gente");
const alfaguara = new Editorial("Alfaguara");
const sextoPiso = new Editorial("Sexto Piso");
const chai = new Editorial("Chai");
const blattRios = new Editorial("Blatt & Ríos");
const marea = new Editorial("Marea");
const marDulce = new Editorial("Mardulce");
const planeta = new Editorial("Planeta");
const asteroide = new Editorial("Libros del Asteroide")

//creo autorxs para asignarle luego a los libros
const serBiz = new Autor("Sergio", "Bizzio");
const aleDol = new Autor("Alejandro", "Dolina");
const marYus = new Autor("Marina", "Yuszczuk");
const samSch = new Autor("Samanta", "Schweblin");
const selAlm = new Autor("Selva", "Almada");
const marEnr = new Autor("Mariana", "Enriquez");
const marCap = new Autor("Martín", "Caparrós");
const leoMas = new Autor("Leo", "Maslíah");
const julLop = new Autor("Julián", "López");
const belLop = new Autor("Belén", "López Peiró");
const sanLoz = new Autor("Santiago", "Loza");
const osvBai = new Autor("Osvaldo", "Baigorria");
const pabKat = new Autor("Pablo", "Katchadjian");
const agoKri = new Autor("Agota", "Kristof");
const jorCons = new Autor("Jorge", "Consiglio");

//creo varios libros para luego cargarlos en mi biblioteca
const libro01 = new Libro("978-987-8337-03-6", "En esa época", serBiz, interzona, "no hay reseñas...");
const libro02 = new Libro("978-987-8473-46-8", "Para que sepan que vinimos", marYus, blattRios, "no hay reseñas...");
const libro03 = new Libro("978-987-769-159-7", "Ñamérica", marCap, randomHouse, "no hay reseñas...");
const libro04 = new Libro("978-950-515-438-8", "Tres idiotas en busca de un imbécil y otras treinta piezas breves", leoMas, edicionesDeLaFlor, "no hay reseñas...");
const libro05 = new Libro("978-987-712-231-2", "Una muchacha muy bella", julLop, eternaCadencia, "no hay reseñas...");
const libro06 = new Libro("978-987-3861-16-1", "Por qué volvías cada verano", belLop, madreSelva, "no hay reseñas...");
const libro07 = new Libro("978-987-670-457-1", "El hombre que duerme a mi lado", sanLoz, tusquets, "no hay reseñas...");
const libro08 = new Libro("978-987-769-029-3", "Kentukis", samSch, randomHouse, "no hay reseñas...");
const libro09 = new Libro("978-987-769-118-4", "El viento que arrasa", selAlm, randomHouse, "no hay reseñas...");
const libro10 = new Libro("978-950-49-7537-3", "Notas al pie", aleDol, planeta, "no hay reseñas...");
const libro11 = new Libro("978-987-4941-84-8", "Correrías de un infiel", osvBai, blattRios, "no hay reseñas...");
const libro12 = new Libro("978-987-1920-96-9", "Rabia", serBiz, interzona, "no hay reseñas...");
const libro13 = new Libro("978-987-8473-50-5", "Una oportunidad", pabKat, blattRios, "no hay reseñas...");
const libro14 = new Libro("978-841-7977-45-0", "Claus y Lucas", agoKri, asteroide, "no hay reseñas...");
const libro15 = new Libro("978-987-712-220-6", "Sodio", jorCons, eternaCadencia, "no hay reseñas...")

//Agrego los libros a la biblioteca. (¿esto podría estar directamente en el constructor?)
miBiblioteca.push(libro01, libro02, libro03, libro04, libro05, libro06,
    libro07, libro08, libro09, libro10, libro11, libro12, libro13, libro14, libro15);

//Simulo algunos préstamos
libro11.prestar();
libro04.prestar();
libro06.prestar();
libro08.prestar();
libro02.prestar();
libro09.prestar();
libro14.prestar();

//Simulo agregar algunas reseñas
libro01.agregarResenia("Lenguaje ágil, giros inesperados. Soldados, indios y marcianos... Bizzio 100%");
libro09.agregarResenia("Una 'novela de diálogos'. Exquisita descripción de los lugares");

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
    listaDePrestados.innerHTML += `<li class="list-group-item list-group-item-primary"><b>${prestado.titulo}</b>, de ${prestado.autor.nombreAutor} ${prestado.autor.apellidoAutor}, editado por ${prestado.editorial.nombreEditorial}, está prestado.</li>` 
}










