const productos = document.getElementById('productos');
const formulario = document.getElementById('formulario');
const body = document.body;

function cambiarContexto(contexto) {
  body.setAttribute('data-contexto', contexto);
}

productos.addEventListener('click', () => {
  cambiarContexto('pagina_principal');
});

formulario.addEventListener('click', () => {
  cambiarContexto('Estado de compras');
});
