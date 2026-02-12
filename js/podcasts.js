// Sistema de podcasts con NotebookLM
class SistemaPodcasts {
  constructor() {
    // Base de datos de podcasts generados con NotebookLM
    this.podcasts = [
      {
        id: 1,
        titulo: 'Cómo solicitar la vida laboral',
        descripcion: 'Conversación sobre el proceso paso a paso para solicitar tu vida laboral a través de la Seguridad Social.',
        categoria: 'tramites',
        duracion: '5:30',
        thumbnail: 'https://via.placeholder.com/400x225/667eea/ffffff?text=Vida+Laboral',
        audioUrl: 'assets/audio/podcast1.mp3', // ⚠️ Debes añadir este archivo
        tags: ['vida laboral', 'seguridad social', 'trámites', 'documentación'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 2,
        titulo: 'Derechos laborales básicos',
        descripcion: 'Diálogo sobre tus derechos fundamentales como trabajador: salario, vacaciones, permisos y más.',
        categoria: 'derechos',
        duracion: '12:45',
        thumbnail: 'https://via.placeholder.com/400x225/764ba2/ffffff?text=Derechos+Laborales',
        audioUrl: 'assets/audio/podcast2.mp3',
        tags: ['derechos', 'trabajador', 'convenio', 'laboral'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 3,
        titulo: 'Entender tu nómina',
        descripcion: 'Conversación clara sobre cómo leer tu nómina: conceptos, deducciones, IRPF, cotizaciones y neto a percibir.',
        categoria: 'salarios',
        duracion: '8:15',
        thumbnail: 'https://via.placeholder.com/400x225/f093fb/ffffff?text=Nómina',
        audioUrl: 'assets/audio/podcast3.mp3',
        tags: ['nómina', 'salario', 'irpf', 'deducciones', 'cotizaciones'],
        generadoCon: 'NotebookLM'
      },

      {
        id: 6,
        titulo: 'Convenio de Limpieza de Interiores',
        descripcion: 'Todo lo que necesitas saber sobre el convenio de limpieza de interiores explicado de forma clara.',
        categoria: 'convenios',
        duracion: '10:45',
        thumbnail: 'https://via.placeholder.com/400x225/ffa502/ffffff?text=Convenio+Interiores',
        audioUrl: 'assets/audio/podcast6.mp3',
        tags: ['convenio', 'interiores', 'limpieza', 'condiciones'],
        generadoCon: 'NotebookLM'
      },

      {
        id: 10,
        titulo: 'Permisos retribuidos',
        descripcion: 'Diálogo sobre todos los permisos retribuidos a los que tienes derecho según el convenio.',
        categoria: 'derechos',
        duracion: '11:20',
        thumbnail: 'https://via.placeholder.com/400x225/e74c3c/ffffff?text=Permisos',
        audioUrl: 'assets/audio/podcast10.mp3',
        tags: ['permisos', 'retribuidos', 'convenio', 'ausencias'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 11,
        titulo: 'Convenio de Limpieza Pública Viaria',
        descripcion: 'Resumen completo del Convenio de Limpieza Viaria de la Región de Murcia (2024-2027).',
        categoria: 'convenios',
        duracion: '12:00',
        thumbnail: 'https://via.placeholder.com/400x225/2ecc71/ffffff?text=Convenio+Viaria',
        audioUrl: 'assets/audio/podcast11.mp3',
        tags: ['convenio', 'viaria', 'limpieza', 'murcia'],
        generadoCon: 'NotebookLM'
      }
    ];
    
    this.categoriaActual = 'todas';
    this.cargarPodcasts();
  }

  cargarPodcasts() {
    this.mostrarPodcasts(this.podcasts);
  }

  mostrarPodcasts(podcasts) {
    const grid = document.getElementById('podcastsGrid');
    const sinResultados = document.getElementById('sinResultados');
    
    if (podcasts.length === 0) {
      grid.style.display = 'none';
      sinResultados.style.display = 'block';
      return;
    }
    
    grid.style.display = 'grid';
    sinResultados.style.display = 'none';
    
    grid.innerHTML = podcasts.map(podcast => `
      <div class="card" onclick="abrirPodcast(${podcast.id})" style="cursor:pointer;display:flex;flex-direction:column;justify-content:space-between">
        <div>
          <h3 style="margin-top:0">${this.obtenerIconoCategoria(podcast.categoria)} ${podcast.titulo}</h3>
          <p style="color:#555;font-size:0.95em">${podcast.descripcion}</p>
        </div>
        
        <div class="podcast-meta">
          <div class="podcast-duration">⏱️ ${podcast.duracion}</div>
          <div class="podcast-play-btn">▶</div>
        </div>
      </div>
    `).join('');
  }

  filtrarPorCategoria(categoria) {
    this.categoriaActual = categoria;
    const podcastsFiltrados = categoria === 'todas' 
      ? this.podcasts 
      : this.podcasts.filter(p => p.categoria === categoria);
    
    this.mostrarPodcasts(podcastsFiltrados);
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const clickedBtn = document.querySelector(`.filter-btn[onclick*="'${categoria}'"]`);
    if (clickedBtn) clickedBtn.classList.add('active');
  }

  buscar(termino) {
    termino = termino.toLowerCase().trim();
    
    if (termino === '') {
      this.cargarPodcasts();
      return;
    }
    
    const resultados = this.podcasts.filter(podcast => {
      return podcast.titulo.toLowerCase().includes(termino) ||
             podcast.descripcion.toLowerCase().includes(termino) ||
             podcast.tags.some(tag => tag.toLowerCase().includes(termino));
    });
    
    this.mostrarPodcasts(resultados);
  }

  obtenerPodcast(id) {
    return this.podcasts.find(p => p.id === id);
  }

  obtenerIconoCategoria(categoria) {
    const iconos = {
      'tramites': '🏛️',
      'derechos': '⚖️',
      'convenios': '📋',
      'salarios': '💰'
    };
    return iconos[categoria] || '🎙️';
  }

  obtenerNombreCategoria(categoria) {
    const nombres = {
      'tramites': 'Trámites',
      'derechos': 'Derechos',
      'convenios': 'Convenios',
      'salarios': 'Salarios'
    };
    return nombres[categoria] || categoria;
  }
}

// Instancia global
const sistemaPodcasts = new SistemaPodcasts();

function filtrarPorCategoria(categoria) {
  sistemaPodcasts.filtrarPorCategoria(categoria);
}

function buscarPodcasts() {
  const termino = document.getElementById('buscarPodcast').value;
  sistemaPodcasts.buscar(termino);
}

function abrirPodcast(id) {
  const podcast = sistemaPodcasts.obtenerPodcast(id);
  if (!podcast) return;
  
  document.getElementById('podcastPlayer').innerHTML = `
    <audio controls style="width:100%;margin:20px 0">
      <source src="${podcast.audioUrl}" type="audio/mpeg">
      Tu navegador no soporta el elemento de audio.
    </audio>
  `;
  
  document.getElementById('podcastTitulo').textContent = podcast.titulo;
  document.getElementById('podcastDescripcion').textContent = podcast.descripcion;
  document.getElementById('podcastTags').innerHTML = podcast.tags.map(tag => 
    `<span class="tag">#${tag}</span>`
  ).join(' ');
  
  document.getElementById('modalPodcast').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarModalPodcast(event) {
  // Si se hace clic en el fondo o en el botón cerrar
  if (!event || event.target.id === 'modalPodcast' || event.target.classList.contains('btn-cerrar-modal')) {
    document.getElementById('modalPodcast').style.display = 'none';
    const player = document.getElementById('podcastPlayer');
    if (player) {
      const audio = player.querySelector('audio');
      if (audio) audio.pause();
      player.innerHTML = '';
    }
    document.body.style.overflow = 'auto';
  }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModalPodcast();
  }
});
