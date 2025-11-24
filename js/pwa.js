/**
 * PWA Registration Script
 * Registers the service worker and handles installation prompts
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('✅ ServiceWorker registrado correctamente');
        console.log('📱 La web está lista para funcionar offline');
      })
      .catch((err) => {
        console.log('❌ Error al registrar ServiceWorker:', err);
      });
  });
}

// Handle installation prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

function showInstallBanner() {
  // Check if banner was dismissed recently
  const dismissed = localStorage.getItem('pwa-banner-dismissed');
  if (dismissed) {
    const dismissedTime = parseInt(dismissed);
    const now = Date.now();
    // Show again after 7 days
    if (now - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
      return;
    }
  }

  // Create banner
  const banner = document.createElement('div');
  banner.className = 'pwa-install-banner';
  banner.innerHTML = `
    <div class="pwa-banner-content">
      <div class="pwa-banner-title">📱 Instala ATRM en tu móvil</div>
      <div class="pwa-banner-text">Accede rápidamente y consulta el convenio sin conexión</div>
    </div>
    <div class="pwa-banner-buttons">
      <button class="pwa-btn pwa-btn-install" id="pwa-install-btn">Instalar</button>
      <button class="pwa-btn pwa-btn-dismiss" id="pwa-dismiss-btn">Ahora no</button>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  // Load CSS if not already loaded
  if (!document.getElementById('pwa-css')) {
    const link = document.createElement('link');
    link.id = 'pwa-css';
    link.rel = 'stylesheet';
    link.href = 'css/pwa.css';
    document.head.appendChild(link);
  }
  
  setTimeout(() => banner.classList.add('show'), 100);
  
  // Install button
  document.getElementById('pwa-install-btn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    banner.remove();
  });
  
  // Dismiss button
  document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
    banner.remove();
  });
}

// Detect when app is installed
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA instalada correctamente');
  deferredPrompt = null;
});
