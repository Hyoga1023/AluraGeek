// crearProducto.js

import { crearProducto as apiCrearProducto } from './ConexionAPI.js';
import { mostrarProductos } from './listarProductos.js';

class ProductoFormulario {
    constructor() {
        this.formulario = document.querySelector('#formProducto');
        this.botonLimpiar = document.querySelector('#limpiar');
        this.botonEnviar = document.querySelector('#enviar');

        this.inicializarEventListeners();
    }

    inicializarEventListeners() {

        if (this.botonEnviar) {
            this.botonEnviar.addEventListener('click', (e) => {
                e.preventDefault();
                this.manejarFormulario();
            });
        }

        if (this.botonLimpiar) {
            this.botonLimpiar.addEventListener('click', () => this.limpiarFormulario());
        }
    }

    obtenerDatosFormulario() {
        const nombre = document.querySelector('#nombre').value.trim();
        const precio = document.querySelector('#precio').value.trim();
        const imagen = document.querySelector('#imagen').value.trim();

        return { nombre, precio, imagen };
    }

    validarDatos({ nombre, precio, imagen }) {

        if (!nombre || !precio || !imagen) {
            this.mostrarError('Por favor, completa todos los campos');
            return false;
        }

        const precioNumerico = parseFloat(precio);
        if (isNaN(precioNumerico) || precioNumerico <= 0) {
            this.mostrarError('Por favor, ingresa un precio válido');
            return false;
        }

        return true;
    }

    async manejarFormulario() {
        const datosProducto = this.obtenerDatosFormulario();

        if (!this.validarDatos(datosProducto)) {
            return;
        }

        try {

            const nuevoProducto = {
                nombre: datosProducto.nombre,
                precio: parseFloat(datosProducto.precio),
                imagen: datosProducto.imagen
            };


            const productoCreado = await apiCrearProducto(nuevoProducto);

            this.mostrarMensajeExito('Producto agregado con éxito');

            this.limpiarFormulario();

            await mostrarProductos();

        } catch (error) {
            this.mostrarError('Hubo un problema al agregar el producto');
            console.error('Error al crear producto:', error);
        }
    }

    limpiarFormulario() {
        if (this.formulario) {
            this.formulario.reset();
        }
    }

    mostrarError(mensaje) {

        alert(mensaje);
    }

    mostrarMensajeExito(mensaje) {

        alert(mensaje);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductoFormulario();
});