# Configurar Google Gemini API para ATRM

Este documento explica cómo configurar la API de Google Gemini para que las respuestas sobre los convenios de **interior** (Limpieza de edificios y locales) y **viaria** (Limpieza pública viaria) de ATRM utilicen la IA de Gemini.

---

## 📋 Tabla de contenidos
1. [Requisitos previos](#requisitos-previos)
2. [Obtener API Key de Gemini](#obtener-api-key-de-gemini)
3. [Configurar en el servidor](#configurar-en-el-servidor)
4. [Configurar en Vercel](#configurar-en-vercel)
5. [Configurar en Netlify](#configurar-en-netlify)
6. [Configurar en Railway](#configurar-en-railway)
7. [Verificar que funciona](#verificar-que-funciona)

---

## Requisitos previos

- Una cuenta de Google (gratuita)
- Acceso a Google AI Studio o Google Cloud Console
- Tu aplicación de ATRM desplegada en Vercel, Netlify, Railway u otro servidor

---

## Obtener API Key de Gemini

### Opción A: Google AI Studio (RECOMENDADO - Rápido y Gratuito)

1. **Accede a Google AI Studio**
   - Ve a: https://ai.google.dev/
   - Haz clic en "Get API Key"
   - Elige "Create API key in new Google Cloud project"

2. **Copia tu API Key**
   - Se generará automáticamente una API key
   - Cópiala en un lugar seguro (no la compartas públicamente)
   - Ejemplo: `AIzaSy...` (cadena larga de caracteres)

3. **Verifica los límites de cuota**
   - Google Gemini es gratuito con ciertos límites:
     - **60 solicitudes por minuto** para planes gratuitos
     - **1000 solicitudes diarias** aproximadamente
   - Para más información: https://ai.google.dev/pricing

### Opción B: Google Cloud Console (Para proyectos empresariales)

1. Ve a https://console.cloud.google.com/
2. Crea un nuevo proyecto
3. Habilita la API de Gemini
4. Crea una clave de API
5. Asigna permisos y presupuesto si es necesario

---

## Configurar en el servidor

### Variable de entorno

Una vez obtengas tu API key, configura la variable de entorno:

```bash
GEMINI_API_KEY=Tu_API_Key_Aqui
```

**⚠️ IMPORTANTE:** Nunca compartas tu API key públicamente. Mantenla en variables de entorno secretas.

---

## Configurar en Vercel

### Método 1: Panel de Vercel (Recomendado)

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Haz clic en **Settings** → **Environment Variables**
3. Añade una nueva variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Tu API key de Google Gemini
   - **Environments:** Selecciona Producción, Preview y Development
4. Haz clic en **Save**
5. Redeploy tu proyecto:
   - Ve a **Deployments**
   - Haz clic en los tres puntos de tu último deploy
   - Selecciona **Redeploy**

### Método 2: Archivo `.env.local` (Solo desarrollo local)

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
GEMINI_API_KEY=Tu_API_Key_Aqui
```

**⚠️ Nunca commites este archivo a Git. Añádelo a `.gitignore`**

---

## Configurar en Netlify

### Método 1: Panel de Netlify (Recomendado)

1. Ve a tu sitio en Netlify: https://app.netlify.com/
2. Haz clic en **Site settings** → **Build & deploy** → **Environment**
3. Haz clic en **Edit variables** o **Add new variable**
4. Añade:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Tu API key
5. Guarda los cambios
6. Redeploy tu sitio:
   - Ve a **Deploys**
   - Haz clic en **Trigger deploy** → **Deploy site**

### Método 2: `netlify.toml`

Añade esto a tu archivo `netlify.toml`:

```toml
[build.environment]
GEMINI_API_KEY = "Tu_API_Key_Aqui"
```

**⚠️ No commites tu API key real. Usa variables de entorno en el dashboard.**

---

## Configurar en Railway

### Método 1: Dashboard de Railway (Recomendado)

1. Ve a tu proyecto en Railway: https://railway.app/dashboard
2. Abre tu variable de entorno
3. Haz clic en **Variables**
4. Añade una nueva variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Tu API key
5. Guarda cambios
6. Railway redeploy automáticamente o manualmente desde **Deployments**

### Método 2: Archivo `.env` para desarrollo local

```bash
GEMINI_API_KEY=Tu_API_Key_Aqui
```

---

## Verificar que funciona

### Test en el navegador

1. Abre la consola del navegador (F12 → Pestaña Console)
2. Intenta hacer una pregunta sobre el convenio de interior o viaria
3. Observa los logs:
   - ✅ `🤖 Consultando IA Gemini con contexto del convenio...` = API Gemini activa
   - ❌ Si hay error, revisa las variables de entorno

### Test desde terminal (Node.js)

```bash
curl -X POST https://tu-dominio.com/api/chat-gemini \
  -H "Content-Type: application/json" \
  -d '{
    "pregunta": "¿Cuántos días de vacaciones tengo en el convenio de viaria?",
    "tipo_convenio": "viaria"
  }'
```

### Respuesta esperada

```json
{
  "respuesta": "28 días laborales + días asuntos propios...",
  "fuente": "Convenio Colectivo ATRM Limpieza Pública Viaria 2024-2027",
  "modelo": "Google Gemini",
  "tipo_convenio": "viaria"
}
```

---

## Límites y cuotas de Gemini

| Aspecto | Límite |
|--------|--------|
| **Solicitudes por minuto** | 60 |
| **Solicitudes diarias** | ~1000 |
| **Tokens por solicitud** | Sin límite específico |
| **Costo** | GRATUITO (con límites) |

**Si necesitas más:**
- Contrata un plan de Google Cloud
- Contacta a Google AI para límites elevados

---

## Solución de problemas

### ❌ Error: "GEMINI_API_KEY no configurada"

**Solución:**
1. Verifica que la variable está en tu plataforma (Vercel/Netlify/Railway)
2. Redeploy el sitio después de agregar la variable
3. Espera 2-3 minutos para que se propague

### ❌ Error: "Quota exceeded" o "Rate limit exceeded"

**Solución:**
1. Espera unos minutos (límites restablecidos cada minuto)
2. Si es recurrente, actualiza a un plan de pago
3. Implementa caché de respuestas en el cliente

### ❌ API responde pero no con información del convenio

**Solución:**
1. Verifica que `tipo_convenio` sea `'interiores'` o `'viaria'`
2. Revisa los logs de servidor para errores
3. Comprueba que Gemini recibe la información del convenio en el prompt

### ❌ Las respuestas no son precisas

**Solución:**
1. Actualiza la base de datos del convenio en `/api/chat-gemini.js`
2. Ajusta la temperatura (actualmente `0.3` para respuestas precisas)
3. Añade más ejemplos en el prompt del sistema

---

## Archivos modificados

Los siguientes archivos ahora usan Gemini API:

1. **`/api/chat-gemini.js`** - Nueva API Gemini para ambos convenios
2. **`/js/ia_interiores.js`** - Actualizado para usar Gemini en `consultarAPI()`
3. **`/js/ia_viaria.js`** - Nuevo archivo para convenio de viaria con Gemini

---

## Cambios técnicos

### Antes (OpenRouter/DeepSeek)
```javascript
const resp = await fetch('/api/chat', { ... });
```

### Ahora (Gemini)
```javascript
const resp = await fetch('/api/chat-gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    pregunta,
    tipo_convenio: 'interiores' // o 'viaria'
  })
});
```

---

## Contacto y soporte

- **ATRM:** 968 30 00 37
- **Email:** info@atrm-sindicato.es
- **Google AI Support:** https://ai.google.dev/docs

---

## Última actualización

- **Fecha:** 24 de enero de 2026
- **Versión:** 1.0
- **Modelo Gemini:** gemini-1.5-flash
