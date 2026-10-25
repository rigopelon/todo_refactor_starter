# ToDo Refactor Starter

Proyecto inicial para **ToDo Refactor Lab**: refactorización, pruebas unitarias y Pair Programming.

## Inicio

```bash
npm install
npm test
```

Durante el desarrollo:

```bash
npm run test:watch
```

La primera prueba está preparada para fallar: es el punto de partida de la **Misión 2** y del ciclo **RED → GREEN → REFACTOR**.

## Estructura

- `src/legacy.js`: código funcional simple para analizar antes de cambiar.
- `src/taskService.js`: lógica de dominio que completarás misión por misión.
- `src/app.js`: interfaz inicial; en la Misión 9 deberá delegar la lógica a `taskService.js`.
- `tests/taskService.test.js`: suite incremental de pruebas unitarias con Vitest.

## Misión 0 · Antes de modificar código
**DRIVER: RIGO**
**NAVIGATOR: HUGO**

Responde aquí:

1. ¿Dónde almacenarías ahora el estado `completada` de una tarea?
    Iria dentro de cada tarea, como propiedad de un objeto, que confirma si una tarea fue completada o pendiente.
2. ¿Qué ocurriría si mañana cada tarea necesita prioridad, fecha o responsable?
    Se necesitaria varias propiedades registradas en los objetos de Tarea para mostralos sin verse acumulados en una sola linea de texto.
3. ¿Qué parte del código representa datos y qué parte representa interfaz?
    Los datos en el arreglo "tareas". El queSelector, innerHTML, y el bucle que imprime.
4. ¿Qué comportamiento debemos conservar durante el refactor?
    

### Tres comportamientos observables que NO deben cambiar

1. Las tareas se muestran en el orden en que estan.
2. Un título vacío o solo con espacios no se agrega y muestra “Escribe un título antes de agregar.”
3. Eliminar quita solo la tarea elegida y deja las demás.

## Registro RED → GREEN → REFACTOR

Documenta al menos una iteración:

- **RED:** ¿qué prueba escribiste y por qué falló?
- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?

## Pair Programming

Registra por misión quién fue **Driver** y quién **Navigator**. Intercambien roles con frecuencia y no hagan commit hasta que ambos puedan explicar el código y la prueba.


## Mision 1 . Cambiar el modelo: de string a objeto
**DRIVER: RIGO**
**NAVIGATOR: HUGO**

1. En el javascript "app.js", cambiamos las variables que guarda el arreglo "tareas" de string a objeto, y se agrego las propiedades id y completada, para
poder identificar cada objeto y verificar si una tarea fue completada o no.
2. Agregamos una nueva variable "sigId", con el valor pre-establecido a 4, con el fin de que la siguiente tarea tenga una id diferente, y asi cada vez que
uno nuevo se agregue.
3. Modificamos la function render() de app.js para que pueda cargar el titulo de la tarea de manera apropiada.
4. En el addEventListener("submit",...), modificamos tareas.push(...) con el fin de que agregue de manera apropiada un nuevo objeto en tareas, en vez de un string. 

## Mision 2 . Cambiar el modelo: de string a objeto
**DRIVER: RIGO**
**NAVIGATOR: HUGO**

1. **RED:** Al correr npm test o npm run test:watch, nos lanza error al tratar de correr la función 'crearTarea'.
2. Al encontrar la función, ubicada en el documento javascript 'taskService.js', muestra que la función solo tiene enviar error de mision 2 pendiente y ningun metodo alguno haciendo la creación de tarea.
3. **RED:** Se implemento un return simple de los valores brindandos en los parametros y con completado = false, pero volvio a fallar.
4. **RED:** Implementamos la prueba brindada en la documentación pdf del caso de estudio, y volvio a fallar.
5. **GREEN** Utilizamos el retorno utilizado en 3., pero esta vez lo encerramos entre llaves, para señalar que estamos regresando un arreglo de propiedades, o sea, un objeto tarea. El codigo corrio con exito.

## Mision 3 . Cambiar el modelo: de string a objeto
**DRIVER: RIGO**
**NAVIGATOR: HUGO**

