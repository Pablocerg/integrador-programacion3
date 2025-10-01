    import { initialProductos } from "./data.js";
    const KEY = "productos";

    function ensureInit() {
    if (!localStorage.getItem(KEY)) {
        localStorage.setItem(KEY, JSON.stringify(initialProductos));
    }
    }

    export function getProducts() {
    ensureInit();
    return JSON.parse(localStorage.getItem(KEY));
    }

    export function getProductById(id) {
    return getProducts().find(p => p.id === id);
    }

    export function updateProductStock(id, delta) {
    const prods = getProducts();
    const p = prods.find(x => x.id === id);
    if (!p) return false;
    p.stock = Math.max(0, p.stock + delta);
    localStorage.setItem(KEY, JSON.stringify(prods));
    return true;
    }
