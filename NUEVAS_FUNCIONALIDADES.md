# 🚀 Nuevas Funcionalidades - ATRM Tu Sindicato

## 📋 Resumen de Mejoras

Este proyecto ha sido mejorado con **5 nuevas funcionalidades principales** que aportan un valor significativo a los usuarios:

---

## 1. 🔔 Sistema de Notificaciones

### Descripción
Sistema inteligente que notifica a los usuarios sobre novedades, cambios en convenios, festivos y actualizaciones importantes.

### Características:
- Modal atractivo con lista de notificaciones
- Sistema de "leído/no leído" con localStorage
- Categorización por tipo (importante, convenio, festivos)
- Botón flotante con badge numérico
- Animaciones y diseño responsive
- Compatible con modo oscuro

### Archivos:
- `js/notificaciones.js` - Lógica del sistema
- `css/notificaciones.css` - Estilos

### Uso:
Las notificaciones se muestran automáticamente 2 segundos después de cargar la página si hay novedades no leídas.

---

## 2. 📱 Integración con Telegram

### Descripción
Widget flotante para conectar con el canal y bot de Telegram del sindicato, facilitando consultas rápidas y alertas.

### Características:
- Botón flotante con menú desplegable
- Enlace directo al canal de Telegram
- Chat con bot para consultas
- Sistema de activación de alertas
- Envío de consultas personalizadas
- Diseño con pulso animado

### Archivos:
- `js/telegram_widget.js` - Lógica del widget
- `css/telegram_widget.css` - Estilos

### Configuración:
Edita las variables en `telegram_widget.js`:
```javascript
this.botUsername = 'atrm_sindicato_bot'; // Tu bot
this.channelUrl = 'https://t.me/atrm_sindicato'; // Tu canal
```

---

## 3. 📊 Sistema de Estadísticas y Encuestas

### Descripción
Dashboard completo para visualizar estadísticas de uso, consultas frecuentes y recoger feedback de los usuarios.

### Características:
- Dashboard visual con métricas clave
- Gráficos de temas más consultados
- Sistema de encuestas con estrellas
- Historial de consultas recientes
- Cálculo de satisfacción media
- Almacenamiento local de datos

### Archivos:
- `js/estadisticas.js` - Lógica y dashboard
- `css/estadisticas.css` - Estilos

### Integración:
Se integra automáticamente con las IAs para registrar todas las consultas:
```javascript
window.sistemaStats.registrarConsulta(pregunta, respuesta, tema);
```

---

## 4. 📝 Generador de Documentos

### Descripción
Herramienta interactiva para generar documentos oficiales mediante formularios dinámicos.

### Características:
- **6 tipos de documentos:**
  1. Solicitud de Vacaciones
  2. Solicitud de Permiso
  3. Reclamación Laboral
  4. Comunicación de Baja
  5. Solicitud de Certificado
  6. Solicitud de Excedencia

- Formularios dinámicos con validación
- Previsualización antes de descargar
- Descarga en formato HTML (convertible a PDF)
- Plantillas profesionales y personalizables
- Diseño responsive

### Archivos:
- `generador.html` - Página principal
- `js/generador_documentos.js` - Lógica y plantillas
- `css/generador.css` - Estilos

### Uso:
1. Selecciona el tipo de documento
2. Completa el formulario
3. Previsualiza el resultado
4. Descarga e imprime/guarda como PDF

---

## 5. 🎥 Sección de Vídeos Explicativos

### Descripción
Biblioteca de vídeos tutoriales sobre trámites, derechos y convenios con buscador y categorización.

### Características:
- **10 vídeos iniciales** sobre:
  - Vida laboral
  - Derechos laborales
  - Nómina y salarios
  - Vacaciones y permisos
  - Convenios (Transportes e Interiores)
  - Reclamaciones
  - Finiquitos
  - Y más...

- Buscador en tiempo real
- Filtros por categoría
- Modal con reproductor integrado
- Sistema de tags
- Miniaturas y duraciones
- Diseño tipo YouTube

### Archivos:
- `videos.html` - Página principal
- `js/videos.js` - Lógica y base de datos
- `css/videos.css` - Estilos

### Añadir vídeos:
Edita el array `videos` en `js/videos.js`:
```javascript
{
  id: 11,
  titulo: 'Tu título',
  descripcion: 'Descripción del vídeo',
  categoria: 'tramites', // o 'derechos', 'convenios', 'salarios'
  duracion: '5:30',
  thumbnail: 'URL_de_la_miniatura',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  tags: ['tag1', 'tag2', 'tag3']
}
```

---

## 🔗 Integración en el Sitio

Todas las funcionalidades están integradas en:
- `index.html` - Página principal (Viaria)
- `interiores.html` - Página de Interiores

### Scripts incluidos:
```html
<link rel="stylesheet" href="css/notificaciones.css">
<link rel="stylesheet" href="css/telegram_widget.css">
<link rel="stylesheet" href="css/estadisticas.css">
<script src="js/notificaciones.js"></script>
<script src="js/telegram_widget.js"></script>
<script src="js/estadisticas.js"></script>
```

### Navegación actualizada:
```html
<a href="generador.html">📝 Documentos</a>
<a href="videos.html">🎥 Vídeos</a>
```

---

## 📱 Responsive y Accesibilidad

- Todas las funcionalidades son **100% responsive**
- Compatible con **modo oscuro** existente
- Optimizado para móviles, tablets y desktop
- Animaciones suaves y profesionales
- Carga rápida y sin dependencias externas

---

## 🎨 Consistencia de Diseño

Todos los componentes mantienen:
- Paleta de colores del sitio
- Tipografía coherente
- Espaciado y padding uniformes
- Animaciones similares
- Estilos de botones consistentes

---

## 🚀 Próximos Pasos (Opcional)

### Para Telegram:
1. Crear bot con [@BotFather](https://t.me/botfather)
2. Crear canal público
3. Actualizar URLs en `telegram_widget.js`

### Para Vídeos:
1. Subir vídeos a YouTube
2. Obtener IDs de embed
3. Actualizar URLs en `videos.js`
4. Crear miniaturas personalizadas

### Para Notificaciones:
- Actualizar regularmente el array de notificaciones
- Añadir nuevas categorías según necesidades

---

## 📊 Métricas y Analytics

El sistema de estadísticas registra:
- Total de consultas realizadas
- Temas más consultados
- Satisfacción del usuario (1-5 estrellas)
- Consultas recientes con fecha
- Comentarios y feedback

Todo almacenado localmente (localStorage) para privacidad del usuario.

---

## 🛠️ Mantenimiento

### Actualizar notificaciones:
Edita `js/notificaciones.js` - array `this.notificaciones`

### Añadir documentos:
Edita `js/generador_documentos.js` - objeto `this.plantillas`

### Añadir vídeos:
Edita `js/videos.js` - array `this.videos`

### Configurar Telegram:
Edita `js/telegram_widget.js` - variables de configuración

---

## 💡 Soporte

Para dudas o personalizaciones adicionales, contacta con el equipo de desarrollo.

---

**Desarrollado con ❤️ para ATRM - Tu Sindicato**
