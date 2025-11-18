# 🚀 Despliegue Automático del Bot en Railway (GRATIS)

## ✅ Archivos de despliegue ya configurados

- ✅ `Dockerfile` → Contenedor optimizado para el bot
- ✅ `railway.json` → Configuración de Railway
- ✅ `.dockerignore` → Excluye archivos innecesarios
- ✅ `package.json` → Scripts de inicio configurados

---

## 📋 Paso a Paso para Railway.app (5 minutos)

### 1️⃣ Crear cuenta en Railway

1. Ve a https://railway.app/
2. Haz clic en **"Start a New Project"**
3. Inicia sesión con **GitHub** (usa tu cuenta jacaparr)
4. Autoriza a Railway a acceder a tus repositorios

### 2️⃣ Conectar tu repositorio

1. En Railway, haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Busca y selecciona: **jacaparr/ATRM-tu-sindicato**
4. Railway detectará automáticamente el `Dockerfile`

### 3️⃣ Configurar variables de entorno

Railway necesita tu token de Telegram. Haz clic en la pestaña **"Variables"**:

Añade estas variables:

```env
TELEGRAM_BOT_TOKEN=8351654307:AAGvevlffmdOvVPU3aaeRn2jxPc3dOQMlR4
SITE_URL=https://atrm-tu-sindicato.vercel.app
IA_PROVIDER=openrouter
IA_MODEL=mistralai/mistral-7b-instruct:free
```

### 4️⃣ Desplegar

1. Railway comenzará a construir el contenedor automáticamente
2. Verás el progreso en tiempo real:
   ```
   Building...
   Installing dependencies...
   Starting bot...
   ✅ Deployed successfully
   ```
3. En 2-3 minutos, tu bot estará funcionando 24/7

### 5️⃣ Verificar que funciona

1. Abre Telegram
2. Busca: **@atrm_sindicato_bot**
3. Envía: `/start`
4. Si responde, ¡está funcionando! 🎉

---

## 🎯 Plan Gratuito de Railway

- ✅ **$5 de crédito gratis/mes** (suficiente para un bot pequeño)
- ✅ **500 horas de ejecución/mes** (≈20 días 24/7)
- ✅ **Despliegues ilimitados**
- ✅ **Variables de entorno seguras**
- ✅ **Logs en tiempo real**

Si se acaba el crédito gratuito (poco probable), te avisarán y puedes:
- Añadir tarjeta (solo pagas lo que uses, ~$1-2/mes)
- Migrar a Render.com (también gratis)

---

## 🔄 Actualizaciones Automáticas

Cada vez que hagas `git push`:
1. Railway detectará el cambio
2. Reconstruirá el contenedor automáticamente
3. Reiniciará el bot con la nueva versión

**No necesitas hacer nada más** 🚀

---

## 📊 Panel de Control de Railway

En https://railway.app/dashboard verás:

- 🟢 **Status**: Online/Offline
- 📈 **Métricas**: Uso de CPU, RAM, Red
- 📝 **Logs**: Mensajes del bot en tiempo real
- ⚙️ **Settings**: Variables, dominios, etc.

---

## 🆘 Solución de Problemas

### El bot no se despliega

**Revisa los logs en Railway:**
1. Ve a tu proyecto en Railway
2. Haz clic en **"Deployments"**
3. Selecciona el último despliegue
4. Revisa los errores en los logs

**Errores comunes:**
- ❌ **"TELEGRAM_BOT_TOKEN is not defined"**
  - Solución: Añade la variable en Settings → Variables
  
- ❌ **"Build failed"**
  - Solución: Verifica que el `Dockerfile` esté en la raíz del repo
  
- ❌ **"Port already in use"**
  - Solución: El bot no necesita puerto, ignora este error

### El bot se despliega pero no responde

1. Verifica en BotFather que el token sea correcto
2. Revisa los logs en Railway: busca errores como "401 Unauthorized"
3. Asegúrate de que `TELEGRAM_BOT_TOKEN` en Railway sea exacto

### El bot se detiene después de un tiempo

- El plan gratuito tiene límites de horas
- Revisa en Railway → Settings → "Usage" cuánto has consumido
- Si se acaba, puedes:
  - Esperar al mes siguiente
  - Añadir tarjeta (solo pagas lo que usas)

---

## 🎁 Alternativa: Render.com (también gratis)

Si prefieres Render:

1. Ve a https://render.com/
2. Regístrate con GitHub
3. Crea **New** → **Web Service**
4. Conecta el repo: `jacaparr/ATRM-tu-sindicato`
5. Configuración:
   - **Name**: `atrm-bot`
   - **Environment**: `Docker`
   - **Plan**: `Free`
6. Añade las mismas variables de entorno
7. Haz clic en **"Create Web Service"**

**Limitación de Render Free:**
- El bot se dormirá después de 15 minutos de inactividad
- Se despierta cuando alguien le habla (tarda ~30 segundos)

**Railway es mejor** porque está siempre activo.

---

## ✅ Checklist Final

Antes de desplegar, asegúrate de que:

- ✅ Has hecho commit de todos los archivos:
  ```powershell
  git add Dockerfile railway.json .dockerignore package.json
  git commit -m "Configura despliegue automático en Railway"
  git push origin main
  ```

- ✅ El repositorio está en GitHub (jacaparr/ATRM-tu-sindicato)

- ✅ Tienes el token de Telegram a mano

- ✅ Has configurado el bot en BotFather (descripción, comandos, etc.)

---

## 🎉 Después del Despliegue

Una vez el bot esté en Railway funcionando 24/7:

1. **Prueba todos los comandos:**
   - `/start`
   - `/ayuda`
   - `/convenio`
   - `/contacto`
   - `/web`

2. **Haz preguntas al bot:**
   - "¿Cuántas vacaciones tengo?"
   - "¿Cuál es mi salario?"
   - "¿Cómo pido una baja?"

3. **Comparte el bot:**
   - Añádelo a la web (ya está en `index.html` con el widget)
   - Compártelo en redes sociales
   - Difúndelo entre tus compañeros

4. **Monitoriza el uso:**
   - Revisa los logs en Railway
   - Verás cuántas personas lo usan
   - Detectarás errores rápidamente

---

## 📞 Soporte

- Railway Status: https://status.railway.app/
- Railway Docs: https://docs.railway.app/
- Telegram Bot API: https://core.telegram.org/bots/api

¡Tu bot estará funcionando 24/7 sin que tengas que hacer nada más! 🚀
