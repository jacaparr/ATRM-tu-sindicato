# Guía de Configuración del Bot de Telegram ATRM

## 📱 Configurar el Bot en BotFather

### 1. Descripción del Bot

En Telegram, habla con **@BotFather** y ejecuta:

```
/setdescription
@atrm_sindicato_bot
```

Luego copia y pega:

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

### 2. Texto "Acerca de" (About)

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

### 3. Lista de Comandos

```
/setcommands
@atrm_sindicato_bot
```

Luego copia esta lista:

```
start - Iniciar conversación con el bot
ayuda - Ver comandos y ejemplos de uso
convenio - Información del convenio colectivo
contacto - Teléfonos y email del sindicato
web - Visitar la web oficial de ATRM
```

### 4. Foto de Perfil

```
/setuserpic
@atrm_sindicato_bot
```

Sube el logo de ATRM (imagen cuadrada, mínimo 200x200px, recomendado 512x512px)

### 5. Nombre para Mostrar (opcional)

```
/setname
@atrm_sindicato_bot
```

Luego:

```
ATRM Sindicato
```

## 🚀 Ejecutar el Bot

### Opción 1: Local (desarrollo)

```bash
# En la raíz del proyecto
npm run bot
```

El bot se ejecutará y mostrará:
```
🤖 Bot de ATRM iniciado correctamente
✅ Bot escuchando mensajes...
```

### Opción 2: Con auto-restart (desarrollo)

```bash
npm run bot:dev
```

Usa `nodemon` para reiniciar automáticamente cuando cambies el código.

### Opción 3: Producción (servidor con PM2)

```bash
# Instalar PM2
npm install -g pm2

# Iniciar bot
pm2 start bot/telegram-bot.js --name atrm-bot

# Auto-inicio al reiniciar servidor
pm2 startup
pm2 save

# Ver logs
pm2 logs atrm-bot

# Ver estado
pm2 status

# Reiniciar
pm2 restart atrm-bot

# Detener
pm2 stop atrm-bot
```

## 🔐 Variables de Entorno

Asegúrate de tener el archivo `.env` en la raíz:

```env
TELEGRAM_BOT_TOKEN=8351654307:AAGvevlffmdOvVPU3aaeRn2jxPc3dOQMlR4
TELEGRAM_CHANNEL_ID=@atrm_sindicato
SITE_URL=https://atrm-tu-sindicato.vercel.app
```

## 📢 Crear el Canal

1. En Telegram → Menú → **Nuevo canal**
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
6. **Foto**: Subir logo de ATRM
7. **Enlace**: `https://t.me/atrm_sindicato`

### Vincular Bot al Canal (opcional)

Para que el bot publique automáticamente:

1. Añade el bot como administrador del canal
2. Dale permisos de "Publicar mensajes"

## ✅ Probar el Bot

1. Abre Telegram
2. Busca `@atrm_sindicato_bot`
3. Pulsa **Start**
4. Prueba comandos:
   - `/start`
   - `/convenio`
   - `/contacto`
   - `/web`
5. Haz preguntas: "¿Cuántos días de vacaciones tengo?"

## 🌐 Desplegar en Servidor

### Requisitos del servidor

- Node.js 16 o superior
- NPM
- Puerto abierto (o usar proxy reverso)
- Conexión estable a internet

### Pasos

1. **Subir código**:
```bash
git clone https://github.com/jacaparr/ATRM-tu-sindicato.git
cd ATRM-tu-sindicato
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Crear `.env`** con el token

4. **Iniciar con PM2**:
```bash
pm2 start bot/telegram-bot.js --name atrm-bot
pm2 startup
pm2 save
```

5. **Verificar**:
```bash
pm2 logs atrm-bot
```

## 🔍 Solución de Problemas

### El bot no responde

1. Verifica que está corriendo: `pm2 status`
2. Revisa logs: `pm2 logs atrm-bot`
3. Comprueba el token en `.env`
4. Reinicia: `pm2 restart atrm-bot`

### Error de polling

- Asegúrate de que solo hay una instancia corriendo
- Revisa que el token es correcto
- Verifica conexión a internet

### El bot responde tarde

- Revisa la conexión del servidor
- Considera usar un VPS con mejor conexión
- Verifica que no hay procesos consumiendo recursos

## 📚 Recursos

- [Documentación oficial de Telegram Bot API](https://core.telegram.org/bots/api)
- [node-telegram-bot-api docs](https://github.com/yagop/node-telegram-bot-api)
- [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
