import { 
    getCart, 
    saveCart, 
    updateCartCounter,
    increaseCartItemQuantity, 
    decreaseCartItemQuantity, 
    removeItemFromCart
} from "./carrito.js";
import { getProductById } from "./productStore.js"; // <-- Importación agregada

const listaCarrito = document.getElementById('lista-carrito');
const totalCarritoDiv = document.getElementById('total-carrito');
const btnVaciar = document.getElementById('btn-vaciar'); 
const btnComprar = document.getElementById('btn-comprar');

function mostrarCarrito() {
    const carrito = getCart();
    let totalPrecio = 0;
    let totalItems = 0;

    listaCarrito.innerHTML = '';
    totalCarritoDiv.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        totalCarritoDiv.innerHTML = '<p class="resumen-total">Total: $0</p>';
        return;
    }

    // --- 1. Generar la tabla de productos ---
    let tablaHTML = `
        <table class="tabla-carrito">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th> </tr>
            </thead>
            <tbody>
    `;

    carrito.forEach(itemCarrito => {
        // Obtener la información del producto, incluido el stock, de la tienda
        const productoEnStore = getProductById(itemCarrito.id); 
        
        const subtotal = itemCarrito.precio * itemCarrito.cantidad;
        totalPrecio += subtotal;
        totalItems += itemCarrito.cantidad;
        
        // Determinar el stock disponible. Si no se encuentra el producto, asumimos 0.
        const stockDisponible = productoEnStore ? productoEnStore.stock : 0;
        
        tablaHTML += `
            <tr>
                <td data-label="Producto">
                    <div class="producto-info">
                        <img src="../assets/img/placeholder.png" alt="${itemCarrito.nombre}"> 
                        <div class="producto-info-texto">
                            <p class="producto-nombre">${itemCarrito.nombre}</p>
                            <p>ID: ${itemCarrito.id}</p>
                        </div>
                    </div>
                </td>
                <td data-label="Precio">$${itemCarrito.precio.toLocaleString('es-CL')}</td>
                <td data-label="Cantidad">
                    <div class="control-cantidad">
                        <button data-id="${itemCarrito.id}" data-action="decrease" class="btn-cantidad">-</button>
                        <input type="number" value="${itemCarrito.cantidad}" min="1" readonly>
                        <button data-id="${itemCarrito.id}" data-action="increase" class="btn-cantidad">+</button>
                    </div>
                    <small class="disponibilidad">Disp: ${stockDisponible}</small> 
                </td>
                <td data-label="Subtotal">$${subtotal.toLocaleString('es-CL')}</td>
                <td>
                    <button class="btn-eliminar" data-id="${itemCarrito.id}">🗑️</button>
                </td>
            </tr>
        `;
    });

    tablaHTML += `
            </tbody>
        </table>
    `;
    listaCarrito.innerHTML = tablaHTML;

    // --- 2. Generar el resumen lateral ---
    totalCarritoDiv.innerHTML = `
        <p>Items: ${totalItems}</p>
        <p class="resumen-total">Total: $${totalPrecio.toLocaleString('es-CL')}</p>
    `;

    // --- 3. Agregar listeners para los botones de cantidad y eliminar ---
    
    // Listeners para INCREMENTAR/DECREMENTAR cantidad
    listaCarrito.querySelectorAll('.btn-cantidad').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const action = e.currentTarget.dataset.action;
            
            if (action === 'increase') {
                increaseCartItemQuantity(id);
            } else if (action === 'decrease') {
                decreaseCartItemQuantity(id);
            }
            
            mostrarCarrito();
            updateCartCounter();
        });
    });

    // Listeners para ELIMINAR ítem
    listaCarrito.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            
            removeItemFromCart(id);
            
            mostrarCarrito();
            updateCartCounter();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    updateCartCounter();

    // Reasigna el listener al botón "Vaciar carrito" (en el resumen)
    btnVaciar.addEventListener('click', () => {
        // En un escenario de producción, se iteraría el carrito para devolver el stock.
        // Aquí lo dejamos simple para vaciar el localStorage, aunque la devolución de stock
        // NO está implementada en esta simple acción de vaciado total.
        localStorage.removeItem("carrito"); 
        
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