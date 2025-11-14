document.addEventListener('DOMContentLoaded', function() {
    // Capturar el formulario
    const form = document.querySelector("#formulario-contacto");
    
    // Si no se encuentra el formulario, no hacer nada
    if (!form) return;

    // Capturar el evento submit
    form.addEventListener("submit", validarFormulario); // [cite: 18, 20]

    
    function validarFormulario(event) {
        let esValido = true;
        
        event.preventDefault(); 

        
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const mensajeTextarea = document.getElementById('mensaje');

        
        function limpiarClases(input) {
            input.classList.remove('is-invalid', 'is-valid');
        }
        
        limpiarClases(nombreInput);
        limpiarClases(emailInput);
        limpiarClases(mensajeTextarea);

        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.remove();
        }
         
        const nombreValor = nombreInput.value.trim();
        
        const nombrePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/; 

        if (!nombrePattern.test(nombreValor)) {
            esValido = false;
            nombreInput.classList.add('is-invalid'); 
        } else {
            nombreInput.classList.add('is-valid');
        }
        
        const emailValor = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (!emailPattern.test(emailValor)) {
            esValido = false;
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.add('is-valid');
        }
      
        const mensajeValor = mensajeTextarea.value.trim();
        
        if (mensajeValor.length < 10) {
            esValido = false;
            mensajeTextarea.classList.add('is-invalid');
        } else {
            mensajeTextarea.classList.add('is-valid');
        }
        
        if (esValido) {
            // Crear y mostrar mensaje de éxito
            const successDiv = document.createElement('div');
            successDiv.id = 'success-message';
            successDiv.className = 'alert alert-success mt-4 text-center';
            successDiv.textContent = '¡Mensaje enviado con éxito! Te responderemos a la brevedad.';
            
            // Insertar el mensaje después del contenedor del formulario
            const parent = form.closest('.p-4');
            if(parent) {
                parent.insertAdjacentElement('afterend', successDiv);
            }

            // Limpiar y resetear el formulario
            form.reset(); 
            limpiarClases(nombreInput);
            limpiarClases(emailInput);
            limpiarClases(mensajeTextarea);
            
            
        }
    }
});