1. **REFACTOR:** Antes de continuar con misión 3, agregamos un describe para que el npm testpueda verificar lo siguiente que haremos.
2. **RED:** se corrio el programa,y regreso fallo debido a que la funcion 'agregarTarea' esta configurada a regresar error al correr, señalando que falta de codigo en ella.
3. **RED:** se implemento un push hacia el arreglo de tares con nuevaTarea, y a pesar de si haber agregado el objeto dentro del arreglo, tambien modifico el arreglo original, lo cual no es lo que se busca, y es un fallo.
4. **GREEN:** se reemplazo el push hecho a tareas, y en vez retornamos un nuevo arreglo, con el contenido original de tareas, y el nuevo objeto nuevaTarea dentro de ella, evitando modificar el original y aun asi agregar nuevaTarea en el arreglo = return [...tareas, nuevaTarea]. Esto salio con exito.

## Mision 4 . Cambiar el modelo: de string a objeto
**DRIVER: RIGO**
**NAVIGATOR: HUGO**

1. **RED:** Implementamos el describe("buscarTarea") para llevar a cabo la funcion buscarTarea(tareas, id) de taskService.js, lo cual falla debido a que esta programado a hacerlo.
2. **GREEN:** Utilizamos la constante mostrada en la documentacion pdf del caso de estudio, hacemos que la función retorne dicha tarea. Resulto ser un exito.
3. **REFACTOR:** Se puede reducir el codigo a una linea, al inmediatamente retornar el resultado de tareas.find(...) en vez de crear una constante con el valor.

## Mision 5 . Cambiar el modelo: de string a objeto
**DRIVER: RIGO**
**NAVIGATOR: HUGO**

1. **RED:** Implementamos los describe("obtenerPendientes") y describe("obtenerTerminadas"), cada uno con tres casos: colección mixta, ninguna coincidencia y colección vacía. Las 6 pruebas nuevas fallaron porque ambas funciones solo lanzaban el error de "Misión 5 pendiente", sin ninguna lógica de filtrado.
2. **GREEN:** Implementamos las dos funciones con filter(): obtenerPendientes retorna tareas.filter(t => !t.completada) y obtenerTerminadas retorna tareas.filter(t => t.completada). Las 10 pruebas pasaron.
3. **REFACTOR:** No se requirió. Las dos funciones son de una línea y casi espejo, pero extraer una función auxiliar agregaría complejidad sin ganar claridad.
**Decisión de diseño:** se usó filter() porque la intención es seleccionar un subconjunto sin transformar los elementos ni modificar la colección original. map() no aplica porque no hay transformación, y find() devolvería un solo elemento.
**Contrato:** ambas devuelven un array nuevo. Cuando no hay coincidencias o la colección está vacía devuelven [] (no undefined, a diferencia de find()).


## Misión 6. Cambiar el estado de una tarea

**Responsable de implementación: HUGO**

### Objetivo

Implementar la función `cambiarEstado(tareas, id)` para modificar el estado de una tarea de pendiente a terminada o viceversa, sin modificar el arreglo original.

### RED

Se implementaron cuatro pruebas unitarias para verificar:

1. El cambio correcto del estado de una tarea.
2. La conservación de las demás tareas y del arreglo original.
3. El comportamiento cuando el identificador no existe.
4. La posibilidad de cambiar una tarea terminada nuevamente a pendiente.

Inicialmente, las pruebas fallaron porque la función `cambiarEstado()` todavía no estaba implementada y lanzaba el error correspondiente a la Misión 6.

### GREEN

Se implementó la función utilizando `map()` y el operador de propagación (`...`):

```javascript
export function cambiarEstado(tareas, id) {
  return tareas.map(tarea =>
    tarea.id === id
      ? { ...tarea, completada: !tarea.completada }
      : tarea
  );
}
```

La implementación permite generar una nueva colección y modificar únicamente el estado de la tarea seleccionada.

### REFACTOR

Se revisó la implementación y se mantuvo su estructura, ya que utiliza una expresión clara, breve y sin mutaciones.

### Decisión de diseño

Se utilizó `map()` porque permite transformar un elemento dentro de una colección y devolver un nuevo arreglo. El operador de propagación permite copiar el objeto antes de modificar su propiedad `completada`.

**Resultado:** Se agregaron cuatro pruebas unitarias, alcanzando un total de 14 pruebas exitosas.

---

## Misión 7. Eliminar una tarea

**Responsable de implementación: HUGO**

### Objetivo

Implementar la función `eliminarTarea(tareas, id)` para eliminar una tarea mediante su identificador sin modificar la colección original.

### RED

Se desarrollaron cuatro pruebas unitarias para verificar:

