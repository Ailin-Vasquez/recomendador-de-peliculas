// 1. Referencias a los elementos de la página
const inputEdad = document.getElementById("edad");
const botones = document.querySelectorAll("#generos button");
const mensaje = document.getElementById("mensaje");

// 2. Aquí se guardará el contenido de peliculas.json (nuestra "base de datos")
let peliculas = {};

fetch("peliculas.json")
  .then(respuesta => respuesta.json())
  .then(datos => { peliculas = datos; })
  .catch(() => mostrarError("No se pudo cargar la lista de películas."));

// 3. Convierte la edad en el grupo que usa el JSON
function obtenerGrupo(edad) {
  if (edad >= 2 && edad <= 12) return "2-12";
  if (edad >= 13 && edad <= 17) return "13-17";
  if (edad >= 18) return "18+";
  return null; // edad no válida
}

function mostrarError(texto) {
  mensaje.className = "error";
  mensaje.textContent = texto;
}

// 4. Al presionar un género, se busca y se muestra una película
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const edad = parseInt(inputEdad.value);
    const grupo = obtenerGrupo(edad);

    if (!grupo) {
      mostrarError("Ingresa una edad válida (desde 2 años).");
      return;
    }

    // Marca el botón elegido
    botones.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    // Busca la lista de películas y elige una al azar
    const lista = peliculas[grupo][boton.dataset.genero];
    const pelicula = lista[Math.floor(Math.random() * lista.length)];

    mensaje.className = "";
    mensaje.innerHTML =
      `<span class="titulo">${pelicula.titulo}</span>
       <span class="detalle">${pelicula.anio} · ${boton.dataset.genero}</span>
       ${pelicula.descripcion}`;
  });
});