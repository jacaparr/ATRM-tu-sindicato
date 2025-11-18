# 🎬 Sistema de Generación Automática de Vídeos

## 📋 Plan de Implementación

Este sistema creará vídeos educativos automáticamente usando IA generativa.

### 🎯 Servicios de IA para Vídeos

#### Opción 1: **D-ID** (Recomendado)
- ✅ Avatares realistas con voz
- ✅ API simple
- ✅ Plan gratuito: 5 min/mes
- ✅ Precio: $5.9/mes por 10 min
- 🔗 https://www.d-id.com

#### Opción 2: **HeyGen**
- ✅ Avatares muy realistas
- ✅ Voces en español
- ✅ Plan desde $30/mes
- 🔗 https://www.heygen.com

#### Opción 3: **Synthesia**
- ✅ Calidad profesional
- ✅ Múltiples avatares
- ✅ Plan desde $30/mes
- 🔗 https://www.synthesia.io

#### Opción 4: **Pictory.ai**
- ✅ Texto a vídeo
- ✅ Sin avatar, solo voz y texto
- ✅ Más económico
- 🔗 https://pictory.ai

### 🎬 Vídeos a Crear (30 vídeos)

#### Categoría: Convenio Básico (5 vídeos)
1. "Introducción al Convenio de Limpieza Viaria"
2. "Jornada Laboral: Horarios y Descansos"
3. "Categorías Profesionales en el Convenio"
4. "Incrementos Salariales 2024-2027"
5. "Ámbito de Aplicación del Convenio"

#### Categoría: Salarios (5 vídeos)
6. "Cómo Leer tu Nómina"
7. "Tablas Salariales 2025"
8. "Pagas Extraordinarias"
9. "Plus de Nocturnidad y Festivos"
10. "Cálculo de Horas Extras"

#### Categoría: Vacaciones y Permisos (5 vídeos)
11. "Derecho a Vacaciones: 30 Días"
12. "Cómo Solicitar Vacaciones"
13. "Permisos Retribuidos: Matrimonio"
14. "Permisos por Nacimiento y Lactancia"
15. "Permiso por Fallecimiento Familiar"

#### Categoría: Trámites (5 vídeos)
16. "Solicitar la Vida Laboral Online"
17. "Cómo Tramitar una Baja Médica"
18. "Afiliarse al Sindicato ATRM"
19. "Presentar una Reclamación Salarial"
20. "Solicitar Certificado de Empresa"

#### Categoría: Derechos Laborales (5 vídeos)
21. "Derechos Fundamentales del Trabajador"
22. "Qué Hacer ante un Despido"
23. "Cálculo del Finiquito"
24. "Reclamar Horas Extras No Pagadas"
25. "Derecho a Representación Sindical"

#### Categoría: Prevención (5 vídeos)
26. "Prevención de Riesgos Laborales"
27. "Uso Correcto de EPIs"
28. "Qué Hacer en Caso de Accidente"
29. "Ergonomía en el Trabajo"
30. "Derechos ante Acoso Laboral"

### 🤖 Proceso de Generación Automática

```
1. GUION IA → Generar texto del vídeo (GPT-4 / Claude)
2. VOZ IA → Convertir texto a audio (ElevenLabs / Azure)
3. VÍDEO IA → Crear avatar + voz (D-ID / HeyGen)
4. EDICIÓN → Añadir logo, subtítulos
5. SUBIDA → YouTube API automático
6. ACTUALIZAR WEB → Añadir enlace en videos.js
```

### 📅 Calendario de Producción

- **Días 1-10**: Vídeos 1-10 (Convenio + Salarios)
- **Días 11-20**: Vídeos 11-20 (Vacaciones + Trámites)
- **Días 21-30**: Vídeos 21-30 (Derechos + Prevención)

**1 vídeo por día = 30 días total**

### 💰 Costos Estimados

#### Opción ECONÓMICA (D-ID + ElevenLabs)
- D-ID: $5.9/mes (10 min) → suficiente para ~10 vídeos cortos
- ElevenLabs: Gratis (10k caracteres/mes)
- **Total**: ~$6/mes durante 3 meses = $18 total

#### Opción PREMIUM (HeyGen)
- $30/mes → vídeos ilimitados
- Mejor calidad
- **Total**: $30/mes

### 🔧 Implementación Técnica

Necesitaremos crear:

1. **`scripts/generar-video.js`** → Script principal
2. **`scripts/guiones/`** → Carpeta con todos los guiones
3. **`api/create-video.js`** → Endpoint para crear vídeo
4. **`.env`** → API keys (D-ID, YouTube, etc.)

### 📝 Siguiente Paso

¿Quieres que:

**A)** Configure el sistema con D-ID (más económico)
**B)** Configure con HeyGen (mejor calidad)
**C)** Te muestre primero los 30 guiones completos antes de implementar

**Responde A, B o C para continuar.**
