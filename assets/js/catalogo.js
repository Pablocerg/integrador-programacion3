    import { getProducts } from "./productStore.js";
    import { addToCart, updateCartCounter } from "./carrito.js";

    const catalogoContainer = document.querySelector('.catalogo');
    const filtro = document.getElementById('categoria-filtro');

    function renderCatalogo(lista) {
    catalogoContainer.innerHTML = "";
    const imgPrefix = location.pathname.includes('/pages/') ? '../' : '';
    lista.forEach(p => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
        <h3>${p.nombre}</h3>
        <img src="${imgPrefix}${p.img}" alt="${p.nombre}" width="300" height="200">
        <p><strong>Precio: $${p.precio.toLocaleString()}</strong></p>
        <p>${p.descripcion}</p>
        <p>Categoría: ${p.categoria} • Stock: ${p.stock}</p>
        <button class="comprar-btn" data-id="${p.id}">Comprar</button>
        <a href="producto.html?id=${p.id}">Ver detalles</a>
        `;
        catalogoContainer.appendChild(div);
    });
    }

    document.addEventListener('DOMContentLoaded', () => {
    renderCatalogo(getProducts());
    updateCartCounter();
    });

    filtro.addEventListener('change', () => {
    const val = filtro.value;
    const list = getProducts().filter(p => val === 'todas' ? true : p.categoria === val);
    renderCatalogo(list);
    });

    document.addEventListener('click', (e) => {
    if (e.target.classList.contains('comprar-btn')) {
        const id = e.target.dataset.id;
        if (addToCart(id)) alert('Producto agregado');
        else alert('Sin stock');
        renderCatalogo(getProducts());
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