// Sistema de vídeos explicativos
class SistemaVideos {
  constructor() {
    // Base de datos de vídeos (puedes añadir más o conectar con YouTube API)
    this.videos = [
      {
        id: 1,
        titulo: 'Cómo solicitar la vida laboral',
        descripcion: 'Tutorial paso a paso para solicitar tu vida laboral a través de la Seguridad Social.',
        categoria: 'tramites',
        duracion: '5:30',
        thumbnail: 'https://via.placeholder.com/400x225/667eea/ffffff?text=Vida+Laboral',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Reemplazar con URL real
        tags: ['vida laboral', 'seguridad social', 'trámites', 'documentación']
      },
      {
        id: 2,
        titulo: 'Derechos laborales básicos',
        descripcion: 'Conoce tus derechos fundamentales como trabajador: salario, vacaciones, permisos y más.',
        categoria: 'derechos',
        duracion: '12:45',
        thumbnail: 'https://via.placeholder.com/400x225/764ba2/ffffff?text=Derechos+Laborales',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['derechos', 'trabajador', 'convenio', 'laboral']
      },
      {
        id: 3,
        titulo: 'Entender tu nómina',
        descripcion: 'Aprende a leer tu nómina: conceptos, deducciones, IRPF, cotizaciones y neto a percibir.',
        categoria: 'salarios',
        duracion: '8:15',
        thumbnail: 'https://via.placeholder.com/400x225/f093fb/ffffff?text=Nómina',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['nómina', 'salario', 'irpf', 'deducciones', 'cotizaciones']
      },
      {
        id: 4,
        titulo: 'Solicitud de vacaciones',
        descripcion: 'Cómo y cuándo solicitar tus vacaciones según el convenio colectivo.',
        categoria: 'tramites',
        duracion: '6:20',
        thumbnail: 'https://via.placeholder.com/400x225/48dbfb/ffffff?text=Vacaciones',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['vacaciones', 'permisos', 'convenio', 'solicitud']
      },
      {
        id: 5,
        titulo: 'Convenio Colectivo de Transportes',
        descripcion: 'Resumen de las principales cláusulas del convenio colectivo del sector transportes.',
        categoria: 'convenios',
        duracion: '15:30',
        thumbnail: 'https://via.placeholder.com/400x225/2ed573/ffffff?text=Convenio+Transportes',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['convenio', 'transportes', 'atrm', 'condiciones']
      },
      {
        id: 6,
        titulo: 'Convenio de Interiores',
        descripcion: 'Todo lo que necesitas saber sobre el convenio de limpieza de interiores.',
        categoria: 'convenios',
        duracion: '10:45',
        thumbnail: 'https://via.placeholder.com/400x225/ffa502/ffffff?text=Convenio+Interiores',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['convenio', 'interiores', 'limpieza', 'condiciones']
      },
      {
        id: 7,
        titulo: 'Reclamar horas extras',
        descripcion: 'Aprende cómo reclamar las horas extras no pagadas de forma correcta.',
        categoria: 'derechos',
        duracion: '7:50',
        thumbnail: 'https://via.placeholder.com/400x225/ff4757/ffffff?text=Horas+Extras',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['horas extras', 'reclamación', 'derechos', 'salario']
      },
      {
        id: 8,
        titulo: 'Cómo afiliarse al sindicato',
        descripcion: 'Proceso de afiliación a ATRM y beneficios de ser miembro del sindicato.',
        categoria: 'tramites',
        duracion: '4:15',
        thumbnail: 'https://via.placeholder.com/400x225/5f27cd/ffffff?text=Afiliación',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['afiliación', 'sindicato', 'atrm', 'miembro']
      },
      {
        id: 9,
        titulo: 'Calcular finiquito',
        descripcion: 'Cómo calcular tu finiquito correctamente y qué conceptos debe incluir.',
        categoria: 'salarios',
        duracion: '9:30',
        thumbnail: 'https://via.placeholder.com/400x225/1abc9c/ffffff?text=Finiquito',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['finiquito', 'despido', 'cálculo', 'indemnización']
      },
      {
        id: 10,
        titulo: 'Permisos retribuidos',
        descripcion: 'Todos los permisos retribuidos a los que tienes derecho según el convenio.',
        categoria: 'derechos',
        duracion: '11:20',
        thumbnail: 'https://via.placeholder.com/400x225/e74c3c/ffffff?text=Permisos',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        tags: ['permisos', 'retribuidos', 'convenio', 'ausencias']
      }
    ];
    
    this.categoriaActual = 'todas';
    this.cargarVideos();
  }

