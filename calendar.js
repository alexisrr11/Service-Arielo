document.addEventListener('DOMContentLoaded', function () {
    const calendarioEl = document.getElementById('calendar');
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

    // Convertir turnos a eventos FullCalendar
    const eventos = turnos.map(turno => {
      return {
        title: turno.nombre,
        start: `${turno.fecha}`,
        extendedProps: {
          direccion: turno.direccion,
          telefono: turno.telefono,
          dispositivo: turno.dispositivo,
          marca: turno.marca,
          descripcion: turno.descripcion
        }
      };
    });

    // Inicializar calendario
    const calendar = new FullCalendar.Calendar(calendarioEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      events: eventos,
      eventClick: function (info) {
        const props = info.event.extendedProps;
        alert(
          `Nombre: ${info.event.title}\nDirección: ${props.direccion}\nTeléfono: ${props.telefono}\nDispositivo: ${props.dispositivo}\nMarca: ${props.marca}\nDescripción: ${props.descripcion || 'Sin descripción'}`
        );
      }
    });

    calendar.render();
  });
