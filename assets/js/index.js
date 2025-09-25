    // assets/js/index.js
    import { getProducts } from "./productStore.js";
    import { addToCart, updateCartCounter } from "./carrito.js";

    const catalogoContainer = document.querySelector('.catalogo');
    function renderDestacados() {
    const prods = getProducts().slice(0, 3); // o aleatorio
    catalogoContainer.innerHTML = "";
    prods.forEach(p => {
        const div = document.createElement('div');
        div.className = 'producto';
        const imgPrefix = location.pathname.includes('/pages/') ? '../' : '';
        div.innerHTML = `
        <h3>${p.nombre}</h3>
        <img src="${imgPrefix}${p.img}" alt="${p.nombre}" width="300" height="200">
        <p><strong>Precio: $${p.precio.toLocaleString()}</strong></p>
        <p>${p.descripcion}</p>
        <p>Stock: ${p.stock}</p>
        <button data-id="${p.id}" class="comprar-btn">Comprar</button>
        <a href="pages/producto.html?id=${p.id}">Ver detalles</a>
        `;
        catalogoContainer.appendChild(div);
    });
    }
    document.addEventListener('DOMContentLoaded', () => {
    renderDestacados();
    updateCartCounter();
    });

    document.addEventListener('click', (e) => {
    if (e.target.classList.contains('comprar-btn')) {
        const id = e.target.dataset.id;
        if (addToCart(id)) alert('Producto agregado');
        else alert('Sin stock');
        renderDestacados(); // re-render para actualizar stock
    }
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