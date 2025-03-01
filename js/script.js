const historialConsultas = JSON.parse(localStorage.getItem("historial")) || [];

// Sección Clima Actual
function mostrarClimaActual() {
    let ciudad = document.getElementById("ciudad").value.trim();

    if (ciudad === "") {
        alert("Por favor, ingrese una ciudad válida.");
        return;
    }

    if (/\d/.test(ciudad)) {
        alert("Por favor, ingrese una ciudad válida.");
        return;
    }

    let climas = ["Soleado", "Nublado", "Lluvioso", "Tormentoso", "Nevado"];
    let climaAleatorio = climas[Math.floor(Math.random() * climas.length)];

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p>El clima en <strong>${ciudad}</strong> es <strong>${climaAleatorio}</strong></p>`;

    // Guardar en historial
    historialConsultas.push(`Clima en ${ciudad}: ${climaAleatorio}`);
    localStorage.setItem("historial", JSON.stringify(historialConsultas));
}

document.getElementById("buscarClima").addEventListener("click", mostrarClimaActual);