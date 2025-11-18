# 🤖 Bot de Telegram - Instrucciones de Uso

## ✅ ¡El bot ya está configurado y listo!

### 🎯 Pasos completados:

1. ✅ **Bot creado** → `@atrm_sindicato_bot`
2. ✅ **Token configurado** en `.env`
3. ✅ **Dependencias instaladas** (node-telegram-bot-api, dotenv, axios)
4. ✅ **Código del bot** con comandos e IA integrada
5. ✅ **Todo subido a GitHub** (excepto .env por seguridad)

---

## 📱 SIGUIENTE: Configura el bot en BotFather

Abre Telegram y habla con **@BotFather**. Copia y pega estos comandos uno por uno:

### 1️⃣ Descripción del bot

```
/setdescription
@atrm_sindicato_bot
```

Luego copia:

```
🤖 Asistente oficial del Sindicato ATRM (Región de Murcia)

Consulta información sobre:
✅ Convenio colectivo de limpieza
✅ Salarios y categorías profesionales  
✅ Permisos y vacaciones
✅ Trámites sindicales
✅ Derechos laborales

Disponible 24/7 para resolver tus dudas laborales.
```

### 2️⃣ Texto "Acerca de"

```
/setabouttext
@atrm_sindicato_bot
```

Luego:

```
Bot oficial de ATRM - Asociación de Trabajadores de la Región de Murcia.
Información laboral del sector de limpieza pública viaria.
Web: https://atrm-tu-sindicato.vercel.app
```

### 3️⃣ Comandos

```
/setcommands
@atrm_sindicato_bot
```

Luego:

```
start - Iniciar conversación con el bot
ayuda - Ver comandos y ejemplos de uso
convenio - Información del convenio colectivo
contacto - Teléfonos y email del sindicato
web - Visitar la web oficial de ATRM
```

### 4️⃣ Foto de perfil (opcional)

```
/setuserpic
@atrm_sindicato_bot
```

Sube una imagen cuadrada del logo ATRM (mínimo 200x200px)

---

## 🚀 EJECUTAR EL BOT

### En tu PC (para probar):

```powershell
npm run bot
```

Verás:
```
🤖 Bot de ATRM iniciado correctamente
✅ Bot escuchando mensajes...
```

### ✅ PROBAR:

1. Abre Telegram
2. Busca `@atrm_sindicato_bot`
3. Pulsa **Start**
4. Prueba comandos: `/start`, `/convenio`, `/contacto`
5. Haz preguntas: "¿Cuántos días de vacaciones tengo?"

---

## 📢 CREAR EL CANAL

1. Telegram → Menú → **Nuevo canal**
2. **Nombre**: `ATRM - Tu Sindicato`
3. **Descripción**:

```
📢 Canal oficial del Sindicato ATRM
🔹 Noticias laborales
🔹 Actualizaciones del convenio
🔹 Avisos importantes
🔹 Derechos de los trabajadores

💻 Web: https://atrm-tu-sindicato.vercel.app
📞 Teléfono: 968 30 00 37
```

4. **Tipo**: Público
5. **Nombre de usuario**: `atrm_sindicato`
6. Subir **foto** del logo

---

## 🌐 DESPLEGAR 24/7 (producción)

Para que el bot esté siempre activo, necesitas un servidor. Opciones:

### Opción 1: VPS (Digital Ocean, Linode, Hetzner)
- Costo: ~$5-10/mes
- Instrucciones completas en `bot/SETUP.md`

### Opción 2: Railway.app (gratis)
1. Crear cuenta en railway.app
2. Conectar repositorio GitHub
3. Añadir variable de entorno `TELEGRAM_BOT_TOKEN`
4. Deploy automático

### Opción 3: Render.com (gratis)
Similar a Railway, con deploy automático desde GitHub.

---

## 📋 FUNCIONALIDADES DEL BOT

✅ **Comandos**:
- `/start` - Bienvenida
- `/ayuda` - Lista de ayuda
- `/convenio` - Info del convenio
- `/contacto` - Teléfonos y email
- `/web` - Enlace a la web

✅ **Respuestas inteligentes** a preguntas sobre:
- Vacaciones
- Salarios
- Permisos
- Bajas médicas
- Y más...

✅ **Botones interactivos** para navegar

---

## 🔒 SEGURIDAD

- ✅ Token seguro en `.env` (NO en GitHub)
- ✅ `.gitignore` configurado
- ✅ Variables de entorno preparadas

---

## 📞 AYUDA

Si necesitas ayuda:
1. Revisa `bot/SETUP.md` (guía completa)
2. Mira logs con: `npm run bot`
3. Documentación: https://core.telegram.org/bots/api

---

**¡Tu bot está listo! Solo falta configurarlo en BotFather y ejecutarlo.** 🎉
