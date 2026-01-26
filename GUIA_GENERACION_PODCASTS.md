# 🎙️ Guía para Generar los Podcasts con NotebookLM

Esta guía te explica cómo generar los audios para la sección de podcasts usando la IA de Google (NotebookLM).

## 🛠️ Pasos Generales

1.  Entra en [NotebookLM](https://notebooklm.google.com/).
2.  Crea un **Nuevo Cuaderno** (New Notebook) para cada podcast (o uno general para todos).
3.  **Sube las fuentes**: En la columna izquierda, añade los archivos de nuestro proyecto que se indican abajo para cada tema.
4.  **Generar Audio**:
    *   Haz clic en "Audio Overview" (Resumen de audio).
    *   Haz clic en **"Customize"** (Personalizar) antes de generar.
    *   Pega el **Prompt (Instrucción)** correspondiente.
    *   Dale a "Generate".
5.  **Descargar**: Una vez generado, descárgalo (botón de tres puntos -> Download) y guárdalo en `assets/audio/` con el nombre indicado (ej. `podcast1.mp3`).

---

## 📋 Lista de Podcasts y Prompts

### 1. Vida Laboral (`podcast1.mp3`)
*   **Fuentes a subir**: Sube un PDF oficial de la guía de la Seguridad Social (puedes descargarlo de internet) o usa el archivo `tramites.html` (copia y pega el texto de la tarjeta de vida laboral).
*   **Prompt (Instrucción Personalizada)**:
    > "Genera una conversación en español, amigable y clara, entre dos presentadores. Explican paso a paso cómo un trabajador puede pedir su Vida Laboral. Deben mencionar que es gratis, que se hace en la sede electrónica de la Seguridad Social y la diferencia entre hacerlo con SMS o Cl@ve. El tono debe ser de ayuda práctica, como si un asesor explicara a un trabajador."

### 2. Derechos Laborales Básicos (`podcast2.mp3`)
*   **Fuentes a subir**: `convenio_viaria_texto.txt` y `convenio_interiores_texto.txt`.
*   **Prompt (Instrucción Personalizada)**:
    > "Crea un diálogo en español enfocado en los derechos fundamentales de los trabajadores de limpieza y servicios. Enfócate en explicar qué es el Estatuto de los Trabajadores vs el Convenio Colectivo. Menciona derechos básicos como el descanso, la no discriminación y la seguridad laboral. Hacedlo sonar empoderador pero informativo."

### 3. Entender tu Nómina (`podcast3.mp3`)
*   **Fuentes a subir**: `tabla_salarial_2026.json` y `conceptos_salariales_2026.json` (o cualquier archivo de tablas salariales que tengas).
*   **Prompt (Instrucción Personalizada)**:
    > "Conversación en español explicando cómo leer una nómina. Diferencia claramente entre 'Devengos' (lo que ganas) y 'Deducciones' (lo que te quitan de IRPF y Seguridad Social). Explica qué son las pagas extras y el salario base. Usad un tono educativo para que nadie se pierda con los números."

### 6. Convenio de Limpieza de Interiores (`podcast6.mp3`)
*   **Fuentes a subir**: `convenio_interiores_texto.txt`.
*   **Prompt (Instrucción Personalizada)**:
    > "Haced un resumen profundo en español del Convenio de Limpieza de Edificios y Locales de la Región de Murcia. Destacad los puntos fuertes: subidas salariales recientes, días de asuntos propios y pluses específicos. El tono debe ser de celebración de los logros sindicales y explicación de las normas."

### 9. Calcular Finiquito (`podcast9.mp3`)
*   **Fuentes a subir**: `convenio_interiores_texto.txt`.
*   **Prompt (Instrucción Personalizada)**:
    > "Diálogo en español explicando qué es el finiquito. Aclarad que NO es lo mismo que la indemnización por despido. Explicad que incluye la parte proporcional de pagas extras y vacaciones no disfrutadas. Dad consejos sobre qué revisar antes de firmar 'no conforme'."

### 10. Permisos Retribuidos (`podcast10.mp3`)
*   **Fuentes a subir**: `convenio_interiores_texto.txt` (busca la sección de licencias y permisos).
*   **Prompt (Instrucción Personalizada)**:
    > "Conversación en español detallando los permisos retribuidos: matrimonio, fallecimiento de familiares, mudanza y deberes inexcusables. Explicad cuántos días corresponden en cada caso según el convenio y cómo se deben justificar ante la empresa. Tono muy práctico."

---

## 💡 Consejo Pro
Si NotebookLM genera el audio en inglés por defecto, asegúrate de incluir **"EN ESPAÑOL"** al principio de cada instrucción personalizada, aunque la IA suele detectar el idioma de las fuentes.
