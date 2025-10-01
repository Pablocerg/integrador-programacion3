    import { getCart, saveCart } from "./carrito.js";
    import { updateCartCounter } from "./carrito.js";

    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoDiv = document.getElementById('total-carrito');
    const btnVaciar = document.getElementById('btn-vaciar');
    const btnComprar = document.getElementById('btn-comprar');

    function mostrarCarrito() {
    const carrito = getCart();
    let total = 0;
    listaCarrito.innerHTML = '';
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalCarritoDiv.innerHTML = '<h3>Total: $0</h3>';
        return;
    }
    carrito.forEach(producto => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <p>${producto.nombre} - Cantidad: ${producto.cantidad}</p>
        <p>Precio: $${(producto.precio * producto.cantidad).toLocaleString()}</p><br>
        `;
        listaCarrito.appendChild(itemDiv);
        total += producto.precio * producto.cantidad;
    });
    totalCarritoDiv.innerHTML = `<h3>Total: $${total.toLocaleString()}</h3>`;
    }

    document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    updateCartCounter();

    // botón para vaciar carrito
    btnVaciar.addEventListener('click', () => {
        localStorage.removeItem("carrito"); // o saveCart([]) para dejar vacío
        mostrarCarrito();
        updateCartCounter();
    });

    // botón para aceptar compra
    btnComprar.addEventListener('click', () => {
        alert("¡Gracias por tu compra! 🛒🍕");
        localStorage.removeItem("carrito");
        mostrarCarrito();
        updateCartCounter();
    });
    });
