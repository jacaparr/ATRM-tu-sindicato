// Sistema de Perfil/Configuración Local del Trabajador
class PerfilUsuario {
  constructor() {
    this.datos = JSON.parse(localStorage.getItem('atrm_perfil')) || {
      convenio: 'none',
      categoria: '',
      anoIngreso: new Date().getFullYear(),
      notificaciones: false
    };
  }

  guardar() {
    localStorage.setItem('atrm_perfil', JSON.stringify(this.datos));
    // Disparar evento para que otras partes de la app se enteren
    window.dispatchEvent(new CustomEvent('atrm_perfil_actualizado', { detail: this.datos }));
  }

  abrirModal() {
    // Si ya existe lo abre, si no lo crea
    let modal = document.getElementById('modal-perfil');
    if (!modal) {
      modal = this.crearModal();
      document.body.appendChild(modal);
    }
    this.cargarDatosEnFormulario();
    modal.style.display = 'flex';
  }

  cerrarModal() {
    const modal = document.getElementById('modal-perfil');
    if (modal) modal.style.display = 'none';
  }

  crearModal() {
    const modal = document.createElement('div');
    modal.id = 'modal-perfil';
    modal.style.cssText = `
      display: none;
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.6); z-index: 10000;
      align-items: center; justify-content: center;
      transition: all 0.3s ease;
    `;

    const html = `
      <div class="card" style="width: 90%; max-width: 400px; padding: 24px; position: relative; max-height: 90vh; overflow-y: auto;">
        <button onclick="window.perfilApp.cerrarModal()" style="position: absolute; right: 16px; top: 16px; background: none; border: none; font-size: 20px; cursor: pointer;">✕</button>
        <h2 style="margin-top: 0; color: var(--primary);">👤 Mi Perfil AtrM</h2>
        <p style="font-size: 14px; color: #555;">Configura tus datos para personalizar las calculadoras y el comportamiento de la IA en tu móvil.</p>
        
        <div style="margin-bottom: 16px;">
          <label style="display:block; margin-bottom: 8px; font-weight: bold;">Mi Convenio</label>
          <select id="p-convenio" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
            <option value="none">-- Sin especificar --</option>
            <option value="viaria">Limpieza Pública Viaria</option>
            <option value="interiores">Limpieza de Edificios (Interiores)</option>
          </select>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display:block; margin-bottom: 8px; font-weight: bold;">Año de ingreso en la empresa</label>
          <input type="number" id="p-anio" value="2010" min="1970" max="2030" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display:flex; align-items: center; gap: 10px; cursor: pointer; background: #f5f5f5; padding: 12px; border-radius: 8px;">
            <input type="checkbox" id="p-notif" style="width: 20px; height: 20px;">
            <span>Recibir avisos y alertas importantes</span>
          </label>
        </div>

        <button onclick="window.perfilApp.guardarDesdeFormulario()" class="btn" style="width: 100%;">Guardar Mi Perfil</button>
      </div>
    `;
    modal.innerHTML = html;
    
    // Cierra si tocas fuera
    modal.addEventListener('click', (e) => {
      if(e.target === modal) this.cerrarModal();
    });

    return modal;
  }

  cargarDatosEnFormulario() {
    document.getElementById('p-convenio').value = this.datos.convenio || 'none';
    document.getElementById('p-anio').value = this.datos.anoIngreso || 2024;
    document.getElementById('p-notif').checked = this.datos.notificaciones || false;
  }

  guardarDesdeFormulario() {
    this.datos.convenio = document.getElementById('p-convenio').value;
    this.datos.anoIngreso = parseInt(document.getElementById('p-anio').value) || new Date().getFullYear();
    
    const quiereAvisos = document.getElementById('p-notif').checked;
    
    // Si activa notificaciones, solicitar permiso
    if (quiereAvisos && !this.datos.notificaciones) {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('ATRM Tu Sindicato', {
              body: '¡Notificaciones activadas! Te avisaremos de novedades importantes.',
              icon: '/manifest/icon-192x192.png' // Asegúrate de que existe o usa una genérica
            });
            this.datos.notificaciones = true;
          } else {
            this.datos.notificaciones = false;
            document.getElementById('p-notif').checked = false;
            alert('Has denegado el permiso de notificaciones.');
          }
          this.guardar();
        });
      } else {
        alert("Tu navegador no soporta notificaciones");
      }
    } else {
      this.datos.notificaciones = quiereAvisos;
      this.guardar();
    }
    
    this.cerrarModal();
    alert('✅ Perfil actualizado.');
  }

  crearBotonMenu() {
    // Inyectar en el nav si no existe
    const nav = document.querySelector('.menu');
    if (nav && !document.getElementById('btn-nav-perfil')) {
      const btn = document.createElement('a');
      btn.id = 'btn-nav-perfil';
      btn.href = '#';
      btn.innerHTML = '👤 Mi Perfil';
      btn.onclick = (e) => {
        e.preventDefault();
        this.abrirModal();
      };
      // Lo añadimos al final o antes de contacto
      nav.appendChild(btn);
    }
  }
}

// Inicializar globalmente
window.perfilApp = new PerfilUsuario();
document.addEventListener('DOMContentLoaded', () => {
    window.perfilApp.crearBotonMenu();
});
