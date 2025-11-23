/**
 * Control automático del tema navideño
 * Activa decoraciones del 20 de noviembre al 7 de enero
 * Se desactiva automáticamente fuera de ese periodo
 */

(function() {
  'use strict';
  
  /**
   * Verifica si estamos en temporada navideña
   * @returns {boolean} true si es temporada navideña
   */
  function isChristmasSeason() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = enero, 11 = diciembre
    const day = now.getDate();
    
    // Del 20 de noviembre (mes 10) al 31 de diciembre (mes 11)
    if (month === 10 && day >= 20) return true; // Noviembre 20-30
    if (month === 11) return true; // Todo diciembre
    
    // Del 1 al 7 de enero (mes 0)
    if (month === 0 && day <= 7) return true;
    
    return false;
  }
  
  /**
   * Activa el tema navideño
   */
  function enableChristmasTheme() {
    // Cargar CSS navideño si no está ya cargado
    if (!document.getElementById('christmas-css')) {
      const link = document.createElement('link');
      link.id = 'christmas-css';
      link.rel = 'stylesheet';
      link.href = 'css/christmas.css';
      document.head.appendChild(link);
    }
    
    // Cargar script de nieve si no está ya cargado
    if (!document.getElementById('christmas-snow-script')) {
      const script = document.createElement('script');
      script.id = 'christmas-snow-script';
      script.src = 'js/christmas-snow.js';
      document.body.appendChild(script);
    }
    
    // Añadir guirnalda de luces al header si no existe
    const header = document.querySelector('header');
    if (header && !header.querySelector('.christmas-lights')) {
      const lights = document.createElement('div');
      lights.className = 'christmas-lights';
      header.insertBefore(lights, header.firstChild);
    }
    
    // Cambiar badge a mensaje navideño
    const badge = document.querySelector('.badge');
    if (badge && !badge.textContent.includes('🎄')) {
      badge.setAttribute('data-original-text', badge.textContent);
      badge.textContent = '🎄 Felices Fiestas 🎄';
    }
    
    // Añadir emoji de Navidad al título de la página
    if (!document.title.includes('🎄')) {
      document.title = document.title + ' 🎄';
    }
    
    console.log('🎄 Tema navideño activado automáticamente');
  }
  
  /**
   * Desactiva el tema navideño
   */
  function disableChristmasTheme() {
    // Remover CSS navideño
    const christmasCss = document.getElementById('christmas-css');
    if (christmasCss) {
      christmasCss.remove();
    }
    
    // Remover script de nieve
    const snowScript = document.getElementById('christmas-snow-script');
    if (snowScript) {
      snowScript.remove();
    }
    
    // Remover canvas de nieve si existe
    const snowCanvas = document.getElementById('christmas-snow');
    if (snowCanvas) {
      snowCanvas.remove();
    }
    
    // Remover guirnalda de luces
    const lights = document.querySelector('.christmas-lights');
    if (lights) {
      lights.remove();
    }
    
    // Restaurar texto original del badge
    const badge = document.querySelector('.badge');
    if (badge && badge.hasAttribute('data-original-text')) {
      badge.textContent = badge.getAttribute('data-original-text');
      badge.removeAttribute('data-original-text');
    }
    
    // Quitar emoji navideño del título
    document.title = document.title.replace(' 🎄', '');
    
    console.log('❌ Tema navideño desactivado automáticamente (fuera de temporada)');
  }
  
  /**
   * Inicializar control de tema navideño
   */
  function init() {
    if (isChristmasSeason()) {
      enableChristmasTheme();
    } else {
      disableChristmasTheme();
    }
  }
  
  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Debug: mostrar fechas de temporada navideña en consola
  console.log('🎅 Control automático de tema navideño cargado');
  console.log('📅 Temporada: 20 de noviembre - 7 de enero');
  console.log('📍 Estado actual:', isChristmasSeason() ? '✅ ACTIVO' : '❌ INACTIVO');
  
})();
