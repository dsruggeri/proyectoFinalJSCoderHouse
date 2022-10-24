
const formNuevoLibro = document.querySelector("#formnuevolibro")

const nuevoTitulo = document.querySelector("#nuevotitulo")
const nuevoAutor = document.querySelector("#nuevoautor")
const nuevoEditorial = document.querySelector("#nuevoeditorial")



formNuevoLibro.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let usuarioTemp = JSON.parse(sessionStorage.getItem('usuarioActivo'));
    let libroTemp = {
        titulo : nuevoTitulo.value,
        autor : nuevoAutor.value,
        editorial : nuevoEditorial.value,
        resenia : "",
        prestado : false
    }
    usuarioTemp.biblioteca.push(libroTemp);
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioTemp));
    Swal.fire(
        'Perfecto!',
        `${libroTemp.titulo} se cargó con éxito`,
        'success'
      )
      confirmar();
} )

function confirmar(){
    let botonOK = document.querySelector(".swal2-confirm");
    let origen = window.location.origin;
    botonOK.addEventListener('click', (evt) => {
        evt.preventDefault();
        window.location = origen + "/mibiblioteca.html";
    })
}