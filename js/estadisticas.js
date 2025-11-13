// Sistema de estadísticas y encuestas
class SistemaEstadisticas {
  constructor() {
    this.storageKey = 'atrm_estadisticas';
    this.encuestasKey = 'atrm_encuestas';
    this.initEstadisticas();
  }

  initEstadisticas() {
    const stats = this.obtenerEstadisticas();
    if (!stats.consultas) {
      stats.consultas = [];
      stats.temasPopulares = {};
      stats.satisfaccion = [];
      this.guardarEstadisticas(stats);
    }
  }

  obtenerEstadisticas() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  guardarEstadisticas(stats) {
    localStorage.setItem(this.storageKey, JSON.stringify(stats));
  }

  registrarConsulta(pregunta, respuesta, tema = 'general') {
    const stats = this.obtenerEstadisticas();
    
    stats.consultas.push({
      pregunta: pregunta,
      respuesta: respuesta.substring(0, 200), // Solo los primeros 200 caracteres
      tema: tema,
      fecha: new Date().toISOString(),
      timestamp: Date.now()
    });

    // Mantener solo las últimas 100 consultas
    if (stats.consultas.length > 100) {
      stats.consultas = stats.consultas.slice(-100);
    }

    // Actualizar temas populares
    stats.temasPopulares[tema] = (stats.temasPopulares[tema] || 0) + 1;

    this.guardarEstadisticas(stats);
  }

  registrarSatisfaccion(puntuacion, comentario = '') {
    const stats = this.obtenerEstadisticas();
    
    stats.satisfaccion.push({
      puntuacion: puntuacion,
      comentario: comentario,
      fecha: new Date().toISOString(),
      timestamp: Date.now()
    });

    // Mantener solo las últimas 50 encuestas
    if (stats.satisfaccion.length > 50) {
      stats.satisfaccion = stats.satisfaccion.slice(-50);
    }

    this.guardarEstadisticas(stats);
  }