  cargarVideos() {
    this.mostrarVideos(this.videos);
  }

  mostrarVideos(videos) {
    const grid = document.getElementById('videosGrid');
    const sinResultados = document.getElementById('sinResultados');
    
    if (videos.length === 0) {
      grid.style.display = 'none';
      sinResultados.style.display = 'block';
      return;
    }
    
    grid.style.display = 'grid';
    sinResultados.style.display = 'none';
    
    grid.innerHTML = videos.map(video => `
      <div class="video-card" onclick="abrirVideo(${video.id})">
        <div class="video-thumbnail">
          <img src="${video.thumbnail}" alt="${video.titulo}">
          <div class="video-duracion">${video.duracion}</div>
          <div class="video-play">▶</div>
        </div>
        <div class="video-info-card">
          <h3>${video.titulo}</h3>
          <p>${video.descripcion}</p>
          <div class="video-categoria">${this.obtenerIconoCategoria(video.categoria)} ${this.obtenerNombreCategoria(video.categoria)}</div>
        </div>
      </div>
    `).join('');
  }

  filtrarPorCategoria(categoria) {
    this.categoriaActual = categoria;
    const videosFiltrados = categoria === 'todas' 
      ? this.videos 
      : this.videos.filter(v => v.categoria === categoria);
    
    this.mostrarVideos(videosFiltrados);
    
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  }

  buscar(termino) {
    termino = termino.toLowerCase().trim();
    
    if (termino === '') {
      this.cargarVideos();
      return;
    }
    
    const resultados = this.videos.filter(video => {
      return video.titulo.toLowerCase().includes(termino) ||
             video.descripcion.toLowerCase().includes(termino) ||
             video.tags.some(tag => tag.toLowerCase().includes(termino));
    });
    
    this.mostrarVideos(resultados);
  }

  obtenerVideo(id) {
    return this.videos.find(v => v.id === id);
  }

  obtenerIconoCategoria(categoria) {
    const iconos = {
      'tramites': '🏛️',
      'derechos': '⚖️',
      'convenios': '📋',
      'salarios': '💰'
    };
    return iconos[categoria] || '📹';
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
const sistemaVideos = new SistemaVideos();

function filtrarPorCategoria(categoria) {
  sistemaVideos.filtrarPorCategoria(categoria);
}

function buscarVideos() {
  const termino = document.getElementById('buscarVideo').value;
  sistemaVideos.buscar(termino);
}

function abrirVideo(id) {
  const video = sistemaVideos.obtenerVideo(id);
  if (!video) return;
  
  document.getElementById('videoPlayer').innerHTML = `
    <iframe 
      width="100%" 
      height="500" 
      src="${video.videoUrl}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;
  
  document.getElementById('videoTitulo').textContent = video.titulo;
  document.getElementById('videoDescripcion').textContent = video.descripcion;
  document.getElementById('videoTags').innerHTML = video.tags.map(tag => 
    `<span class="tag">#${tag}</span>`
  ).join(' ');
  
  document.getElementById('modalVideo').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarModalVideo(event) {
  // Si se hace clic en el fondo o en el botón cerrar
  if (!event || event.target.id === 'modalVideo' || event.target.classList.contains('btn-cerrar-modal')) {
    document.getElementById('modalVideo').style.display = 'none';
    document.getElementById('videoPlayer').innerHTML = '';
    document.body.style.overflow = 'auto';
  }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModalVideo();
  }
});
