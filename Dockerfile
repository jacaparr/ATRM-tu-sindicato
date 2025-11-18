# Usar Node.js LTS
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar código del bot
COPY bot/ ./bot/
COPY api/ ./api/
COPY data/ ./data/

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto (Railway lo asigna automáticamente)
EXPOSE 3000

# Comando para ejecutar el bot
CMD ["node", "bot/telegram-bot.js"]
