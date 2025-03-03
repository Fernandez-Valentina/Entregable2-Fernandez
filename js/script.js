const historialConsultas = JSON.parse(localStorage.getItem("historial")) || [];

// Sección Clima Actual
function mostrarClimaActual() {
    let ciudad = document.getElementById("ciudad").value.trim();
    let errorCiudad = document.getElementById("errorCiudad");

    if (ciudad === "" || /\d/.test(ciudad)) {
        errorCiudad.textContent = "Por favor, ingrese una ciudad válida.";
        return;
    }
    errorCiudad.textContent = ""; 

    let climas = ["Soleado", "Nublado", "Lluvioso", "Tormentoso", "Nevado"];
    let climaAleatorio = climas[Math.floor(Math.random() * climas.length)];

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p>El clima en <strong>${ciudad}</strong> es <strong>${climaAleatorio}</strong></p>`;

    // Guardar en historial
    historialConsultas.push(`Clima en ${ciudad}: ${climaAleatorio}`);
    localStorage.setItem("historial", JSON.stringify(historialConsultas));
}
document.getElementById("buscarClima").addEventListener("click", mostrarClimaActual);

// Sección Pronóstico del Clima
function mostrarPronostico() {
    let dias = document.getElementById("dias").value;
    dias = parseInt(dias);

    if (isNaN(dias) || dias < 1 || dias > 5) {
        alert("Por favor, ingrese un número válido entre 1 y 5.");
        return;
    }

    let pronostico = ["Soleado", "Nublado", "Lluvioso", "Tormentoso", "Nevado"];
    let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    let pronosticoResultado = document.getElementById("pronosticoResultado");
    pronosticoResultado.innerHTML = "<h3>Pronóstico del Clima:</h3>";

    let fechaActual = new Date();

    for (let i = 0; i < dias; i++) {
        let diaSemana = diasSemana[(fechaActual.getDay() + i) % 7];
        let climaAleatorio = pronostico[Math.floor(Math.random() * pronostico.length)];

        let parrafo = document.createElement("p");
        parrafo.textContent = `${diaSemana}: ${climaAleatorio}`;
        pronosticoResultado.appendChild(parrafo);
    }
}
document.getElementById("verPronostico").addEventListener("click", mostrarPronostico);

// Sección Conversor de Temperatura
function convertirTemperatura() {
    let celsius = parseFloat(document.getElementById("temperaturaCelsius").value);

    if (isNaN(celsius)) {
        alert("Por favor, ingrese un número válido.");
        return;
    }

    let fahrenheit = (celsius * 9/5) + 32;
    let resultado = document.getElementById("conversionResultado");
    resultado.innerHTML = `<p>${celsius}°C es igual a ${fahrenheit.toFixed(2)}°F</p>`;
}
document.getElementById("convertirTemperatura").addEventListener("click", convertirTemperatura);

// Sección Historial de Consultas
function mostrarHistorial() {
    const historialConsultas = JSON.parse(localStorage.getItem("historial")) || [];
    let historialLista = document.getElementById("historialLista");
    
    historialLista.innerHTML = "";
    
    historialConsultas.forEach(function(elemento) {
        let li = document.createElement("li");
        li.textContent = elemento;
        historialLista.appendChild(li);
    });
    }
function borrarHistorial() {
    localStorage.removeItem("historial");
    document.getElementById("historialLista").innerHTML = "<li>Historial vacío</li>";
}
document.getElementById("borrarHistorial").addEventListener("click", borrarHistorial);
document.getElementById("verHistorial").addEventListener("click", mostrarHistorial);
