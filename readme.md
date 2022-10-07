# PrestaLibros

## Descripción
PrestaLibros es una página para administrar la biblioteca personal del usuario, y llevar un control de los libros prestados y aún no devueltos.

## Estado de Desarrollo
Se encuentra en un estado de desarrollo primitivo, sin un desarrollo del backend, y con pocas funcionalidades por el momento.

## Funcionalidades
### Resumen: muestra al inicio un resumend el esado de la biblioteca personal: Cantidad de libros total, cantidad de prestados.
### Novedades: muestra cuál es el último libro cargado en la biblioteca.
### Adminsitrar: tiene un acceso rápido a las funcionalidades de 'Nuevo libro' (cargar un libro nuevo a la biblioteca), y 'Prestar libro' (que hace exactamente lo que el nombre describe). Ambas funcionalidades aún no estánd esarrolaldas.

### Funciones desarrolaldas hasta el momento
#### La clase Libro, además del constructor, tiene algunos métodos: prestar (cambia el estado de prestado a true); devuelto (cambia el estado de prestado a false); agregarResenia (reemplaza el valor del atributo reseña por un nuevo valor ingresado)

### Funciones a desarrollar
#### Crear y administrar usuario; y loguearse para ver el contenido de la propia biblioteca.
#### CRUD de cada clase (libro, Editorial, Autor), para poderar realizar las operaciones básicas sobre la biblioteca.
#### Clase "Contacto", para poder asociarla a un préstamo y poder definir un recordatorio para pedir la devolución del libro.

