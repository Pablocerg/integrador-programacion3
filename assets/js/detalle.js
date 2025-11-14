    import { getProductById, updateProductStock } from "./productStore.js";
    import { addToCart, updateCartCounter } from "./carrito.js";

    function getIdFromUrl() {
    const params = new URLSearchParams(location.search);
    return params.get('id');
    }

    function renderDetalle(p) {
    const cont = document.getElementById('detalleProducto');
    const imgPrefix = location.pathname.includes('/pages/') ? '../' : '';
    cont.innerHTML = `
        <h2>${p.nombre}</h2>
        <img src="${imgPrefix}${p.img}" alt="${p.nombre}" width="400" height="300">
        <p>${p.descripcion}</p>
        <p>Categoría: ${p.categoria}</p>
        <p>Precio: $${p.precio.toLocaleString()}</p>
        <p id="stock">Stock: ${p.stock}</p>
        <button id="agregarBtn" ${p.stock === 0 ? 'disabled' : ''}>Agregar al carrito</button>
    `;
    document.getElementById('agregarBtn').addEventListener('click', () => {
        if (addToCart(p.id)) {
        alert('Agregado al carrito');
        renderDetalle(getProductById(p.id)); // re-render para ver nuevo stock
        updateCartCounter();
        } else {
        alert('No hay stock');
        }
    });
    }

    document.addEventListener('DOMContentLoaded', () => {
    const id = getIdFromUrl();
    const p = getProductById(id);
    if (!p) document.getElementById('detalleProducto').innerHTML = '<p>Producto no encontrado</p>';
    else renderDetalle(p);
    });

    window.addEventListener('storage', (e) => {
    // Verifica si el cambio en localStorage fue en el carrito o en los productos
    if (e.key === 'carrito' || e.key === 'productos') {
        // Llama a la función para actualizar el contador del carrito
        updateCartCounter();
        // Opcional: si la página es carrito.html, también vuelve a renderizar el carrito
        if (location.pathname.includes('carrito.html')) {
            mostrarCarrito();
        }
    }
});