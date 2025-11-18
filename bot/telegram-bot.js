#!/usr/bin/env node
/**
 * Bot de Telegram para ATRM Sindicato
 * Responde consultas laborales usando la IA del sitio
 */

const TelegramBot = require('node-telegram-bot-api');

// Cargar token desde variable de entorno
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN no configurado');
  console.log('Crea un archivo .env con tu token:');
  console.log('TELEGRAM_BOT_TOKEN=8351654307:AAGvevlffmdOvVPU3aaeRn2jxPc3dOQMlR4');
  process.exit(1);
}

// Crear bot
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Bot de ATRM iniciado correctamente');

// Comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'compañero/a';
  
  bot.sendMessage(chatId, 
    `👋 ¡Hola ${firstName}! Soy el asistente de ATRM - Tu Sindicato.\n\n` +
    `Puedo ayudarte con:\n` +
    `🔹 Consultas sobre el convenio colectivo\n` +
    `🔹 Información sobre salarios y categorías\n` +
    `🔹 Permisos retribuidos y vacaciones\n` +
    `🔹 Trámites sindicales\n` +
    `🔹 Derechos laborales\n\n` +
    `Escribe tu pregunta y te responderé al instante.\n\n` +
    `📌 Comandos disponibles:\n` +
    `/ayuda - Ver esta ayuda\n` +
    `/convenio - Info del convenio\n` +
    `/contacto - Contactar con el sindicato\n` +
    `/web - Visitar la web oficial`
  );
});

// Comando /ayuda
bot.onText(/\/ayuda/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
    `📖 *Ayuda del Bot ATRM*\n\n` +
    `Escribe cualquier pregunta en lenguaje natural, por ejemplo:\n` +
    `• "¿Cuántos días de vacaciones tengo?"\n` +
    `• "¿Cuál es el salario de conductor?"\n` +
    `• "¿Puedo pedir permiso por mudanza?"\n` +
    `• "¿Cómo tramito una baja médica?"\n\n` +
    `También puedes usar estos comandos:\n` +
    `/start - Iniciar conversación\n` +
    `/convenio - Ver info del convenio\n` +
    `/contacto - Datos de contacto\n` +
    `/web - Ir a la web`,
    { parse_mode: 'Markdown' }
  );
});

// Comando /convenio
bot.onText(/\/convenio/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
    `📄 *Convenio Colectivo de Limpieza Pública Viaria*\n\n` +
    `📅 Vigencia: 2024-2027\n` +
    `🏢 Ámbito: Región de Murcia\n` +
    `⏰ Jornada: 37,5h semanales / 1.680h anuales\n\n` +
    `📊 Incrementos salariales:\n` +
    `• 2024: 400€ lineales\n` +
    `• 2025-2027: IPC real nacional\n\n` +
    `🌐 Consulta el convenio completo en:\n` +
    `https://atrm-tu-sindicato.vercel.app`,
    { parse_mode: 'Markdown' }
  );
});

// Comando /contacto
bot.onText(/\/contacto/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
    `📞 *Contacto ATRM*\n\n` +
    `☎️ Teléfonos:\n` +
    `• Principal: 968 30 00 37\n` +
    `• Móvil: 658 876 771\n\n` +
    `📧 Email: info@atrm-sindicato.es\n\n` +
    `📍 Dirección:\n` +
    `C/ Carril La Torre, 27 Bajo\n` +
    `30006 Puente Tocinos (MURCIA)\n\n` +
    `🕒 Horario:\n` +
    `Lunes a Viernes: 09:00 - 14:00\n` +
    `Lunes tarde: 16:00 - 20:00`,
    { parse_mode: 'Markdown' }
  );
});

// Comando /web
bot.onText(/\/web/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
    `🌐 *Web Oficial de ATRM*\n\n` +
    `Visita nuestra web para:\n` +
    `✅ Consultar el convenio completo\n` +
    `✅ Ver tablas salariales actualizadas\n` +
    `✅ Descargar calendarios y documentos\n` +
    `✅ Chat con IA para consultas 24/7\n` +
    `✅ Guías de trámites paso a paso\n\n` +
    `👉 https://atrm-tu-sindicato.vercel.app`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '🌐 Abrir Web', url: 'https://atrm-tu-sindicato.vercel.app' }
        ]]
      }
    }
  );
});

// Responder preguntas generales (integración con IA)
bot.on('message', async (msg) => {
  // Ignorar comandos (ya manejados arriba)
  if (msg.text && msg.text.startsWith('/')) return;
  
  const chatId = msg.chat.id;
  const pregunta = msg.text;
  
  // Mostrar "escribiendo..."
  bot.sendChatAction(chatId, 'typing');
  
  try {
    // Aquí integrarías con tu API de IA
    // Por ahora, respuesta básica
    const respuesta = await obtenerRespuestaIA(pregunta);
    
    bot.sendMessage(chatId, respuesta, {
      reply_markup: {
        inline_keyboard: [[
          { text: '💬 Chat Web', url: 'https://atrm-tu-sindicato.vercel.app' },
          { text: '📞 Contacto', callback_data: 'contacto' }
        ]]
      }
    });
    
  } catch (error) {
    console.error('Error al procesar pregunta:', error);
    bot.sendMessage(chatId,
      '❌ Hubo un error al procesar tu pregunta. ' +
      'Puedes contactarnos directamente en:\n' +
      '📞 968 30 00 37\n' +
      '📧 info@atrm-sindicato.es'
    );
  }
});

// Función para obtener respuesta de la IA (placeholder)
async function obtenerRespuestaIA(pregunta) {
  // TODO: Integrar con api/chat.js o llamar directamente a OpenRouter/DeepSeek
  // Por ahora, respuesta genérica
  return `📝 Recibí tu pregunta: "${pregunta}"\n\n` +
         `🔄 Estoy en proceso de integración con la IA del sitio web.\n\n` +
         `💡 Mientras tanto, puedes:\n` +
         `• Usar el chat en la web: https://atrm-tu-sindicato.vercel.app\n` +
         `• Llamar al 968 30 00 37\n` +
         `• Escribir a info@atrm-sindicato.es`;
}

// Manejo de errores
bot.on('polling_error', (error) => {
  console.error('Error de polling:', error);
});

console.log('✅ Bot escuchando mensajes...');
