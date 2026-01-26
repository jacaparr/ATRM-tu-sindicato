class GlobalSearch {
  constructor() {
    this.index = [
      // 1. Páginas Principales
      { title: 'Inicio / Portada', desc: 'Noticias y acceso rápido', url: 'index.html', cat: 'Secciones', icon: '🏠' },
      { title: 'Trámites', desc: 'Ayudas, citas y certificados', url: 'tramites.html', cat: 'Secciones', icon: '🏛️' },
      { title: 'Tablas Salariales', desc: 'Sueldos, base y antigüedad', url: 'salaries.html', cat: 'Secciones', icon: '💰' },
      { title: 'Podcasts', desc: 'Audios explicativos (IA)', url: 'podcasts.html', cat: 'Secciones', icon: '🎙️' },
      { title: 'Convenios', desc: 'Texto legal y documentos', url: 'index.html#convenio', cat: 'Secciones', icon: '📋' },
      
      // 2. Trámites Específicos (Links directos)
      { title: 'Solicitar Vida Laboral', desc: 'Trámite oficial Seguridad Social', url: 'tramites.html#vidaLaboral', cat: 'Trámites', icon: '📊' },
      { title: 'Buscador Ayudas', desc: 'Subvenciones y becas', url: 'tramites.html#searchAyudas', cat: 'Trámites', icon: '🔍' },
      { title: 'Cita Previa SEPE', desc: 'Desempleo y prestaciones', url: 'tramites.html', cat: 'Trámites', icon: '📅' },
      
      // 3. Tablas Salariales (Conceptos)
      { title: 'Salario Base 2026', desc: 'Tabla salarial actualizada', url: 'salaries.html', cat: 'Salarios', icon: '💶' },
      { title: 'Plus Tóxico', desc: 'Complemento salarial específico', url: 'salaries.html', cat: 'Salarios', icon: '🧪' },
      { title: 'Pagas Extras', desc: 'Junio, Navidad y Marzo', url: 'salaries.html', cat: 'Salarios', icon: '🎁' },
      
      // 4. Podcasts
      { title: 'Podcast: Vida Laboral', desc: 'Audio explicativo paso a paso', url: 'podcasts.html', cat: 'Audio', icon: '🎧' },
      { title: 'Podcast: Nómina', desc: 'Entender devengos y deducciones', url: 'podcasts.html', cat: 'Audio', icon: '🎧' },
      { title: 'Podcast: Derechos', desc: 'Estatuto vs Convenio', url: 'podcasts.html', cat: 'Audio', icon: '🎧' },
      
      // 5. Herramientas
      { title: 'Calendario Festivos', desc: 'Días libres y festivos 2026', url: 'festivos.html', cat: 'Herramientas', icon: '📅' },
      { title: 'Contacto Sindicato', desc: 'Teléfono y dirección ATRM', url: 'index.html#contacto', cat: 'Contacto', icon: '📞' }
    ];

    this.init();
  }

  init() {
    this.injectStyles();
    this.createSearchDOM();
    this.bindEvents();
  }

  injectStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/global-search.css';
    document.head.appendChild(link);
  }

  createSearchDOM() {
    // Buscar dónde inyectar (preferiblemente en el hero de index, o crear un modal flotante si no es Home)
    // Para simplificar, vamos a injectarlo dinámicamente en el top de <main> o <header>
    
    // Solo lo inyectamos si existe el container placeholder, o lo creamos si estamos en home
    const hero = document.querySelector('.hero');
    let container = document.querySelector('.global-search-container');
    
    if (!container && hero) {
      container = document.createElement('div');
      container.className = 'global-search-container';
      hero.insertBefore(container, hero.firstChild);
       // Ojo: insertarlo en el lugar correcto del Hero
       // Si el hero tiene un h2, ponerlo debajo
       const title = hero.querySelector('h2');
       if(title) title.after(container);
    }

    // Si no estamos en la home, podríamos agregar un botón lupa en el header que abra esto,
    // pero por ahora centrémonos en la Home.
    
    if (container) {
      container.innerHTML = `
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <input type="text" class="global-search-input" placeholder="¿Qué necesitas buscar? (Nómina, vacas...)">
        <div class="global-search-results"></div>
        <div class="search-overlay"></div>
      `;
    }
  }

  bindEvents() {
    const input = document.querySelector('.global-search-input');
    const resultsContainer = document.querySelector('.global-search-results');
    const overlay = document.querySelector('.search-overlay');

    if (!input) return;

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        resultsContainer.classList.remove('active');
        return;
      }
      
      const hits = this.search(query);
      this.renderResults(hits, resultsContainer);
      resultsContainer.classList.add('active');
      overlay?.classList.add('active');
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.global-search-container')) {
        resultsContainer.classList.remove('active');
        overlay?.classList.remove('active');
      }
    });
  }

  search(query) {
    return this.index.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.desc.toLowerCase().includes(query)
    ).slice(0, 5); // Max 5 resultados
  }

  renderResults(hits, container) {
    if (hits.length === 0) {
      container.innerHTML = `
        <div class="search-result-item" style="cursor:default">
          <div class="search-item-text">
            <p>😔 No encontramos nada...</p>
          </div>
        </div>`;
      return;
    }

    // Agrupar por categoría
    const categories = {};
    hits.forEach(hit => {
      if (!categories[hit.cat]) categories[hit.cat] = [];
      categories[hit.cat].push(hit);
    });

    let html = '';
    for (const [cat, items] of Object.entries(categories)) {
      html += `<div class="search-result-category">${cat}</div>`;
      html += items.map(item => `
        <a href="${item.url}" class="search-result-item">
          <div class="search-item-icon">${item.icon}</div>
          <div class="search-item-text">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
          </div>
        </a>
      `).join('');
    }
    
    container.innerHTML = html;
  }
}

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', () => {
  new GlobalSearch();
});
