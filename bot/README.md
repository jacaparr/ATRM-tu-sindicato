# Bot de Telegram para ATRM

Este directorio contiene el bot de Telegram oficial del sindicato ATRM.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install node-telegram-bot-api dotenv
```

### 2. Configurar token

Crea un archivo `.env` en la raíz del proyecto:

```env
TELEGRAM_BOT_TOKEN=8351654307:AAGvevlffmdOvVPU3aaeRn2jxPc3dOQMlR4
```

**⚠️ IMPORTANTE:** Nunca subas el archivo `.env` a GitHub. Ya está incluido en `.gitignore`.

### 3. Ejecutar el bot

```bash
node bot/telegram-bot.js
```

O con npm script (añadir a `package.json`):

```json
{
  "scripts": {
    "bot": "node bot/telegram-bot.js"
  }
}
```

Entonces ejecutar:

```bash
npm run bot
```

## 📱 Funcionalidades

El bot responde a:

- `/start` - Mensaje de bienvenida
- `/ayuda` - Lista de comandos y ejemplos
- `/convenio` - Información del convenio colectivo
- `/contacto` - Datos de contacto del sindicato
- `/web` - Enlace a la web oficial

También responde preguntas en lenguaje natural (próximamente integrado con la IA del sitio).

## 🔧 Despliegue en Producción

### Opción 1: VPS/Servidor (recomendado para bots que usan polling)

1. Subir el código al servidor
2. Instalar Node.js y dependencias
3. Usar PM2 para mantener el bot corriendo:

```bash
npm install -g pm2
pm2 start bot/telegram-bot.js --name atrm-bot
pm2 startup
pm2 save
```

### Opción 2: Vercel/Netlify (webhook)

Convertir el bot para usar webhooks en lugar de polling. Crear función serverless:

```javascript
// api/telegram-webhook.js
export default async function handler(req, res) {
  // Manejar updates de Telegram
}
```

## 🔗 Enlaces

- Bot: https://t.me/atrm_sindicato_bot
- Canal: https://t.me/atrm_sindicato
- Web: https://atrm-tu-sindicato.vercel.app
- Documentación API: https://core.telegram.org/bots/api
