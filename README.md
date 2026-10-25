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