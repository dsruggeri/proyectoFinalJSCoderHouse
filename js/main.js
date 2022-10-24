 
//(mientras no exista un backend y no pueda persistir al nuevo usuario, "Nuevo" y "Visitante" funcionan igual...)
const DIEGO = new Usuario("Diego", "Ruggeri", "dsruggeri", "dsruggeri@gmail.com")
const VISITANTE = new Usuario("Visitante", "", "visitante", "", "")

//Capturo el click en el botón de Diego o de Visitante, y luego llamo a la función correspondiente
const btnLoginVisitante = document.querySelector("#visitante");
const btnLoginDiego = document.querySelector("#diego");
btnLoginVisitante.addEventListener("click", loginVisitante);
btnLoginDiego.addEventListener("click", loginDiego);








function loginDiego(){
    sessionStorage.clear();
    DIEGO.biblioteca = bibliotecaDiego;
    sessionStorage.setItem("usuarioActivo", JSON.stringify(DIEGO));
    
}

function loginVisitante(){
    sessionStorage.clear();
    sessionStorage.setItem("usuarioActivo", JSON.stringify(VISITANTE));  
}











