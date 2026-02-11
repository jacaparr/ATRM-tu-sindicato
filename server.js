
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const Parser = require('rss-parser');
const fs = require('fs');

// --- AUTO-UPDATE NOTICIAS ---
let cachedNews = [];
const parser = new Parser();

// Función para buscar noticias
async function fetchUnionNews() {
    console.log("🔄 Buscando noticias sindicales...");
    try {
        // Feed 1: Búsqueda Google News "Sindicato Murcia"
        const feed1 = await parser.parseURL('https://news.google.com/rss/search?q=Sindicato+Murcia+OR+Convenio+Limpieza&hl=es&gl=ES&ceid=ES:es');
        
        // Feed 2: Noticias Laborales Generales (RTVE por ejemplo o Google)
        // Usamos Google News para tener variedad
        const feed2 = await parser.parseURL('https://news.google.com/rss/search?q=Derechos+Laborales+España&hl=es&gl=ES&ceid=ES:es');

        const allItems = [...feed1.items, ...feed2.items];
        
        // Procesar y limpiar
        const processed = allItems.map((item, index) => ({
            id: `auto-${Date.now()}-${index}`,
            fecha: new Date(item.pubDate).toISOString().split('T')[0],
            titulo: item.title,
            resumen: item.contentSnippet || item.title,
            contenido: item.content || item.contentSnippet || "Haz clic para leer la noticia completa en la fuente original.",
            categoria: "actualidad",
            url: item.link
        }));

        // Eliminar duplicados por título y limitar
        const unique = [];
        const seen = new Set();
        for (const item of processed) {
            if (!seen.has(item.titulo)) {
                seen.add(item.titulo);
                unique.push(item);
            }
        }

        // Guardar en memoria (las 10 más recientes)
        cachedNews = unique.sort((a,b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 10);
        console.log(`✅ Noticias actualizadas: ${cachedNews.length} encontradas.`);

    } catch (error) {
        console.error("❌ Error actualizando noticias:", error.message);
    }
}

// Ejecutar al inicio y cada 1 hora
fetchUnionNews();
setInterval(fetchUnionNews, 1000 * 60 * 60 * 1); // 1h

// --- CONFIG ---
const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// --- MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve root files

// --- TELEGRAM BOT ---
if (TELEGRAM_TOKEN) {
    try {
        const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
        console.log('🤖 Bot de Telegram iniciado.');
        
        // Import bot logic (simplified re-implementation or require)
        // Since original bot code was standalone, we can just load it or re-instantiate commands here
        // For simplicity and to avoid conflicts, let's keep the basic commands inline or 
        // require the original file IF it exports a function. 
        // The original `bot/telegram-bot.js` initializes its own bot instance. 
        // We should probably modify that file to export the setup function, 
        // OR just copy the command logic here. 
        // Given constraints, I'll allow the separate process (not ideal on Railway free tier?)
        // Better: Let's run the bot IN THIS PROCESS.
        
        // Basic Commands (replicated from bot/telegram-bot.js to ensure they run)
        bot.onText(/\/start/, (msg) => {
            bot.sendMessage(msg.chat.id, `👋 ¡Hola ${msg.from.first_name}! Soy el asistente de ATRM.\nUsa /ayuda para ver qué puedo hacer.`);
        });
        
         bot.onText(/\/ayuda/, (msg) => {
             bot.sendMessage(msg.chat.id, "📖 Comandos:\n/convenio - Info Convenio\n/contacto - Contacto\n/web - Web oficial");
         });

         bot.onText(/\/convenio/, (msg) => {
             bot.sendMessage(msg.chat.id, "📄 Convenio 2024-2027: https://atrm-tu-sindicato.up.railway.app/");
         });
         
         bot.onText(/\/contacto/, (msg) => {
             bot.sendMessage(msg.chat.id, "📞 968 30 00 37\n📧 info@atrm-sindicato.es");
         });

    } catch (e) {
        console.error("Error iniciando bot:", e);
    }
}

// --- API: NOTICIAS (MIX MANUAL + AUTO) ---
app.get('/api/noticias', async (req, res) => {
    try {
        // Leer noticias manuales (fijas)
        let manualNews = [];
        try {
            const raw = fs.readFileSync(path.join(__dirname, 'data', 'noticias.json'), 'utf-8');
            manualNews = JSON.parse(raw).noticias || [];
        } catch (e) {
            console.error("Error leyendo noticias.json manuales:", e);
        }

        // Combinar: Manuales primero, luego automáticas
        const allNews = [...manualNews];
        if (cachedNews && cachedNews.length) {
            allNews.push(...cachedNews);
        }
        
        // Orden final por fecha
        allNews.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        res.json({ noticias: allNews });
    } catch (e) {
        res.status(500).json({ error: "Error obteniendo noticias" });
    }
});

// --- START ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor web + Bot corriendo en puerto ${PORT}`);
});
