import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

//MISION 02
describe("crearTarea", () => {
  it("crea una tarea pendiente con id y título", () => {
    // Arrange
    const id = 10;
    const titulo = "Diseñar pruebas";

    // Act
    const tarea = crearTarea(id, titulo);

    // Assert
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false });
  });
});

// MISIÓN 3: agrega al menos dos pruebas para agregarTarea().
describe("agregarTarea", () => {
  it("incluye la tarea nueva en la colección resultante", () => {
    // Arrange
    const tareas = [crearTarea(1, "Revisar requisitos")];
    const nueva = crearTarea(2, "Diseñar pruebas");

    // Act
    const resultado = agregarTarea(tareas, nueva);

    // Assert
    expect(resultado).toContainEqual(nueva);
  });
});

// MISIÓN 4: prueba id existente e inexistente para buscarTarea().
describe("buscarTarea", () => {
  it("encuentra una tarea con un id existente", () => {
    // Arrange
    const tareas = [
      crearTarea(1, "Revisar requisitos"),
      crearTarea(2, "Diseñar pruebas")
    ];

    // Act
    const resultado = buscarTarea(tareas, 2);

    // Assert
    expect(resultado).toEqual({ id: 2, titulo: "Diseñar pruebas", completada: false });
  });

  it("devuelve undefined cuando el id no existe", () => {
    // Arrange
    const tareas = [crearTarea(1, "Revisar requisitos")];

    // Act
    const resultado = buscarTarea(tareas, 99);

    // Assert
    expect(resultado).toBeUndefined();
  });
});

// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
describe("obtenerPendientes", () => {
  it("devuelve solo las tareas no completadas de una colección mixta", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: true },
      { id: 2, titulo: "Diseñar pruebas", completada: false },
      { id: 3, titulo: "Refactorizar código", completada: false }
    ];

    // Act
    const resultado = obtenerPendientes(tareas);

    // Assert
    expect(resultado).toEqual([
      { id: 2, titulo: "Diseñar pruebas", completada: false },
      { id: 3, titulo: "Refactorizar código", completada: false }
    ]);
  });

  it("devuelve [] cuando no hay tareas pendientes", () => {
  // Arrange
  const tareas = [
    { id: 1, titulo: "Revisar requisitos", completada: true },
    { id: 2, titulo: "Diseñar pruebas", completada: true }
  ];

  // Act
  const resultado = obtenerPendientes(tareas);

  // Assert
  expect(resultado).toEqual([]);
  });

  it("devuelve [] con una colección vacía", () => {
    // Arrange
    const tareas = [];

    // Act
    const resultado = obtenerPendientes(tareas);

    // Assert
    expect(resultado).toEqual([]);
  });
});

describe("obtenerTerminadas", () => {
  it("devuelve solo las tareas completadas de una colección mixta", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: true },
      { id: 2, titulo: "Diseñar pruebas", completada: false },
      { id: 3, titulo: "Refactorizar código", completada: false }
    ];

    // Act
    const resultado = obtenerTerminadas(tareas);

    // Assert
    expect(resultado).toEqual([
      { id: 1, titulo: "Revisar requisitos", completada: true },
    ]);
  });

  it("devuelve [] cuando no hay tareas pendientes", () => {
  // Arrange
  const tareas = [
    { id: 1, titulo: "Revisar requisitos", completada: true },
    { id: 2, titulo: "Diseñar pruebas", completada: true }
  ];

  // Act
  const resultado = obtenerPendientes(tareas);

  // Assert
  expect(resultado).toEqual([]);
  });

  it("devuelve [] con una colección vacía", () => {
    // Arrange
    const tareas = [];

    // Act
    const resultado = obtenerPendientes(tareas);

    // Assert
    expect(resultado).toEqual([]);
  });
});

// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void cambiarEstado;
void eliminarTarea;
void obtenerResumen;
