document.addEventListener('DOMContentLoaded', () => {
  const funcionalidadEnlace = document.getElementById('funcionalidad-enlace');
  const body = document.body;
  const trashIcons = document.querySelectorAll('.trashIcon');
  const botonVolverArriba = document.getElementById('volver-arriba');

  // Función para cambiar el contexto
  function cambiarContexto(contexto) {
    body.setAttribute('data-contexto', contexto);
  }

  // Evento para el enlace de funcionalidad
  funcionalidadEnlace.addEventListener('click', () => {
    cambiarContexto('Estado de compras');
    document.getElementById('texto').scrollIntoView({ behavior: 'smooth' });
  });

  // Eventos para iconos de eliminación
  trashIcons.forEach(icono => {
    icono.addEventListener('click', () => {
      cambiarContexto('pagina_principal');
    });
  });

  // Manejo del botón de volver arriba
  function manejarBotonVolverArriba() {
    // Mostrar u ocultar el botón basado en la posición del scroll
    if (window.pageYOffset > 200) {
      botonVolverArriba.classList.add('mostrar');
    } else {
      botonVolverArriba.classList.remove('mostrar');
    }
  }

  // Agregar evento de scroll
  window.addEventListener('scroll', manejarBotonVolverArriba);

  // Evento de clic para volver arriba
  botonVolverArriba.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  });
});