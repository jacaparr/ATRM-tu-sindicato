
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/professional-ui.css';
    document.head.appendChild(link);

    // 2. Cookie Logic (using js-cookie via CDN or raw logic for simplicity if no build step)
    // We'll use simple localStorage to avoid dependency issues in browser
    initCookieBanner();
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
