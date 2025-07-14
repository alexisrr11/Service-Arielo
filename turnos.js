const form = document.getElementById("form-turno");
const lista = document.getElementById("lista-turnos");
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

    filtrados.forEach((turno) => {
        const li = document.createElement("li");
        li.className = "p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-white";
        li.innerHTML = `
        <p><strong>Nombre:</strong> ${turno.nombre}</p>
        <p><strong>Dirección:</strong> ${turno.direccion}</p>
        <p><strong>Teléfono:</strong> ${turno.telefono}</p>
        <p><strong>Fecha:</strong> ${turno.fecha}</p>
        <p><strong>Dispositivo:</strong> ${turno.dispositivo}</p>
        <p><strong>Marca:</strong> ${turno.marca}</p>
        <p><strong>Descripción:</strong> ${turno.descripcion || "Sin descripción"}</p>
        <button class="mt-2 bg-lime-700 text-white px-4 py-2 rounded hover:bg-lime-600 transition dark:bg-blue-900 dark:hover:bg-blue-800" data-id="${turno.id}">
          Eliminar
        </button>
        `;
        lista.appendChild(li);

        const botonEliminar = li.querySelector("button");
        botonEliminar.addEventListener("click", function () {
            const confirmar = confirm(`¿Estás seguro que deseas eliminar el turno de "${turno.nombre}"?`);
            if (confirmar) {
                eliminarTurno(turno.id);
            }
        });

    });
}

renderizarTurnos();

// Agregar nuevo turno
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevoTurno = {
        id: Math.random().toString(36).substr(2, 9), // ID único simple
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        fecha: document.getElementById("fecha").value,
        dispositivo: document.getElementById("dispositivo").value,
        marca: document.getElementById("marca").value,
        descripcion: document.getElementById("descripcion").value
    };
    turnos.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(turnos));

    renderizarTurnos();
    form.reset();
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

function eliminarTurno(idTurno) {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos = turnos.filter(t => t.id !== idTurno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    actualizarFiltro();
}
