# PrestaLibros

## Descripción
PrestaLibros es una página para administrar la biblioteca personal del usuario, y llevar un control de los libros prestados y aún no devueltos.

## Estado de Desarrollo
Se encuentra en un estado de desarrollo primitivo, sin un desarrollo del backend, y con algunas funcionalidades aún por desarrollar.

## Funcionalidades
### Resumen: 
muestra al inicio un resumen el esado de la biblioteca personal: Cantidad de libros total, cantidad de prestados.
### Novedades: 
muestra cuál es el último libro cargado en la biblioteca.
### Efemérides:
desde la consulta a una API, muestra una efemérides literaria según el día actual, y una frase del autor/a que nació ese día.
### MisLibros:
permite listar todos los libros que posee el usuario, estén prestados o no.
Muestra la información principal del libro, y permite prestar, editar o eliminar cada uno de lis libros.
### MisPréstamos:
permite ver los libros que están actualmente prestados, y sacarlos de esa lista cuando sea devuelto, mediante el botón "Cargar Devolución"
### AgregarLibro:
permite cargar un nuevo libro en la biblioteca, ingresando los datos básicos. Por defecto, todo libro nuevo se carga con el estado prestado = false


## Funciones principales - detalle:
### consumirAPI() y buscarFrase()
Consulta la API de Efemérides, y trae la efemérides del día de la fecha, para mostrarla en el DOM.
### salir()
Limpia el sessionStorage, y redirecciona a la página de login.
### listarTodos()
Muestra en el DOM todos los libros de la biblioteca del usuario activo, independientemente si están prestados o no.
También permite editar, eliminar o prestar cualquiera de los libros mostrados.
### listarPrestados()
Muestra los libros de la biblioteca del usuario que en este momento estén prestados. Permite cargar la devolución del mismo, lo que setea el estado de 'prestado' a false.
### nuevoLibro()
Permite cargar un nuevo libro en la biblioteca del usuario activo, ingresando los datos básicos. Por defecto, todo libro nuevo se carga con el estado prestado = false
### resumen()
Muestra la cantidad de libros total del usuario activo, y la cantidad de prestados.
### novedades()
Muestra el último libro ingresado por el usuario activo.
### prestar()
Cambia el estado del atributo 'prestado' del libro seleccionado a 'true'.
### devolucion()
Cambia el estado del atributo 'prestado' del libro seleccionado a 'false'.
### eliminar()
Eliminar el libro seleccionado de la biblioteca del usuario activo.
### editarLibro()
Permite cambiar la info de un libro ya existente. Nombre, Autor/a, Editorial y Reseña.

## Librerías utilizadas
Se utilizó sweetAlert para los mensajes de éxito de las acciones del usuario.
También se utilizó Bootstrap para los estilos.






### Funciones a desarrollar
Crear y administrar usuario; y loguearse para ver el contenido de la propia biblioteca.
CRUD de cada clase (libro, Editorial, Autor), para poderar realizar las operaciones básicas sobre la biblioteca.
Clase "Contacto", para poder asociarla a un préstamo y poder definir un recordatorio para pedir la devolución del libro.

