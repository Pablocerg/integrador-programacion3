document.getElementById('verificarBtn').addEventListener('click', function() {

let edadInput = prompt("Por favor, ingresa tu edad:");   // 1. Pide la edad al usuario. 
let edad = parseInt(edadInput);//2. Convierte la entrada a un número entero.
if (edad < 18) {
	alert("Eres menor de edad 😔");
} else {
	alert("Eres mayor de edad 🎉");
}
});