1. La eliminación de una tarea existente.
2. El comportamiento cuando el identificador no existe.
3. La eliminación en una colección vacía.
4. La conservación del arreglo original.

Las pruebas nuevas fallaron inicialmente porque la función todavía lanzaba el error de implementación pendiente.

### GREEN

Se implementó la función mediante el método `filter()`:

```javascript
export function eliminarTarea(tareas, id) {
  return tareas.filter(tarea => tarea.id !== id);
}
```

La función devuelve una nueva colección que contiene todas las tareas excepto aquella cuyo identificador coincide con el recibido.

### REFACTOR

Se revisó la implementación y se determinó que no eran necesarias modificaciones adicionales, debido a que el código es sencillo y expresa directamente la operación requerida.

### Decisión de diseño

Se eligió `filter()` en lugar de `splice()` porque permite excluir elementos sin modificar el arreglo original.

**Resultado:** Se incorporaron cuatro pruebas adicionales, alcanzando un total de 18 pruebas exitosas.

---

## Misión 8. Obtener un resumen de tareas

**Responsable de implementación: HUGO**

### Objetivo

Implementar la función `obtenerResumen(tareas)` para calcular el número total de tareas, las pendientes y las terminadas.

### RED

Se implementaron cinco pruebas unitarias para comprobar:

1. El resumen de una colección con tareas pendientes y terminadas.
2. El resultado de una colección vacía.
3. Una colección con todas las tareas pendientes.
4. Una colección con todas las tareas terminadas.
5. La conservación del arreglo original.

Las pruebas fallaron inicialmente porque la función todavía no estaba implementada.

### GREEN

Se desarrolló una primera implementación utilizando `length` y `filter()` para contar las tareas correspondientes a cada estado.

```javascript
export function obtenerResumen(tareas) {
  const total = tareas.length;

  const pendientes = tareas.filter(
    tarea => !tarea.completada
  ).length;

  const terminadas = tareas.filter(
    tarea => tarea.completada
  ).length;

  return {
    total,
    pendientes,
    terminadas
  };
}
```

### REFACTOR

Se mejoró la función reutilizando `obtenerPendientes()` y `obtenerTerminadas()`, implementadas en la Misión 5.

```javascript
export function obtenerResumen(tareas) {
  return {
    total: tareas.length,
    pendientes: obtenerPendientes(tareas).length,
    terminadas: obtenerTerminadas(tareas).length
  };
}
```

Esta modificación reduce la duplicación de lógica y facilita el mantenimiento.

### Decisión de diseño

Se reutilizaron funciones existentes para centralizar las reglas de clasificación de tareas y evitar repetir operaciones de filtrado.

**Resultado:** Se agregaron cinco pruebas unitarias, alcanzando un total de 23 pruebas exitosas.

---

## Misión 9. Integración de la interfaz con taskService.js

**Responsable de implementación: HUGO**

### Objetivo

Integrar las funciones de dominio desarrolladas en `taskService.js` con la interfaz de usuario implementada en `app.js`.

### Estado inicial

Antes de la refactorización, la interfaz utilizaba directamente `push()` para agregar tareas y `splice()` para eliminarlas.

Además, no permitía marcar tareas como terminadas, los filtros estaban pendientes de implementación y el resumen mostraba únicamente el total de tareas.

### Implementación

Se modificó `app.js` para importar las siguientes funciones:

```javascript
import {
  crearTarea,
  agregarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "./taskService.js";
```

Se realizaron los siguientes cambios:

1. Se sustituyó `push()` por `crearTarea()` y `agregarTarea()`.
2. Se reemplazó `splice()` por `eliminarTarea()`.
3. Se incorporaron botones para cambiar el estado mediante `cambiarEstado()`.
4. Se integraron los filtros de tareas pendientes y terminadas.
5. Se agregó un resumen con el total de tareas y sus estados.
6. Se utilizaron identificadores únicos para realizar las operaciones, en lugar de depender de los índices del arreglo.
7. Se utilizó `textContent` para mostrar los títulos sin interpretarlos como HTML.

### REFACTOR

Se separaron las responsabilidades entre los archivos principales:

- `taskService.js`: operaciones sobre los datos y reglas de negocio.
- `app.js`: eventos del usuario, actualización de la interfaz y representación de resultados.

### Decisión de diseño

