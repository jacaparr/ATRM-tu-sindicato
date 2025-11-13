// Sistema de notificaciones de novedades
class SistemaNotificaciones {
  constructor() {
    this.storageKey = 'atrm_notificaciones_leidas';
    this.notificaciones = [
      {
        id: 'nov_2025_01',
        fecha: '2025-11-13',
        tipo: 'importante',
        titulo: '🆕 Nuevas funcionalidades disponibles',
        contenido: 'Ya puedes generar documentos automáticamente, ver estadísticas y acceder a vídeos explicativos.',
        enlace: null
      },
      {
        id: 'convenio_interiores_2025',
        fecha: '2025-11-10',
        tipo: 'convenio',
        titulo: '📋 Convenio de Interiores actualizado',
        contenido: 'Consulta el nuevo convenio colectivo de limpieza de interiores con la IA especializada.',
        enlace: 'interiores.html'
      },
      {
        id: 'festivos_2026',
        fecha: '2025-11-05',
        tipo: 'festivos',
        titulo: '📅 Calendario de festivos 2026 disponible',
        contenido: 'Ya puedes consultar los festivos y puentes para el próximo año.',
        enlace: 'festivos.html'
      }
    ];
  }

  obtenerNotificacionesNoLeidas() {
    const leidas = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return this.notificaciones.filter(n => !leidas.includes(n.id));
  }

  marcarComoLeida(id) {
    const leidas = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    if (!leidas.includes(id)) {
      leidas.push(id);
      localStorage.setItem(this.storageKey, JSON.stringify(leidas));
    }
  }

  marcarTodasComoLeidas() {
    const ids = this.notificaciones.map(n => n.id);
    localStorage.setItem(this.storageKey, JSON.stringify(ids));
  }

  mostrarNotificaciones() {
    const noLeidas = this.obtenerNotificacionesNoLeidas();
    
    if (noLeidas.length === 0) return;

    // Crear modal de notificaciones
    const modal = document.createElement('div');
    modal.className = 'modal-notificaciones';
    modal.innerHTML = `
      <div class="modal-contenido-notificaciones">
        <div class="modal-header-notif">
          <h3>🔔 Novedades (${noLeidas.length})</h3>
          <button class="btn-cerrar-notif" onclick="cerrarNotificaciones()">✕</button>
        </div>
        <div class="notificaciones-lista">
          ${noLeidas.map(notif => `
            <div class="notificacion-item ${notif.tipo}" data-id="${notif.id}">
              <div class="notif-header">
                <h4>${notif.titulo}</h4>
                <span class="notif-fecha">${this.formatearFecha(notif.fecha)}</span>
              </div>
              <p>${notif.contenido}</p>
              ${notif.enlace ? `<a href="${notif.enlace}" class="btn-notif-enlace">Ver más →</a>` : ''}
              <button class="btn-marcar-leida" onclick="marcarLeida('${notif.id}')">✓ Marcar como leída</button>
            </div>
          `).join('')}
        </div>
        <div class="modal-footer-notif">
          <button class="btn-marcar-todas" onclick="marcarTodasLeidas()">✓ Marcar todas como leídas</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Mostrar con animación
    setTimeout(() => modal.classList.add('visible'), 10);
  }

  formatearFecha(fecha) {
    const date = new Date(fecha);
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', opciones);
  }
}

// Funciones globales para los eventos
function cerrarNotificaciones() {
  const modal = document.querySelector('.modal-notificaciones');
  if (modal) {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 300);
  }
}

function marcarLeida(id) {
  window.sistemaNotif.marcarComoLeida(id);
  const item = document.querySelector(`.notificacion-item[data-id="${id}"]`);
  if (item) {
    item.style.opacity = '0.5';
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
      item.remove();
      const noLeidas = window.sistemaNotif.obtenerNotificacionesNoLeidas();
      if (noLeidas.length === 0) {
        cerrarNotificaciones();
      } else {
        document.querySelector('.modal-header-notif h3').textContent = `🔔 Novedades (${noLeidas.length})`;
      }
    }, 300);
  }
}

function marcarTodasLeidas() {
  window.sistemaNotif.marcarTodasComoLeidas();
  cerrarNotificaciones();
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  window.sistemaNotif = new SistemaNotificaciones();
  
  // Mostrar notificaciones automáticamente si hay nuevas (después de 2 segundos)
  setTimeout(() => {
    const noLeidas = window.sistemaNotif.obtenerNotificacionesNoLeidas();
    if (noLeidas.length > 0) {
      window.sistemaNotif.mostrarNotificaciones();
    }
  }, 2000);

  // Añadir botón de notificaciones en el header (si no existe)
  const header = document.querySelector('header') || document.querySelector('nav');
  if (header && !document.querySelector('.btn-notificaciones')) {
    const noLeidas = window.sistemaNotif.obtenerNotificacionesNoLeidas();
    const btnNotif = document.createElement('button');
    btnNotif.className = 'btn-notificaciones';
    btnNotif.innerHTML = `🔔 ${noLeidas.length > 0 ? `<span class="badge-notif">${noLeidas.length}</span>` : ''}`;
    btnNotif.onclick = () => window.sistemaNotif.mostrarNotificaciones();
    btnNotif.title = 'Ver novedades';
    header.appendChild(btnNotif);
  }
});
