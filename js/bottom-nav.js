document.addEventListener('DOMContentLoaded', () => {
  // 1. Inyectar CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'css/bottom-nav.css';
  document.head.appendChild(link);

  // 2. Definir items de navegación
  const navItems = [
    {
      label: 'Inicio',
      href: 'index.html',
      icon: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>' // Home
    },
    {
      label: 'Salarios',
      href: 'salaries.html',
      icon: '<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>' // Attach money
    },
    {
      label: 'Trámites',
      href: 'tramites.html',
      icon: '<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>' // Building/Government (simulated with path) -> Replacing with a simpler "Bank" or "Building" path to be safe.
           // Better icon for "Tramites" (Building/Museum look)
           // M4 10h2v7h-2v-7zm6 0h2v7h-2v-7zm6 0h2v7h-2v-7zm-14-9l10 5 10-5v2h-20v-2zm-1 20v-8h22v8h-2v-2h-18v2h-2z
    },
    {
      label: 'Podcasts',
      href: 'podcasts.html',
      icon: '<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>' // Mic
    }
  ];

  // Fix icon specifically:
  navItems[2].icon = '<path d="M12 2L2 7v2c0 5.52 3.58 10.74 8.55 12.48l1.45.52 1.45-.52C18.42 19.74 22 14.52 22 9V7l-10-5zm-2 16h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z"/>'; // Building/Security type icon actually... let's stick to the column building one.
  // Standard building/bank icon:
  navItems[2].icon = '<path d="M4 10h2v7h-2v-7zm6 0h2v7h-2v-7zm6 0h2v7h-2v-7zm-14-9l10 5 10-5v2h-20v-2zm-1 20v-8h22v8h-2v-2h-18v2h-2z"/>'; 

  // 3. Crear el HTML
  const navElement = document.createElement('nav');
  navElement.className = 'bottom-nav';
  
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navElement.innerHTML = navItems.map(item => {
    // Determinar si es activo
    const isActive = currentPath === item.href || (currentPath === '' && item.href === 'index.html');
    const activeClass = isActive ? 'active' : '';
    
    return `
      <a href="${item.href}" class="nav-item ${activeClass}">
        <svg viewBox="0 0 24 24">${item.icon}</svg>
        <span>${item.label}</span>
      </a>
    `;
  }).join('');

  document.body.appendChild(navElement);
});
