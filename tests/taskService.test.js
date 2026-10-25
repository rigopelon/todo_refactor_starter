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

describe("cambiarEstado", () => {
  const tareas = [
    { id: 1, titulo: "Estudiar", completada: false },
    { id: 2, titulo: "Programar", completada: true }
  ];

  it("cambia correctamente el estado de una tarea", () => {
    const resultado = cambiarEstado(tareas, 1);

    expect(resultado[0].completada).toBe(true);
  });

  it("mantiene intactas las demás tareas y no modifica el original", () => {
    const resultado = cambiarEstado(tareas, 1);

    expect(resultado[1]).toEqual(tareas[1]);
    expect(tareas[0].completada).toBe(false);
    expect(resultado).not.toBe(tareas);
    expect(resultado[0]).not.toBe(tareas[0]);
  });

  it("conserva las tareas cuando el id no existe", () => {
    const resultado = cambiarEstado(tareas, 99);

    expect(resultado).toEqual(tareas);
  });

  it("permite cambiar una tarea terminada a pendiente", () => {
    const resultado = cambiarEstado(tareas, 2);

    expect(resultado[1].completada).toBe(false);
  });
});

describe("eliminarTarea", () => {
  const tareas = [
    { id: 1, titulo: "Estudiar", completada: false },
    { id: 2, titulo: "Programar", completada: true },
    { id: 3, titulo: "Hacer reporte", completada: false }
  ];

  it("elimina una tarea existente por su id", () => {
    const resultado = eliminarTarea(tareas, 2);

    expect(resultado).toHaveLength(2);
    expect(resultado.find(t => t.id === 2)).toBeUndefined();
    expect(resultado.map(t => t.id)).toEqual([1, 3]);
  });

  it("conserva las tareas cuando el id no existe", () => {
    const resultado = eliminarTarea(tareas, 99);

    expect(resultado).toEqual(tareas);
    expect(resultado).not.toBe(tareas);
  });

  it("devuelve un arreglo vacío cuando no hay tareas", () => {
    const resultado = eliminarTarea([], 1);

    expect(resultado).toEqual([]);
  });

  it("no modifica el arreglo original", () => {
    const resultado = eliminarTarea(tareas, 1);

    expect(tareas).toHaveLength(3);
    expect(tareas[0].id).toBe(1);
    expect(resultado).not.toBe(tareas);
  });
});

// MISIÓN 8: obtenerResumen()

describe("obtenerResumen", () => {

  it("calcula correctamente el resumen de una colección mixta", () => {
    const tareas = [
      { id: 1, titulo: "Estudiar", completada: false },
      { id: 2, titulo: "Programar", completada: true },
      { id: 3, titulo: "Hacer reporte", completada: false },
      { id: 4, titulo: "Revisar código", completada: true }
    ];

    const resultado = obtenerResumen(tareas);

    expect(resultado).toEqual({
      total: 4,
      pendientes: 2,
      terminadas: 2
    });
  });

  it("devuelve todos los valores en cero cuando la colección está vacía", () => {
    const resultado = obtenerResumen([]);

    expect(resultado).toEqual({
      total: 0,
      pendientes: 0,
      terminadas: 0
    });
  });

  it("identifica cuando todas las tareas están pendientes", () => {
    const tareas = [
      { id: 1, titulo: "Tarea 1", completada: false },
      { id: 2, titulo: "Tarea 2", completada: false }
    ];

    const resultado = obtenerResumen(tareas);

    expect(resultado).toEqual({
      total: 2,
      pendientes: 2,
      terminadas: 0
    });
  });

  it("identifica cuando todas las tareas están terminadas", () => {
    const tareas = [
      { id: 1, titulo: "Tarea 1", completada: true },
      { id: 2, titulo: "Tarea 2", completada: true }
    ];

    const resultado = obtenerResumen(tareas);

    expect(resultado).toEqual({
      total: 2,
      pendientes: 0,
      terminadas: 2
    });
  });

  it("no modifica el arreglo original", () => {
    const tareas = [
      { id: 1, titulo: "Estudiar", completada: false }
    ];

    const copia = structuredClone(tareas);

    obtenerResumen(tareas);

    expect(tareas).toEqual(copia);
  });

});