
/*
 * MISIÓN 9 · ADAPTADOR DE INTERFAZ
 *
 * La interfaz delega la lógica de tareas a taskService.js.
 * app.js únicamente gestiona eventos y actualiza el DOM.
 */

import {
  crearTarea,
  agregarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "./taskService.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filters = [...document.querySelectorAll("[data-filter]")];

let tareas = [
  { id: 1, titulo: "Revisar requisitos", completada: false },
  { id: 2, titulo: "Diseñar pruebas", completada: false },
  { id: 3, titulo: "Refactorizar código", completada: false }
];

let sigId = 4;
let filtro = "todas";

// Obtiene las tareas correspondientes al filtro activo.
function obtenerTareasVisibles() {
  if (filtro === "pendientes") {
    return obtenerPendientes(tareas);
  }

  if (filtro === "terminadas") {
    return obtenerTerminadas(tareas);
  }

  return tareas;
}

// Actualiza la lista y el resumen en pantalla.
function render() {
  list.innerHTML = "";

  const tareasVisibles = obtenerTareasVisibles();

  tareasVisibles.forEach(tarea => {
    const li = document.createElement("li");
    li.className = "task";

    const titulo = document.createElement("span");
    titulo.className = "title";
    titulo.textContent = tarea.titulo;

    if (tarea.completada) {
      titulo.style.textDecoration = "line-through";
      titulo.style.opacity = "0.6";
    }

    const acciones = document.createElement("span");
    acciones.className = "task-actions";

    const botonEstado = document.createElement("button");
    botonEstado.textContent = tarea.completada
      ? "Pendiente"
      : "Completar";
    botonEstado.dataset.toggle = String(tarea.id);

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.dataset.delete = String(tarea.id);

    acciones.appendChild(botonEstado);
    acciones.appendChild(botonEliminar);

    li.appendChild(titulo);
    li.appendChild(acciones);

    list.appendChild(li);
  });

  const resumen = obtenerResumen(tareas);

  summary.textContent =
    `Total: ${resumen.total} | ` +
    `Pendientes: ${resumen.pendientes} | ` +
    `Terminadas: ${resumen.terminadas}`;
}

// Agregar una tarea.
form.addEventListener("submit", event => {
  event.preventDefault();

  const titulo = input.value.trim();

  if (!titulo) {
    message.textContent = "Escribe un título antes de agregar.";
    return;
  }

  const nuevaTarea = crearTarea(sigId, titulo);

  tareas = agregarTarea(tareas, nuevaTarea);
  sigId++;

  input.value = "";
  message.textContent = "";

  render();
});

// Completar o eliminar una tarea.
list.addEventListener("click", event => {
  const boton = event.target.closest("button");

  if (!boton || !list.contains(boton)) {
    return;
  }

  if (boton.dataset.toggle !== undefined) {
    const id = Number(boton.dataset.toggle);

    tareas = cambiarEstado(tareas, id);
    render();
    return;
  }

  if (boton.dataset.delete !== undefined) {
    const id = Number(boton.dataset.delete);

    tareas = eliminarTarea(tareas, id);
    render();
  }
});

// Cambiar el filtro activo.
filters.forEach(button => {
  button.addEventListener("click", () => {
    filtro = button.dataset.filter;

    filters.forEach(b => {
      b.classList.toggle("active", b === button);
    });

    message.textContent = "";
    render();
  });
});

render();
