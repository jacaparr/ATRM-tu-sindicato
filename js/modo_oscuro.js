// Sistema de Modo Oscuro para ATRM
class ModoOscuro {
  constructor() {
    this.tema = localStorage.getItem('tema') || 'claro';
    this.inicializar();
  }

  inicializar() {
    // Aplicar tema guardado
    if (this.tema === 'oscuro') {
      document.body.classList.add('tema-oscuro');
    }
    
    // Crear botón de cambio de tema si no existe
    this.crearBotonTema();
  }

  crearBotonTema() {
    // Verificar si ya existe
    if (document.getElementById('btn-tema')) return;
    
    const btn = document.createElement('button');
    btn.id = 'btn-tema';
    btn.innerHTML = this.tema === 'oscuro' ? '☀️' : '🌙';
    btn.title = this.tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    btn.style.cssText = `
      position: fixed;
      top: 80px;
      right: 28px;
      z-index: 9998;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    `;
    
    btn.onclick = () => this.cambiarTema();
    
    // Hover effect
    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.1)';
    };
    btn.onmouseleave = () => {
      btn.style.transform = 'scale(1)';
    };
    
    document.body.appendChild(btn);
  }

  cambiarTema() {
    if (this.tema === 'claro') {
      this.tema = 'oscuro';
      document.body.classList.add('tema-oscuro');
    } else {
      this.tema = 'claro';
      document.body.classList.remove('tema-oscuro');
    }
    
    localStorage.setItem('tema', this.tema);
    
    // Actualizar icono
    const btn = document.getElementById('btn-tema');
    if (btn) {
      btn.innerHTML = this.tema === 'oscuro' ? '☀️' : '🌙';
      btn.title = this.tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    }
  }

  aplicarEstilos() {
    // Añadir estilos CSS para el modo oscuro si no existen
    if (document.getElementById('estilos-modo-oscuro')) return;
    
    const style = document.createElement('style');
    style.id = 'estilos-modo-oscuro';
    style.textContent = `
      body.tema-oscuro {
        background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
        color: #e0e0e0;
      }
      
      body.tema-oscuro header {
        background: linear-gradient(90deg, #c54a28, #d16535);
      }
      
      body.tema-oscuro .card {
        background: #2a2a2a;
        border-color: #444;
        color: #e0e0e0;
      }
      
      body.tema-oscuro .hero {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: #e0e0e0;
      }
      
      body.tema-oscuro .btn.alt {
        background: #2a2a2a;
        color: var(--primary);
        border-color: var(--primary);
      }
      
      body.tema-oscuro .btn.alt:hover {
        background: var(--primary);
        color: #fff;
      }
      
      body.tema-oscuro input[type="text"],
      body.tema-oscuro textarea,
      body.tema-oscuro select {
        background: #333;
        color: #e0e0e0;
        border-color: #555;
      }
      
      body.tema-oscuro input[type="text"]:focus,
      body.tema-oscuro textarea:focus,
      body.tema-oscuro select:focus {
        border-color: var(--primary);
      }
      
      body.tema-oscuro table th {
        background: linear-gradient(90deg, #d16535, #c54a28);
        color: #fff;
      }
      
      body.tema-oscuro table td {
        border-bottom-color: #444;
      }
      
      body.tema-oscuro tr:hover {
        background: #333;
      }
      
      body.tema-oscuro .info-box {
        background: linear-gradient(90deg, #3a2a1a, #4a3a2a);
        border-left-color: var(--accent);
        color: #e0e0e0;
      }
      
      body.tema-oscuro .festivo-nacional {
        background: #3a2a1a;
      }
      
      body.tema-oscuro .festivo-local {
        background: #2a3a2a;
      }
      
      body.tema-oscuro #chat-messages {
        background: #1a1a1a;
      }
      
      body.tema-oscuro #chat-atm-window {
        background: #2a2a2a;
      }
      
      body.tema-oscuro #chat-input {
        background: #333;
        color: #e0e0e0;
      }
      
      body.tema-oscuro .modal-content {
        background: #2a2a2a;
        color: #e0e0e0;
      }
      
      body.tema-oscuro footer {
        background: #1a1a1a;
      }
    `;
    
    document.head.appendChild(style);
  }
}

// Inicializar modo oscuro cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  const modoOscuro = new ModoOscuro();
  modoOscuro.aplicarEstilos();
});
