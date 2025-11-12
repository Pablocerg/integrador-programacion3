document.addEventListener('DOMContentLoaded', function() {
 
    const form = document.querySelector("#form-finalizar-compra");
    if (!form) return;

    const nombreInput = document.getElementById('nombre');
    const direccionInput = document.getElementById('direccion');
    const emailInput = document.getElementById('email');


    const nombrePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/; 
    const direccionPattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#/-]{5,100}$/;
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

   
    function validarInput(inputElement, pattern) {
        const valor = inputElement.value.trim();
        
        
        inputElement.classList.remove('is-invalid', 'is-valid');

        
        if (valor === '') {
            inputElement.classList.add('is-invalid');
            return false;
        }

        
        if (!pattern.test(valor)) {
            inputElement.classList.add('is-invalid');
            return false;
        }

       
        inputElement.classList.add('is-valid');
        return true;
    }
   

    form.addEventListener("submit", validarFormularioCompra);

    function validarFormularioCompra(event) {
        
        event.preventDefault(); 
        event.stopPropagation();
        
        
        const nombreValido = validarInput(nombreInput, nombrePattern);
        const direccionValida = validarInput(direccionInput, direccionPattern);
        const emailValido = validarInput(emailInput, emailPattern);
        
  
        const esValido = nombreValido && direccionValida && emailValido;

        
        if (esValido) {
           
            localStorage.removeItem('carrito'); 
            
           
            window.location.href = '../pages/compra-confirmada.html';
        }
    }
    
    
    nombreInput.addEventListener('blur', () => {
        validarInput(nombreInput, nombrePattern);
    });
    
    direccionInput.addEventListener('blur', () => {
        validarInput(direccionInput, direccionPattern);
    });

    emailInput.addEventListener('blur', () => {
        validarInput(emailInput, emailPattern);
    });
    
   
    nombreInput.addEventListener('input', () => {
        validarInput(nombreInput, nombrePattern);
    });
    
    direccionInput.addEventListener('input', () => {
        validarInput(direccionInput, direccionPattern);
    });

    emailInput.addEventListener('input', () => {
        validarInput(emailInput, emailPattern);
    });
});