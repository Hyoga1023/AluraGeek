//conexionAPI

export const API_URL = 'https://67352fac5995834c8a922183.mockapi.io/productos';

export async function obtenerProductos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return []; 
    }
}

export async function crearProducto(producto) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
}

function crearCardProducto(producto) {
    const { nombre } = producto;

    const card = document.createElement('div');
    const nombreElemento = document.createElement('p');
    const eliminarBtn = document.createElement('button');
    const editarBtn = document.createElement('button');

    nombreElemento.innerText = nombre;
    eliminarBtn.innerText = 'Eliminar';
    editarBtn.innerText = 'Editar';

    editarBtn.addEventListener('click', () => {
        const nuevoNombre = prompt("Ingrese el nuevo nombre del producto:", nombre);
        if (nuevoNombre && nuevoNombre.trim() !== '') {
            nombreElemento.innerText = nuevoNombre.trim();
        }
    });

    card.appendChild(nombreElemento);
    card.appendChild(eliminarBtn);
    card.appendChild(editarBtn);

    const contenedorProductos = document.getElementById('contenedor-productos');
    if (contenedorProductos) {
        contenedorProductos.appendChild(card);
    } else {
        console.warn("Contenedor de productos no encontrado en el DOM.");
    }
}

async function cargarProductos() {
    try {
        const productos = await obtenerProductos();
        if (Array.isArray(productos) && productos.length > 0) {
            productos.forEach(crearCardProducto);
        } else {
            console.log('No hay productos para mostrar');
            alert('No hay productos disponibles.');
        }
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function setupFormularioProducto() {
    const formulario = document.getElementById('formProducto');
    
    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nombreInput = document.getElementById('nombre');
            const precioInput = document.getElementById('precio');
            const imagenInput = document.getElementById('imagen');
            
            const nombre = nombreInput.value.trim();
            const precio = precioInput.value.trim();
            const imagen = imagenInput.value.trim();
            
            if (nombre && precio && imagen) {
                try {
                    const nuevoProducto = { nombre, precio, imagen };
                    await crearProducto(nuevoProducto);

                    nombreInput.value = '';
                    precioInput.value = '';
                    imagenInput.value = '';
                } catch (error) {
                    console.error('Error al crear producto:', error);
                }
            }
        });
    } else {
        console.warn("Formulario de producto no encontrado en el DOM.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    setupFormularioProducto();
});
