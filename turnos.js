const form = document.getElementById("form-turno");
const lista = document.getElementById("lista-turnos");

// Obtener turnos previos desde localStorage
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

// Función para renderizar la lista
function renderizarTurnos(filtros = {}) {
    const { nombre = "", direccion = "", telefono = "", fecha = "" } = filtros;
    lista.innerHTML = "";

    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

    const filtrados = turnos.filter(t =>
        t.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
        t.direccion.toLowerCase().includes(direccion.toLowerCase()) &&
        t.telefono.toLowerCase().includes(telefono.toLowerCase()) &&
        (fecha === "" || t.fecha === fecha)
    );

    filtrados.forEach((turno, index) => {
        const li = document.createElement("li");
        li.className = "p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-white";
        li.innerHTML = `
        <p><strong>Nombre:</strong> ${turno.nombre}</p>
        <p><strong>Dirección:</strong> ${turno.direccion}</p>
        <p><strong>Teléfono:</strong> ${turno.telefono}</p>
        <p><strong>Fecha:</strong> ${turno.fecha}</p>
        <p><strong>Descripción:</strong> ${turno.descripcion || "Sin descripción"}</p>
        <button class="mt-2 bg-lime-700 text-white px-3 py-1 rounded hover:bg-lime-600 transition" data-index="${index}">
          Eliminar
        </button>
        `;
        lista.appendChild(li);

        const botonEliminar = li.querySelector("button");
        botonEliminar.addEventListener("click", function () {
            const confirmar = confirm(`¿Estás seguro que deseas eliminar el turno de "${turno.nombre}"?`);
            if (confirmar) {
                eliminarTurno(turno);
            }
        });

    });
}

// Mostrar turnos al cargar
renderizarTurnos();

// Agregar nuevo turno
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevoTurno = {
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value
    };

    turnos.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(turnos)); // Guardar en localStorage

    renderizarTurnos(); // Actualizar vista
    form.reset(); // Limpiar formulario
});

document.getElementById("filtro-nombre").addEventListener("input", actualizarFiltro);
document.getElementById("filtro-direccion").addEventListener("input", actualizarFiltro);
document.getElementById("filtro-telefono").addEventListener("input", actualizarFiltro);
document.getElementById("filtro-fecha").addEventListener("input", actualizarFiltro);

function actualizarFiltro() {
    const nombre = document.getElementById("filtro-nombre").value;
    const direccion = document.getElementById("filtro-direccion").value;
    const telefono = document.getElementById("filtro-telefono").value;
    const fecha = document.getElementById("filtro-fecha").value;

    renderizarTurnos({ nombre, direccion, telefono, fecha });
}

function eliminarTurno(turnoAEliminar) {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

    turnos = turnos.filter(t =>
        !(t.nombre === turnoAEliminar.nombre &&
            t.direccion === turnoAEliminar.direccion &&
            t.telefono === turnoAEliminar.telefono &&
            t.fecha === turnoAEliminar.fecha &&
            t.descripcion === turnoAEliminar.descripcion)
    );

    localStorage.setItem("turnos", JSON.stringify(turnos));
    actualizarFiltro(); // para volver a renderizar la lista con filtros actuales
}