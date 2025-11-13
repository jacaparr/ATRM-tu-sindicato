// Script para cargar y mostrar noticias en index.html
async function cargarNoticias() {
  try {
    const response = await fetch('data/noticias.json');
    const data = await response.json();
    const noticias = data.noticias;
    
    // Ordenar por fecha (más reciente primero)
    noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Mostrar solo las 5 más recientes en el widget de la página principal
    const noticiasRecientes = noticias.slice(0, 5);
    
    const newsList = document.getElementById('newsList');
    if (newsList) {
      newsList.innerHTML = noticiasRecientes.map(noticia => `
        <div class="noticia-item" style="padding:12px 0;border-bottom:1px solid #f0f0f0">
          <div style="font-size:11px;color:#999;margin-bottom:4px">${formatearFecha(noticia.fecha)}</div>
          <a href="${noticia.url}" style="text-decoration:none;color:var(--dark)">
            <div style="font-weight:700;margin-bottom:4px;color:var(--primary)">${noticia.titulo}</div>
            <div style="font-size:14px;color:#666">${noticia.resumen}</div>
          </a>
        </div>
      `).join('');
      
      // Añadir enlace para ver todas las noticias
      const verMasLink = document.createElement('div');
      verMasLink.style.textAlign = 'center';
      verMasLink.style.marginTop = '16px';
      verMasLink.innerHTML = '<a href="noticias.html" class="btn alt" style="display:inline-block">Ver todas las noticias</a>';
      newsList.appendChild(verMasLink);
    }
    
    // Si estamos en la página de noticias completa, mostrar todas
    const noticiasCompletas = document.getElementById('noticiasCompletas');
    if (noticiasCompletas) {
      noticiasCompletas.innerHTML = noticias.map(noticia => `
        <article class="card" style="padding:24px;margin-bottom:20px">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px">
            <div>
              <div style="font-size:12px;color:#999;margin-bottom:6px">${formatearFecha(noticia.fecha)}</div>
              <h2 style="margin:0;color:var(--primary)">${noticia.titulo}</h2>
            </div>
            <span class="badge" style="background:var(--accent);color:#4e2b00;padding:6px 12px;border-radius:20px;font-size:11px;text-transform:uppercase">${noticia.categoria}</span>
          </div>
          <p style="font-size:16px;line-height:1.6;margin:12px 0">${noticia.contenido}</p>
          <a href="${noticia.url}" class="btn alt" style="margin-top:12px">Leer más →</a>
        </article>
      `).join('');
    }
    
  } catch (error) {
    console.error('Error cargando noticias:', error);
    const newsList = document.getElementById('newsList');
    if (newsList) {
      newsList.innerHTML = '<div style="color:#999;padding:12px;text-align:center">No hay noticias disponibles en este momento.</div>';
    }
  }
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones);
}

// Cargar noticias cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarNoticias);
