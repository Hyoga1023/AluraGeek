const funcionalidadEnlace = document.getElementById('funcionalidad-enlace');
const formulario = document.getElementById('formulario');
const body = document.body;
const trashIcons = document.querySelectorAll('.trashIcon');

function cambiarContexto(contexto) {
  body.setAttribute('data-contexto', contexto);
}

funcionalidadEnlace.addEventListener('click', (event) => {
  event.preventDefault();
  cambiarContexto('Estado de compras');
});

formulario.addEventListener('click', (event) => {
  cambiarContexto('pagina_principal');
});


trashIcons.forEach(icono => {
  icono.addEventListener('click', (event) => {
    cambiarContexto('pagina_principal');
  });
});
