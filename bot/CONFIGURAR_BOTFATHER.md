# 🤖 Configuración Final del Bot en BotFather

## ✅ Bot ya creado: @atrm_sindicato_bot

Ahora vamos a configurar la información y comandos para que los usuarios lo vean profesional.

---

## 📋 Pasos de Configuración

### 1️⃣ Abrir BotFather

1. En Telegram, busca: **@BotFather**
2. Inicia conversación con `/start`

---

### 2️⃣ Configurar Descripción Corta

Escribe en BotFather:
```
/setdescription
```

Selecciona: **@atrm_sindicato_bot**

Pega este texto:
```
🔹 Asistente oficial de ATRM - Tu Sindicato
Información sobre convenio colectivo, salarios, vacaciones, trámites y derechos laborales del sector de limpieza en la Región de Murcia.
```

---

### 3️⃣ Configurar Descripción Corta (About)

Escribe en BotFather:
```
/setabouttext
```

Selecciona: **@atrm_sindicato_bot**

Pega este texto:
```
Asistente de ATRM - Información laboral del convenio de limpieza
```

---

### 4️⃣ Configurar Comandos

Escribe en BotFather:
```
/setcommands
```

Selecciona: **@atrm_sindicato_bot**

Pega estos comandos (todos juntos):
```
start - Iniciar el bot y ver opciones
ayuda - Ver lista de comandos disponibles
convenio - Información sobre el convenio colectivo
contacto - Contactar con el sindicato
web - Visitar la web oficial
```

---

### 5️⃣ Subir Foto de Perfil (Avatar)

Necesitas la imagen del logo de ATRM. Si la tienes:

1. Escribe en BotFather:
   ```
   /setuserpic
   ```

2. Selecciona: **@atrm_sindicato_bot**

3. Envía la imagen del logo (debe ser cuadrada, mínimo 200x200 px)

Si no tienes logo, puedes usar esta alternativa:
- Busca "union logo orange" en Google Images
- O usa un generador como: https://logo.com/

---

### 6️⃣ Configurar Mensaje de Bienvenida en Grupos (Opcional)

Si quieres que el bot funcione en grupos:

Escribe en BotFather:
```
/setjoingroups
```

Selecciona: **@atrm_sindicato_bot**

Elige: **Enable** (para permitir que se añada a grupos)

---

### 7️⃣ Configurar Privacidad (Opcional)

Si quieres que el bot solo responda cuando lo mencionan en grupos:

Escribe en BotFather:
```
/setprivacy
```

Selecciona: **@atrm_sindicato_bot**

Elige: **Enable** (el bot solo lee mensajes directos o cuando lo mencionan)

---

## ✅ Resultado Final

Una vez configurado, cuando alguien busque `@atrm_sindicato_bot` verá:

```
🤖 ATRM Sindicato Bot
@atrm_sindicato_bot

Asistente de ATRM - Información laboral del convenio de limpieza

🔹 Asistente oficial de ATRM - Tu Sindicato
Información sobre convenio colectivo, salarios, vacaciones, 
trámites y derechos laborales del sector de limpieza en la 
Región de Murcia.

[START]
```

Y al escribir `/` verá todos los comandos disponibles:
- /start
- /ayuda
- /convenio
- /contacto
- /web

---

## 🚀 Paso Final: Desplegar el Bot 24/7

El bot ahora solo funciona cuando tu PC está encendido y ejecutas:
```powershell
npm run bot
```

Para que funcione siempre, necesitas desplegarlo en un servidor. 

**Opciones de despliegue:**
1. **Railway.app** (Recomendado - Gratis con límites)
2. **Render.com** (Gratis con límites)
3. **VPS propio** (DigitalOcean, Hetzner, etc.)

¿Quieres que configure el despliegue en Railway o Render?
