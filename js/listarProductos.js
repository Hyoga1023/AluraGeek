// listarProductos.js

import { API_URL, obtenerProductos } from './ConexionAPI.js';


function crearCards(productos) {
    const contenedorCards = document.querySelector('.contenedor_cards');
    contenedorCards.innerHTML = ''; 

    productos.forEach(producto => {
      
        const imagen = producto.imagen || './img/default.png'; 
        const nombre = producto.nombre || 'Nombre no disponible';
        const precio = producto.precio !== undefined ? `$ ${producto.precio}` : 'Precio no disponible';

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        cardElement.innerHTML = `
            <img class="img__cards" src="${imagen}" alt="${nombre}" />
            <div class="card-container--info">
                <p style="text-align: center;">${nombre}</p>
                <div class="card-container--value">
                    <p>${precio}</p>
                    <img id="trash" class="trashIcon" src="./img/bote_basura.png" alt="Eliminar producto" />
                </div>
            </div>
        `;

        contenedorCards.appendChild(cardElement);
    });
}

export const mostrarProductos = async () => {
    try {
        const productos = await obtenerProductos();
        if (productos.length > 0) {
            crearCards(productos);
        } else {
            console.log('No se encontraron productos');
        }
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

document.addEventListener('DOMContentLoaded', mostrarProductos);

export { crearCards, obtenerProductos };