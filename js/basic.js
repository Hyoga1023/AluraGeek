//basic.js

import { API_URL, obtenerProductos } from './ConexionAPI.js';

const productosEliminadosVisualmente = new Set();

async function mostrarProductos() {
    try {
        const productos = await obtenerProductos();
        const contenedor = document.querySelector('.contenedor_cards');
        contenedor.innerHTML = ''; 

        productos.forEach(producto => {

            if (!productosEliminadosVisualmente.has(producto.id)) {
                const cardHTML = `
                    <div class="card" data-id="${producto.id}">
                        <img class="img__cards" src="${producto.imagen}" alt="${producto.nombre}" />
                        <div class="card-container--info">
                            <p style="text-align: center;">${producto.nombre}</p>
                            <div class="card-container--value">
                                <p>$ ${producto.precio}</p>
                                <img 
                                    id="trash" 
                                    class="trashIcon" 
                                    src="./img/bote_basura.png" 
                                    data-id="${producto.id}" 
                                />
                            </div>
                        </div>
                    </div>`;
                contenedor.insertAdjacentHTML('beforeend', cardHTML);
            }
        });

        contenedor.addEventListener('click', eliminarProductoVisualmente);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

function eliminarProductoVisualmente(event) {
    if (event.target.classList.contains('trashIcon')) {
        const productoId = event.target.getAttribute('data-id');

        const card = event.target.closest('.card');
        if (card) {
            card.remove();
            productosEliminadosVisualmente.add(productoId);
            alert('Producto Eliminado Exitosamente');
        }
    }
}
async function agregarProductoFormulario() {
    const nombreInput = document.querySelector('#nombre');
    const precioInput = document.querySelector('#precio');
    const imagenInput = document.querySelector('#imagen');

    const nuevoProducto = {
        nombre: nombreInput.value.trim(),
        precio: parseFloat(precioInput.value.trim()),
        imagen: imagenInput.value.trim(),
    };

    try {
        const productoCreado = await crearProducto(nuevoProducto);

        nombreInput.value = '';
        precioInput.value = '';
        imagenInput.value = '';

        productosEliminadosVisualmente.clear();

        crearCardProducto(productoCreado);
    } catch (error) {
        console.error('Error al crear producto:', error);
    }
}

function crearCardProducto(producto) {
    const contenedor = document.querySelector('.contenedor_cards');
    const cardHTML = `
        <div class="card" data-id="${producto.id}">
            <img class="img__cards" src="${producto.imagen || './img/default.png'}" alt="${producto.nombre}" />
            <div class="card-container--info">
                <p style="text-align: center;">${producto.nombre}</p>
                <div class="card-container--value">
                    <p>$ ${producto.precio}</p>
                    <img 
                        id="trash" 
                        class="trashIcon" 
                        src="./img/bote_basura.png" 
                        data-id="${producto.id}" 
                    />
                </div>
            </div>
        </div>`;
    contenedor.insertAdjacentHTML('beforeend', cardHTML);
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();

    const formulario = document.querySelector('#formProducto');
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        agregarProductoFormulario();
    });
});
