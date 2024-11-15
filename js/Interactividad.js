const productos = document.getElementById('productos');
const formulario = document.getElementById('formulario');
const body = document.body;

// Función para cambiar el contexto
function cambiarContexto(contexto) {
  body.setAttribute('data-contexto', contexto);
}

// Evento para la sección de productos
productos.addEventListener('click', () => {
  cambiarContexto('pagina_principal');
});

// Evento para la sección de formulario
formulario.addEventListener('click', () => {
  cambiarContexto('Estado de compras');
});