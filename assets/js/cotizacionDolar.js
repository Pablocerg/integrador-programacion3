export async function obtenerCotizacionDolarOficialYCalcularTotal(totalARS) { 
    const url = 'https://dolarapi.com/v1/dolares/oficial';
    const contenedorDolar = document.getElementById('cotizacion-dolar');
        
    // mostrar mensaje de carga
    contenedorDolar.innerHTML = `<p>Cargando cotización...</p>`;

    try {
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(`Error al obtener los datos: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        const valorCompraDolar = data.compra; 

        if (!valorCompraDolar) {
            contenedorDolar.innerHTML = '<p>Error: No se encontró el valor de compra en la API.</p>';
            return;
        }
        
        // formato para la cotizacion en pesos
        const cotizacionFormateadaARS = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(valorCompraDolar);

        let htmlCotizacion = `
            <div class="alerta-dolar">
                <p>Valor del dolar: ${cotizacionFormateadaARS}</p>
        `;
        
        // dividir pesos en valor del dolar
        if (totalARS > 0) {
            const totalUSD = totalARS / valorCompraDolar;
            
            // formato total en dolares
            const totalFormateadoUSD = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            }).format(totalUSD);
            
            htmlCotizacion += `<hr style="margin: 8px 0;">`;
            htmlCotizacion += `<p>Total en dolares: ${totalFormateadoUSD}</p>`;
        }
        
        // actualizar el Contenedor
        contenedorDolar.innerHTML = htmlCotizacion;

    } catch (error) {
        console.error('Fallo al obtener la cotización del dólar:', error);
        contenedorDolar.innerHTML = '<p>Lo sentimos, no pudimos cargar la cotización del dólar.</p>';
    }
}