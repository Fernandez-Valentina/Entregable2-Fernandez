const historialConsultas = JSON.parse(localStorage.getItem("historial")) || [];

// Sección Clima Actual
function mostrarClimaActual() {
    let ciudad = document.getElementById("ciudad").value.trim();
    let errorCiudad = document.getElementById("errorCiudad");
    let resultado = document.getElementById("resultado");

    // Si la entrada no es válida, muestra el error y borra el resultado anterior
    if (ciudad === "" || /\d/.test(ciudad)) {
        errorCiudad.textContent = "Por favor, ingrese una ciudad válida.";
        resultado.innerHTML = ""; // Borra el resultado anterior
        return;
    }

    // Si la entrada es válida, borra el mensaje de error
    errorCiudad.textContent = ""; 

    let climas = ["Soleado", "Nublado", "Lluvioso", "Tormentoso", "Nevado"];
    let climaAleatorio = climas[Math.floor(Math.random() * climas.length)];

    resultado.innerHTML = `<p>El clima en <strong>${ciudad}</strong> es <strong>${climaAleatorio}</strong></p>`;

    // Guardar en historial
    historialConsultas.push(`Clima en ${ciudad}: ${climaAleatorio}`);
    localStorage.setItem("historial", JSON.stringify(historialConsultas));
}

document.getElementById("buscarClima").addEventListener("click", mostrarClimaActual);

// Sección Pronóstico del Clima
function mostrarPronostico() {
    let dias = parseInt(document.getElementById("dias").value);
    let errorPronostico = document.getElementById("errorPronostico");
    let pronosticoResultado = document.getElementById("pronosticoResultado");

    pronosticoResultado.innerHTML = "";

    if (isNaN(dias) || dias < 1 || dias > 5) {
        errorPronostico.textContent = "Por favor, ingrese un número válido entre 1 y 5.";
        return;
    }

    errorPronostico.textContent = "";

    let pronostico = ["Soleado", "Nublado", "Lluvioso", "Tormentoso", "Nevado"];
    let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    let fechaActual = new Date();

    let pronosticoTexto = Array.from({ length: dias }, (_, i) => {
        let diaSemana = diasSemana[(fechaActual.getDay() + i) % 7];
        let climaAleatorio = pronostico[Math.floor(Math.random() * pronostico.length)];
        return `<p>${diaSemana}: ${climaAleatorio}</p>`;
    }).join("");

    pronosticoResultado.innerHTML = `<h3>Pronóstico para los próximos días:</h3>${pronosticoTexto}`;
}
document.getElementById("verPronostico").addEventListener("click", mostrarPronostico);

// Sección Conversor de Temperatura
function convertirTemperatura() {
    let celsius = parseFloat(document.getElementById("temperaturaCelsius").value);
    let errorConversion = document.getElementById("errorConversion");
    let resultado = document.getElementById("conversionResultado");

    if (isNaN(celsius)) {
        errorConversion.textContent = "Por favor, ingrese un número válido.";
        return;
    }

    errorConversion.textContent = "";

    let fahrenheit = (celsius * 9/5) + 32;
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
