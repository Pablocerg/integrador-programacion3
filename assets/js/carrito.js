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

// ---- Funciones Nuevas para la Interfaz de Carrito ----

/**
 * Incrementa la cantidad de un producto en el carrito si hay stock.
 * @param {string} id - ID del producto.
 * @returns {boolean} - true si se incrementó, false si no había stock.
 */
export function increaseCartItemQuantity(id) {
    const prod = getProductById(id);
    if (!prod || prod.stock <= 0) return false;

    // Disminuir stock del producto
    updateProductStock(id, -1);

    // Incrementar cantidad en el carrito
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.cantidad++;
        saveCart(cart);
        return true;
    }
    return false;
}

/**
 * Decrementa la cantidad de un producto en el carrito y si llega a 0, lo elimina.
 * @param {string} id - ID del producto.
 * @returns {boolean} - true si se modificó/eliminó, false si no se encontró.
 */
export function decreaseCartItemQuantity(id) {
    const cart = getCart();
    const itemIndex = cart.findIndex(i => i.id === id);

    if (itemIndex > -1) {
        const item = cart[itemIndex];

        // Aumentar stock del producto (devolver la unidad al stock)
        updateProductStock(id, 1);

        if (item.cantidad > 1) {
            // Decrementar la cantidad si es mayor a 1
            item.cantidad--;
            saveCart(cart);
        } else {
            // Eliminar completamente si la cantidad es 1
            cart.splice(itemIndex, 1);
            saveCart(cart);
        }
        return true;
    }
    return false;
}

/**
 * Elimina un producto por completo del carrito y devuelve su cantidad al stock.
 * @param {string} id - ID del producto.
 * @returns {boolean} - true si se eliminó, false si no se encontró.
 */
export function removeItemFromCart(id) {
    const cart = getCart();
    const itemIndex = cart.findIndex(i => i.id === id);

    if (itemIndex > -1) {
        const item = cart[itemIndex];
        
        // Devolver la cantidad completa de este ítem al stock
        updateProductStock(id, item.cantidad);

        // Eliminar del carrito
        cart.splice(itemIndex, 1);
        saveCart(cart);
        return true;
    }
    return false;
}

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

/**
 * Vacía completamente el carrito, devuelve el stock y actualiza el contador.
 * @returns {boolean} - true si el vaciado fue exitoso.
 */
export function clearCart() {
    const cart = getCart();
    
    // 1. Devolver el stock de todos los ítems (Asumiendo que updateProductStock existe)
    cart.forEach(item => {
        // Devuelve la cantidad de ítems al stock
        if (typeof updateProductStock === 'function') {
            updateProductStock(item.id, item.cantidad);
        }
    });

    // 2. Limpiar el LocalStorage y resetear contador
    localStorage.removeItem(CART_KEY);
    saveCart([]); // Guarda un carrito vacío y llama a updateCartCounter

    return true;
}