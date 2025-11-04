// finaliza-compra.js
import { clearCart } from "./carrito.js"; 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-finalizar-compra');
    const btnConfirmar = document.getElementById('btn-confirmar-pedido');
    
    if (btnConfirmar && form) {
        btnConfirmar.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // 1. Validar el formulario usando el checkValidity de HTML5
            if (!form.checkValidity()) {
                form.reportValidity(); 
                return;
            }

            // 2. VACIAR EL CARRITO al confirmar la compra
            const vaciadoExitoso = clearCart(); 

            if (vaciadoExitoso) {
                // 3. Redirigir a la página de confirmación
                window.location.href = 'compra-confirmada.html';
            } else {
                alert("Error: El carrito no pudo ser vaciado. Intente de nuevo.");
            }
        });
    }
});