Se decidió delegar la lógica de negocio al servicio para evitar duplicaciones y mantener la interfaz independiente de las operaciones internas sobre las tareas.

### Verificación

Se definieron pruebas manuales para comprobar la creación de tareas, el cambio de estado, la eliminación, el funcionamiento de los filtros y la actualización del resumen.

Las pruebas unitarias del servicio se mantuvieron en 23 casos.

---

## Misión 10. Refactorización final

**Responsable de implementación: HUGO**

### Objetivo

Revisar y mejorar la organización interna de la aplicación, conservando las funcionalidades desarrolladas anteriormente.

### Revisión realizada

- Se revisó la separación entre la lógica de dominio y la interfaz.
- Se comprobó el uso de operaciones inmutables sobre las tareas.
- Se verificó la reutilización de funciones existentes.
- Se revisó la legibilidad y organización del código.
- Se contempló la exclusión de archivos generados automáticamente mediante `.gitignore`.
- Se ejecutaron pruebas unitarias para verificar el comportamiento.

### Decisiones de diseño

Se mantuvo la lógica de negocio dentro de `taskService.js`, mientras que `app.js` quedó encargado de los eventos y la actualización del DOM.

Esta separación facilita el mantenimiento, la reutilización del código y la ejecución de pruebas unitarias.

### Verificación

Se utilizaron los siguientes comandos:

```bash
npm test
node --check src/taskService.js
node --check src/app.js
```

El refactor se considera correcto cuando todas las pruebas continúan pasando y la interfaz conserva sus funcionalidades.

---

## Misión 11. Mejora opcional: búsqueda de tareas por título

**Responsable de implementación: HUGO**

### Objetivo

Implementar una función adicional que permita buscar tareas utilizando una palabra o fragmento de su título, aplicando el ciclo RED → GREEN → REFACTOR.

### RED

Se diseñaron pruebas unitarias para verificar:

1. La búsqueda de tareas que contienen el texto indicado.
2. La búsqueda sin distinguir mayúsculas y minúsculas.
3. El comportamiento cuando no existen coincidencias.
4. La conservación del arreglo original.
5. La búsqueda con espacios adicionales al inicio y al final.

Durante el desarrollo se identificaron y corrigieron errores relacionados con la ubicación de una prueba unitaria y la importación de la función `buscarPorTitulo()`.

### GREEN

Se implementó la función utilizando `filter()`, `includes()` y `toLowerCase()` para encontrar las coincidencias sin modificar las tareas originales.

### REFACTOR

Se incorporó `trim()` para eliminar espacios innecesarios del criterio de búsqueda.

La implementación final quedó de la siguiente manera:

```javascript
export function buscarPorTitulo(tareas, texto) {
  const busqueda = texto.trim().toLowerCase();

  return tareas.filter(tarea =>
    tarea.titulo.toLowerCase().includes(busqueda)
  );
}
```

### Decisión de diseño

Se utilizó `filter()` porque permite devolver todas las coincidencias en un nuevo arreglo, mientras que `toLowerCase()` y `trim()` facilitan la búsqueda.

Esta mejora se implementó en la capa de dominio y se verificó mediante pruebas unitarias.

### Resultado final

Se ejecutó `npm test` con Vitest 2.1.9 y se obtuvo:

```text
Test Files  1 passed (1)
Tests       28 passed (28)
```

Las cinco pruebas de `buscarPorTitulo()` pasaron correctamente, al igual que las 23 pruebas anteriores.

---

## Resultado general del laboratorio

Durante el laboratorio se trabajaron las misiones 0 a 11, aplicando refactorización incremental, pruebas unitarias y control de versiones con Git.

Se desarrollaron funciones para crear, agregar, buscar, filtrar, modificar y eliminar tareas, además de calcular un resumen y realizar búsquedas por título.

La verificación final de la lógica de dominio se realizó mediante Vitest, obteniendo **28 pruebas unitarias exitosas y ninguna fallida**.

## Aprendizajes

El desarrollo de esta práctica permitió comprender la importancia de separar la lógica de negocio de la interfaz de usuario, utilizar operaciones inmutables y escribir pruebas que permitan detectar errores durante los cambios.

El ciclo RED → GREEN → REFACTOR ayudó a trabajar de forma incremental, comprobando el comportamiento de cada función antes de continuar con la siguiente.

También se reforzó el uso de Git para registrar el avance por misiones y facilitar el trabajo colaborativo.