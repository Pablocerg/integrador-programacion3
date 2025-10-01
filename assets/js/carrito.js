import { getProductById, updateProductStock } from "./productStore.js";
const CART_KEY = "carrito";

export function getCart() {
return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
localStorage.setItem(CART_KEY, JSON.stringify(cart));
updateCartCounter();
}

export function addToCart(id) {
const prod = getProductById(id);
if (!prod || prod.stock <= 0) return false;

// disminuir stock
updateProductStock(id, -1);

// actualizar carrito
const cart = getCart();
const item = cart.find(i => i.id === id);
if (item) item.cantidad++;
else cart.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 1 });
saveCart(cart);
return true;
}

// ---- NUEVA VERSIÓN DE LA FUNCIÓN CON ANIMACIÓN ----
export function updateCartCounter() {
const cart = getCart();
const total = cart.reduce((s, it) => s + it.cantidad, 0);

// Seleccionamos el contador y actualizamos el texto
document.querySelectorAll('#contador-carrito').forEach(el => {
    el.textContent = total;

    // Activamos la animación
    el.classList.remove("bump");
    el.offsetWidth; // Este es un truco para que el navegador resetee la animación
    el.classList.add("bump");
});
}
