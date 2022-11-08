 
const cargar = (libros) => {
   for (i = 0; i < libros.length; i+= 1){
    DIEGO.biblioteca.push(libros[i]);
   }
}

const cargarBibliotecaDiego = async () => {
    try{
        const resp = await fetch("../data/bibliotecaDiego.json");
        const data = await resp.json();
        cargar(data);
    }          
    catch(error) {
        console.log(error)
    }
}
const loginDiego = async (evt) => {
    evt.preventDefault();
    let origen = window.location.origin;
    sessionStorage.clear();
    await cargarBibliotecaDiego();
    sessionStorage.setItem("usuarioActivo", JSON.stringify(DIEGO));
    window.location = origen + "/mibiblioteca.html";
}



/*
function loginDiego(){
    sessionStorage.clear();
    cargarBibliotecaDiego();
    sessionStorage.setItem("usuarioActivo", JSON.stringify(DIEGO));  
}
*/

function loginVisitante(){
    sessionStorage.clear();
    sessionStorage.setItem("usuarioActivo", JSON.stringify(VISITANTE));  
}




//(mientras no exista un backend y no pueda persistir al nuevo usuario, "Nuevo" y "Visitante" funcionan igual...)
const DIEGO = new Usuario("Diego", "Ruggeri", "dsruggeri", "dsruggeri@gmail.com")
const VISITANTE = new Usuario("Visitante", "", "visitante", "", "")



//Capturo el click en el botón de Diego o de Visitante, y luego llamo a la función correspondiente
const btnLoginVisitante = document.querySelector("#visitante");
const btnLoginDiego = document.querySelector("#diego");
btnLoginVisitante.addEventListener("click", loginVisitante);
btnLoginDiego.addEventListener("click", loginDiego);











