
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/professional-ui.css';
    document.head.appendChild(link);

    // 2. Cookie Logic (using js-cookie via CDN or raw logic for simplicity if no build step)
    // We'll use simple localStorage to avoid dependency issues in browser
    initCookieBanner();

    // 3. Footer corporativo
    injectFooter();
});

function initCookieBanner() {
    const consent = localStorage.getItem('atrm_cookie_consent');
    if (consent) return; // Already accepted/rejected

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <strong>🍪 Uso de Cookies</strong><br>
            Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. 
            No compartimos datos personales con anunciantes.
        </div>
        <div class="cookie-actions">
            <button class="cookie-btn cookie-reject" onclick="rejectCookies()">Rechazar</button>
            <button class="cookie-btn cookie-accept" onclick="acceptCookies()">Aceptar</button>
        </div>
    `;
    document.body.appendChild(banner);
    
    // Show with delay
    setTimeout(() => {
        banner.style.display = 'flex';
    }, 1500);

    window.acceptCookies = () => {
        localStorage.setItem('atrm_cookie_consent', 'true');
        banner.style.display = 'none';
    };

    window.rejectCookies = () => {
        localStorage.setItem('atrm_cookie_consent', 'false');
        banner.style.display = 'none';
        // Logic to disable analytics would go here
    };
}

// 3. Export utility for Skeleton Loading
window.showSkeleton = (containerId, count = 3) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '';
    for(let i=0; i<count; i++) {
        html += `
            <div class="skeleton-card">
                <div class="skeleton skeleton-date"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
        `;
    }
    container.innerHTML = html;
};

// 4. Footer corporativo inyectado en todas las páginas
function injectFooter() {
    if (document.getElementById('site-footer')) return;

    const footer = document.createElement('footer');
    footer.id = 'site-footer';
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="footer-grid">
            <div>
                <div class="brand">ATRM · Tu Sindicato</div>
                <p class="footer-text">Limpieza pública viaria · Región de Murcia.</p>
                <p class="footer-text">Defendemos tus derechos laborales con cercanía y resultados.</p>
            </div>
            <div>
                <h4>Contacto</h4>
                <p class="footer-text">C/ Carril La Torre, 27 Bajo<br>30006 Puente Tocinos (Murcia)</p>
                <a href="tel:968300037">968 30 00 37</a>
                <a href="tel:658876771">658 876 771</a>
                <a href="mailto:info@atrm-sindicato.es">info@atrm-sindicato.es</a>
            </div>
            <div>
                <h4>Enlaces rápidos</h4>
                <a href="index.html">Inicio</a>
                <a href="interiores.html">Interiores</a>
                <a href="salaries.html">Salarios</a>
                <a href="podcasts.html">Podcasts</a>
                <a href="tramites.html">Trámites</a>
                <a href="festivos.html">Festivos</a>
            </div>
            <div>
                <h4>Legal</h4>
                <a href="mailto:info@atrm-sindicato.es?subject=Solicitud%20de%20informaci%C3%B3n%20legal">Aviso legal</a>
                <a href="mailto:info@atrm-sindicato.es?subject=Privacidad%20y%20protecci%C3%B3n%20de%20datos">Privacidad y RGPD</a>
                <a href="#site-footer">Cookies</a>
            </div>
        </div>
        <div class="footer-bottom">© 2026 ATRM Sindicato. Todos los derechos reservados.</div>
    `;

    document.body.appendChild(footer);
}