  obtenerTemasPopulares() {
    const stats = this.obtenerEstadisticas();
    const temas = stats.temasPopulares || {};
    
    return Object.entries(temas)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tema, count]) => ({ tema, count }));
  }

  calcularSatisfaccionMedia() {
    const stats = this.obtenerEstadisticas();
    const satisfacciones = stats.satisfaccion || [];
    
    if (satisfacciones.length === 0) return 0;
    
    const suma = satisfacciones.reduce((acc, s) => acc + s.puntuacion, 0);
    return (suma / satisfacciones.length).toFixed(1);
  }

  mostrarDashboard() {
    const stats = this.obtenerEstadisticas();
    const temasPopulares = this.obtenerTemasPopulares();
    const satisfaccionMedia = this.calcularSatisfaccionMedia();
    const totalConsultas = stats.consultas?.length || 0;

    const modal = document.createElement('div');
    modal.className = 'modal-estadisticas';
    modal.innerHTML = `
      <div class="modal-contenido-stats">
        <div class="modal-header-stats">
          <h3>📊 Estadísticas y Encuestas</h3>
          <button class="btn-cerrar-stats" onclick="cerrarEstadisticas()">✕</button>
        </div>
        
        <div class="stats-contenido">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">💬</div>
              <div class="stat-value">${totalConsultas}</div>
              <div class="stat-label">Consultas totales</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-value">${satisfaccionMedia}/5</div>
              <div class="stat-label">Satisfacción media</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">🔥</div>
              <div class="stat-value">${temasPopulares[0]?.count || 0}</div>
              <div class="stat-label">Tema más consultado</div>
            </div>
          </div>

          <div class="temas-populares">
            <h4>📈 Temas más consultados</h4>
            <div class="temas-lista">
              ${temasPopulares.length > 0 ? temasPopulares.map(t => `
                <div class="tema-item">
                  <span class="tema-nombre">${this.formatearTema(t.tema)}</span>
                  <div class="tema-barra">
                    <div class="tema-progreso" style="width: ${(t.count / temasPopulares[0].count) * 100}%"></div>
                  </div>
                  <span class="tema-count">${t.count}</span>
                </div>
              `).join('') : '<p class="no-datos">Aún no hay datos suficientes</p>'}
            </div>
          </div>

          <div class="encuesta-satisfaccion">
            <h4>⭐ ¿Cómo valoras el servicio?</h4>
            <div class="estrellas-rating">
              ${[1, 2, 3, 4, 5].map(n => `
                <span class="estrella" onclick="valorarServicio(${n})" title="${n} estrellas">⭐</span>
              `).join('')}
            </div>
            <textarea id="comentarioEncuesta" placeholder="Déjanos tu comentario (opcional)" rows="3"></textarea>
            <button class="btn-enviar-encuesta" onclick="enviarEncuesta()">Enviar valoración</button>
          </div>

          <div class="consultas-recientes">
            <h4>🕐 Consultas recientes</h4>
            <div class="consultas-lista">
              ${stats.consultas && stats.consultas.length > 0 ? 
                stats.consultas.slice(-5).reverse().map(c => `
                  <div class="consulta-item">
                    <div class="consulta-pregunta">${this.truncar(c.pregunta, 60)}</div>
                    <div class="consulta-tema">${this.formatearTema(c.tema)}</div>
                    <div class="consulta-fecha">${this.formatearFecha(c.fecha)}</div>
                  </div>
                `).join('') : 
                '<p class="no-datos">Aún no hay consultas</p>'
              }
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
  }

  formatearTema(tema) {
    const temas = {
      'vacaciones': '🏖️ Vacaciones',
      'salario': '💰 Salario',
      'convenio': '📋 Convenio',
      'permisos': '📝 Permisos',
      'festivos': '📅 Festivos',
      'interiores': '🧹 Interiores',
      'general': '💬 General'
    };
    return temas[tema] || `📌 ${tema.charAt(0).toUpperCase() + tema.slice(1)}`;
  }

  formatearFecha(fecha) {
    const date = new Date(fecha);
    const hoy = new Date();
    const diff = Math.floor((hoy - date) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return 'Hoy';
    if (diff === 1) return 'Ayer';
    if (diff < 7) return `Hace ${diff} días`;
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }

  truncar(texto, max) {
    return texto.length > max ? texto.substring(0, max) + '...' : texto;
  }
}

// Funciones globales
function cerrarEstadisticas() {
  const modal = document.querySelector('.modal-estadisticas');
  if (modal) {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 300);
  }
}

function valorarServicio(puntuacion) {
  const estrellas = document.querySelectorAll('.estrella');
  estrellas.forEach((e, i) => {
    e.style.opacity = i < puntuacion ? '1' : '0.3';
  });
  window.puntuacionSeleccionada = puntuacion;
}

function enviarEncuesta() {
  const puntuacion = window.puntuacionSeleccionada;
  const comentario = document.getElementById('comentarioEncuesta')?.value || '';
  
  if (!puntuacion) {
    alert('Por favor, selecciona una puntuación');
    return;
  }
  
  window.sistemaStats.registrarSatisfaccion(puntuacion, comentario);
  
  // Mostrar agradecimiento
  const encuesta = document.querySelector('.encuesta-satisfaccion');
  if (encuesta) {
    encuesta.innerHTML = `
      <div class="encuesta-gracias">
        <h4>✅ ¡Gracias por tu valoración!</h4>
        <p>Tu opinión nos ayuda a mejorar el servicio.</p>
      </div>
    `;
  }
  
  // Actualizar dashboard después de 2 segundos
  setTimeout(() => {
    cerrarEstadisticas();
    window.sistemaStats.mostrarDashboard();
  }, 2000);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  window.sistemaStats = new SistemaEstadisticas();
  
  // Añadir botón de estadísticas en el footer o nav
  const footer = document.querySelector('footer') || document.querySelector('nav');
  if (footer && !document.querySelector('.btn-estadisticas')) {
    const btnStats = document.createElement('button');
    btnStats.className = 'btn-estadisticas';
    btnStats.innerHTML = '📊 Estadísticas';
    btnStats.onclick = () => window.sistemaStats.mostrarDashboard();
    btnStats.title = 'Ver estadísticas y encuestas';
    footer.appendChild(btnStats);
  }
});
