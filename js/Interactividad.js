document.addEventListener('DOMContentLoaded', () => {
  const funcionalidadEnlace = document.getElementById('funcionalidad-enlace');
  const body = document.body;
  const trashIcons = document.querySelectorAll('.trashIcon');
  const botonVolverArriba = document.getElementById('volver-arriba');

  function cambiarContexto(contexto) {
    body.setAttribute('data-contexto', contexto);
  }

  funcionalidadEnlace.addEventListener('click', () => {
    cambiarContexto('Estado de compras');
    document.getElementById('texto').scrollIntoView({ behavior: 'smooth' });
  });

  trashIcons.forEach(icono => {
    icono.addEventListener('click', () => {
      cambiarContexto('pagina_principal');
    });
  });

  function manejarBotonVolverArriba() {

    if (window.pageYOffset > 200) {
      botonVolverArriba.classList.add('mostrar');
    } else {
      botonVolverArriba.classList.remove('mostrar');
    }
  }

  window.addEventListener('scroll', manejarBotonVolverArriba);

  botonVolverArriba.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });

    cambiarContexto('pagina_principal');
  });
});
