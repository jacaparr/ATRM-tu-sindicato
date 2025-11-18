# 🚀 GUÍA VISUAL: Despliegue del Bot en Railway (PASO A PASO)

## ⚠️ IMPORTANTE: Solo necesitas hacer 4 clics

No necesitas saber programación. Solo sigue las capturas de pantalla.

---

## 📱 PASO 1: Abrir Railway

1. Abre este enlace en tu navegador: 
   **https://railway.app/new**

2. Verás una pantalla como esta:
   ```
   ┌─────────────────────────────────────┐
   │         RAILWAY                     │
   │                                     │
   │  [Login with GitHub]                │
   │                                     │
   └─────────────────────────────────────┘
   ```

3. **HAZ CLIC EN:** "Login with GitHub" (botón morado)

---

## 📱 PASO 2: Autorizar Railway

1. Te pedirá acceso a GitHub. Verás algo así:
   ```
   ┌─────────────────────────────────────┐
   │         GitHub                      │
   │                                     │
   │  Railway wants to access your       │
   │  repositories                       │
   │                                     │
   │  [Authorize Railway]                │
   │                                     │
   └─────────────────────────────────────┘
   ```

2. **HAZ CLIC EN:** "Authorize Railway" (botón verde)

---

## 📱 PASO 3: Crear Proyecto

1. En Railway, verás:
   ```
   ┌─────────────────────────────────────┐
   │  Start a New Project                │
   │                                     │
   │  ☁️  Deploy from GitHub repo        │
   │  📦  Empty Project                  │
   │  📚  Template                       │
   │                                     │
   └─────────────────────────────────────┘
   ```

2. **HAZ CLIC EN:** "Deploy from GitHub repo"

3. Busca y selecciona:
   ```
   📁 jacaparr/ATRM-tu-sindicato
   ```

4. **HAZ CLIC EN:** el repositorio

---

## 📱 PASO 4: Configurar Variable de Entorno

1. Verás la pantalla del proyecto. Busca la pestaña:
   ```
   Variables  Settings  Metrics  Deployments
   ^^^^^^^^^ 
   ```

2. **HAZ CLIC EN:** "Variables"

3. Verás un botón: **"+ New Variable"**

4. **HAZ CLIC EN:** "+ New Variable"

5. Copia y pega EXACTAMENTE esto:

   **Variable Name:**
   ```
   TELEGRAM_BOT_TOKEN
   ```

   **Variable Value:**
   ```
   8351654307:AAGvevlffmdOvVPU3aaeRn2jxPc3dOQMlR4
   ```

6. **HAZ CLIC EN:** "Add" o "Save"

---

## ⏳ PASO 5: Esperar (2-3 minutos)

Railway comenzará a construir el bot automáticamente. Verás algo como:

```
🔨 Building...
⬆️  Deploying...
✅ Deployed successfully
```

**NO TOQUES NADA.** Solo espera a que aparezca el ✅ verde.

---

## ✅ PASO 6: Probar el Bot

1. Abre Telegram en tu móvil o PC
2. En el buscador, escribe: **@atrm_sindicato_bot**
3. Haz clic en el bot
4. Envía el mensaje: **/start**

Si el bot te responde con:

```
👋 ¡Hola José Antonio! Soy el asistente de ATRM - Tu Sindicato.

Puedo ayudarte con:
🔹 Consultas sobre el convenio colectivo
...
```

**¡FUNCIONA! 🎉** El bot ya está activo 24/7.

---

## ❓ Si Algo Sale Mal

### Problema 1: "Repository not found"
**Solución:** En Railway, haz clic en "Configure GitHub App" y dale acceso al repositorio ATRM-tu-sindicato

### Problema 2: El bot no responde en Telegram
**Solución:** 
1. Ve a Railway → Pestaña "Deployments"
2. Haz clic en el último despliegue
3. Busca el botón "View Logs"
4. Mándame una captura de los errores que veas en rojo

### Problema 3: "Build failed"
**Solución:** 
1. Asegúrate de que la variable `TELEGRAM_BOT_TOKEN` esté bien escrita
2. Reinicia el despliegue: Settings → "Restart"

---

## 📊 Cómo Ver Si el Bot Está Funcionando

En Railway, ve a la pestaña **"Metrics"**. Verás:

```
CPU Usage: █░░░░ 2%
Memory: ███░░░ 45 MB
Status: 🟢 Running
```

Si ves **🟢 Running** → Todo bien.
Si ves **🔴 Crashed** → Hay un error, revisa los logs.

---

## 💰 ¿Cuánto Cuesta?

**GRATIS** con el plan gratuito de Railway:
- $5 de crédito gratis cada mes
- Tu bot consume ~$0.50/mes
- **No necesitas tarjeta de crédito** para empezar

Si en algún momento Railway te pide añadir tarjeta, puedes:
- Ignorarlo (el bot seguirá funcionando con el crédito gratis)
- Añadir tarjeta (solo te cobrarán $0.50-$1/mes)

---

## 🎯 Resumen Ultra-Rápido

1. Ve a: **https://railway.app/new**
2. Login con GitHub
3. "Deploy from GitHub repo" → Selecciona ATRM-tu-sindicato
4. Pestaña "Variables" → Añade `TELEGRAM_BOT_TOKEN` con el valor
5. Espera 2-3 minutos
6. Prueba en Telegram: @atrm_sindicato_bot

**¡Eso es todo!** No necesitas saber programación ni terminal. 🚀

---

## 📞 Si Necesitas Ayuda

1. Haz capturas de pantalla de lo que veas
2. Mándamelas
3. Te ayudaré a resolver cualquier problema

**El proceso debería tomar menos de 5 minutos.** ⏱️
