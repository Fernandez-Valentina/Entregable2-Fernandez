const historialConsultas = JSON.parse(localStorage.getItem("historial")) || [];

// Sección Clima Actual
function mostrarClimaActual() {
    let ciudad = document.getElementById("ciudad").value.trim();
    let errorCiudad = document.getElementById("errorCiudad");
    let resultado = document.getElementById("resultado");

    // Si la entrada no es válida, muestra el error y borra el resultado anterior
    if (ciudad === "" || /\d/.test(ciudad)) {
        errorCiudad.textContent = "Por favor, ingrese una ciudad válida.";
        resultado.innerHTML = "";
        document.getElementById("ciudad").value = "";
        return;
    }

    errorCiudad.textContent = ""; 

    let climas = ["Soleado", "Nublado", "Lluvioso", "Tormentoso", "Nevado"];
    let climaAleatorio = climas[Math.floor(Math.random() * climas.length)];

    resultado.innerHTML = `<p>El clima en ${ciudad} es ${climaAleatorio}</p>`;
    document.getElementById("ciudad").value = "";

    // Guardar en historial
    historialConsultas.push(`Clima en ${ciudad}: ${climaAleatorio}`);
    localStorage.setItem("historial", JSON.stringify(historialConsultas));
    mostrarHistorial();
}

document.getElementById("buscarClima").addEventListener("click", mostrarClimaActual);

// Sección Pronóstico del Clima
function mostrarPronostico() {
    let dias = parseInt(document.getElementById("dias").value);
    let errorPronostico = document.getElementById("errorPronostico");
    let pronosticoResultado = document.getElementById("pronosticoResultado");

    //Limpia resultado anterior
    pronosticoResultado.innerHTML = "";

    //Verifica si el número de días es válido
    if (isNaN(dias) || dias < 1 || dias > 5) {
        errorPronostico.textContent = "Por favor, ingrese un número válido entre 1 y 5.";
        return;
    }

    errorPronostico.textContent = "";

    let pronostico = ["Soleado", "Nublado", "Lluvioso", "Tormentoso", "Nevado"];
    let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Obtiene fecha actual
    let fechaActual = new Date();

    //Genera el pronóstico según el número ingresado
    let pronosticoTexto = Array.from({ length: dias }, (_, i) => {
        let diaSemana = diasSemana[(fechaActual.getDay() + i) % 7];
        let climaAleatorio = pronostico[Math.floor(Math.random() * pronostico.length)];
        return `<p>${diaSemana}: ${climaAleatorio}</p>`;
    }).join("");

    pronosticoResultado.innerHTML = `${pronosticoTexto}`;
    document.getElementById("dias").value = "";
}
document.getElementById("verPronostico").addEventListener("click", mostrarPronostico);

// Sección Conversor de Temperatura
function convertirTemperatura() {
    let celsiusInput = document.getElementById("temperaturaCelsius");
    let celsius = parseFloat(celsiusInput.value);
    let errorConversion = document.getElementById("errorConversion");
    let resultado = document.getElementById("conversionResultado");

    // Limpia mensajes anteriores
    errorConversion.textContent = "";
    resultado.innerHTML = "";

    if (isNaN(celsius)) {
        errorConversion.textContent = "Por favor, ingrese un número válido.";
        return;
    }

    let fahrenheit = (celsius * 9/5) + 32;
    resultado.innerHTML = `<p>${celsius}°C es igual a ${fahrenheit.toFixed(2)}°F</p>`;

    // Vacía el input después de la conversión
    celsiusInput.value = "";
}

document.getElementById("convertirTemperatura").addEventListener("click", convertirTemperatura);


// Sección Historial de Consultas
function mostrarHistorial() {
    let historialLista = document.getElementById("historialLista");
    
    if (!historialLista) return;
    historialLista.innerHTML = "";

    // Verifica si el historial está vacío
    if (historialConsultas.length === 0) {
        let li = document.createElement("li");
        li.textContent = "Historial vacío";
        historialLista.appendChild(li);
        return;
    }

    // Recorre el historial guardado y agrega cada consulta a la lista
    historialConsultas.forEach(function(elemento) {
        let li = document.createElement("li");
        li.textContent = elemento;
        historialLista.appendChild(li);
    });
}

// Borra el historial y actualizar la vista
function borrarHistorial() {
    localStorage.removeItem("historial");
    historialConsultas.length = 0;
    mostrarHistorial();
}

document.getElementById("borrarHistorial").addEventListener("click", borrarHistorial);
document.addEventListener("DOMContentLoaded", mostrarHistorial);

