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
        audioUrl: 'https://example.com/podcast1.mp3', // URL del audio generado por NotebookLM
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
        audioUrl: 'https://example.com/podcast2.mp3',
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
        audioUrl: 'https://example.com/podcast3.mp3',
        tags: ['nómina', 'salario', 'irpf', 'deducciones', 'cotizaciones'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 4,
        titulo: 'Solicitud de vacaciones',
        descripcion: 'Diálogo sobre cómo y cuándo solicitar tus vacaciones según el convenio colectivo.',
        categoria: 'tramites',
        duracion: '6:20',
        thumbnail: 'https://via.placeholder.com/400x225/48dbfb/ffffff?text=Vacaciones',
        audioUrl: 'https://example.com/podcast4.mp3',
        tags: ['vacaciones', 'permisos', 'convenio', 'solicitud'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 5,
        titulo: 'Convenio Colectivo de Transportes',
        descripcion: 'Conversación detallada sobre las principales cláusulas del convenio colectivo del sector transportes.',
        categoria: 'convenios',
        duracion: '15:30',
        thumbnail: 'https://via.placeholder.com/400x225/2ed573/ffffff?text=Convenio+Transportes',
        audioUrl: 'https://example.com/podcast5.mp3',
        tags: ['convenio', 'transportes', 'atrm', 'condiciones'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 6,
        titulo: 'Convenio de Limpieza de Interiores',
        descripcion: 'Todo lo que necesitas saber sobre el convenio de limpieza de interiores explicado de forma clara.',
        categoria: 'convenios',
        duracion: '10:45',
        thumbnail: 'https://via.placeholder.com/400x225/ffa502/ffffff?text=Convenio+Interiores',
        audioUrl: 'https://example.com/podcast6.mp3',
        tags: ['convenio', 'interiores', 'limpieza', 'condiciones'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 7,
        titulo: 'Reclamar horas extras',
        descripcion: 'Diálogo sobre cómo reclamar las horas extras no pagadas de forma correcta.',
        categoria: 'derechos',
        duracion: '7:50',
        thumbnail: 'https://via.placeholder.com/400x225/ff4757/ffffff?text=Horas+Extras',
        audioUrl: 'https://example.com/podcast7.mp3',
        tags: ['horas extras', 'reclamación', 'derechos', 'salario'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 8,
        titulo: 'Cómo afiliarse al sindicato',
        descripcion: 'Conversación sobre el proceso de afiliación a ATRM y beneficios de ser miembro del sindicato.',
        categoria: 'tramites',
        duracion: '4:15',
        thumbnail: 'https://via.placeholder.com/400x225/5f27cd/ffffff?text=Afiliación',
        audioUrl: 'https://example.com/podcast8.mp3',
        tags: ['afiliación', 'sindicato', 'atrm', 'miembro'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 9,
        titulo: 'Calcular finiquito',
        descripcion: 'Explicación detallada sobre cómo calcular tu finiquito correctamente y qué conceptos debe incluir.',
        categoria: 'salarios',
        duracion: '9:30',
        thumbnail: 'https://via.placeholder.com/400x225/1abc9c/ffffff?text=Finiquito',
        audioUrl: 'https://example.com/podcast9.mp3',
        tags: ['finiquito', 'despido', 'cálculo', 'indemnización'],
        generadoCon: 'NotebookLM'
      },
      {
        id: 10,
        titulo: 'Permisos retribuidos',
        descripcion: 'Diálogo sobre todos los permisos retribuidos a los que tienes derecho según el convenio.',
        categoria: 'derechos',
        duracion: '11:20',
        thumbnail: 'https://via.placeholder.com/400x225/e74c3c/ffffff?text=Permisos',
        audioUrl: 'https://example.com/podcast10.mp3',
        tags: ['permisos', 'retribuidos', 'convenio', 'ausencias'],
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
      <div class="podcast-card" onclick="abrirPodcast(${podcast.id})">
        <div class="podcast-thumbnail">
          <img src="${podcast.thumbnail}" alt="${podcast.titulo}">
          <div class="podcast-duracion">🎙️ ${podcast.duracion}</div>
          <div class="podcast-play">▶</div>
        </div>
        <div class="podcast-info-card">
          <h3>${podcast.titulo}</h3>
          <p>${podcast.descripcion}</p>
          <div class="podcast-categoria">${this.obtenerIconoCategoria(podcast.categoria)} ${this.obtenerNombreCategoria(podcast.categoria)}</div>
          <div class="notebooklm-badge">🤖 ${podcast.generadoCon}</div>
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
    document.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
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
