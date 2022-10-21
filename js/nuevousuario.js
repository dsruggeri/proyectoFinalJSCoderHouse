const NUEVO = new Usuario();

const formCrearUsuario = document.querySelector("#formCrearUsuario")

const nuevoUsuarioNombre = document.querySelector("#nombre")
const nuevoUsuarioApellido = document.querySelector("#apellido")
const nuevoUsuarioUsername = document.querySelector("#username")
const nuevoUsuarioEmail = document.querySelector("#email")


formCrearUsuario.addEventListener("submit", (evt) => {
    //evt.preventDefault();
    sessionStorage.clear();
    NUEVO.nombre = nuevoUsuarioNombre.value; 
    NUEVO.apellido = nuevoUsuarioApellido.value;
    NUEVO.username = nuevoUsuarioUsername.value; 
    NUEVO.email = nuevoUsuarioEmail.value;
    sessionStorage.setItem("usuarioActivo", JSON.stringify(NUEVO));
    alert("Usuario creado exitosamente")
    
    
} )