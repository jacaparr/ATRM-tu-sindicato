// Widget de Telegram para consultas y alertas
class TelegramWidget {
  constructor() {
    // Bot y canal oficiales de ATRM
    this.botUsername = 'atrm_sindicato_bot';
    this.channelUrl = 'https://t.me/atrm_sindicato';
    this.initWidget();
  }

  initWidget() {
    // Crear botón flotante de Telegram
    const telegramBtn = document.createElement('div');
    telegramBtn.className = 'telegram-float-btn';
    telegramBtn.innerHTML = `
      <button class="btn-telegram-main" onclick="toggleTelegramMenu()">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.806 8.531c-.135.631-.486.782-.984.486l-2.72-2.004-1.313 1.262c-.145.145-.267.267-.547.267l.195-2.765 5.043-4.555c.219-.195-.048-.304-.341-.109l-6.233 3.925-2.687-.844c-.584-.182-.595-.584.121-.864l10.513-4.053c.486-.182.912.109.754.864z"/>
        </svg>
        <span>Telegram</span>
      </button>
      <div class="telegram-menu" id="telegramMenu" style="display: none;">
        <a href="${this.channelUrl}" target="_blank" class="telegram-option">
          📢 Unirme al canal
        </a>
        <a href="https://t.me/${this.botUsername}" target="_blank" class="telegram-option">
          🤖 Chatear con el bot
        </a>
        <button class="telegram-option" onclick="activarAlertas()">
          🔔 Activar alertas
        </button>
        <button class="telegram-option" onclick="enviarConsulta()">
          💬 Enviar consulta
        </button>
      </div>
    `;
    
    document.body.appendChild(telegramBtn);
  }

  enviarMensajeBot(mensaje) {
    // Abrir chat con el bot con mensaje predefinido
    const url = `https://t.me/${this.botUsername}?start=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  suscribirAlertas() {
    // Guardar preferencia de alertas
    localStorage.setItem('telegram_alertas', 'true');
    
    // Mostrar confirmación
    this.mostrarNotificacion('✅ Alertas activadas', 'Recibirás notificaciones importantes en Telegram.');
    
    // Redirigir al bot para completar suscripción
    window.open(`https://t.me/${this.botUsername}?start=subscribe`, '_blank');
  }

  mostrarNotificacion(titulo, mensaje) {
    const notif = document.createElement('div');
    notif.className = 'telegram-notificacion';
    notif.innerHTML = `
      <h4>${titulo}</h4>
      <p>${mensaje}</p>
    `;
    document.body.appendChild(notif);
    
    setTimeout(() => notif.classList.add('visible'), 10);
    setTimeout(() => {
      notif.classList.remove('visible');
      setTimeout(() => notif.remove(), 300);
    }, 4000);
  }
}

// Funciones globales
function toggleTelegramMenu() {
  const menu = document.getElementById('telegramMenu');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

function activarAlertas() {
  window.telegramWidget.suscribirAlertas();
  toggleTelegramMenu();
}

function enviarConsulta() {
  const consulta = prompt('¿Qué consulta quieres hacer?');
  if (consulta) {
    window.telegramWidget.enviarMensajeBot(consulta);
  }
  toggleTelegramMenu();
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('telegramMenu');
  const btn = document.querySelector('.btn-telegram-main');
  
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  window.telegramWidget = new TelegramWidget();
});
