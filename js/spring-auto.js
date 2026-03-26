﻿/**
 * Control automático del tema de Primavera / Semana Santa
 * Activa decoraciones del 20 de marzo al 30 de abril (cubre SS y Fiestas de Primavera)
 */

(function() {
  'use strict';

  /**
   * Verifica si estamos en temporada de Primavera/Semana Santa
   */
  function isSpringSeason() {
    const now = new Date();
    const month = now.getMonth(); // 0 = enero, 2 = marzo, 3 = abril
    const day = now.getDate();

    // Del 20 de marzo al 31 de marzo
    if (month === 2 && day >= 20) return true;
    
    // Todo el mes de abril
    if (month === 3) return true;

    return false;
  }

  /**
   * Activa el tema primaveral
   */
  function enableSpringTheme() {
    // Cargar CSS si no está
    if (!document.getElementById('spring-css')) {
      const link = document.createElement('link');
      link.id = 'spring-css';
      link.rel = 'stylesheet';
      link.href = 'css/spring.css';
      document.head.appendChild(link);
    }

    // Cargar script de pÃ©talos
    if (!document.getElementById('spring-petals-script')) {
      const script = document.createElement('script');
      script.id = 'spring-petals-script';
      script.src = 'js/spring-petals.js';
      document.body.appendChild(script);
    }
    
    // AÃ±adir lÃnea decorativa superior
    const header = document.querySelector('header');
    if (header && !header.querySelector('.spring-garland')) {
      const garland = document.createElement('div');
      garland.className = 'spring-garland';
      header.insertBefore(garland, header.firstChild);
    }

    // Cambiar badge a mensaje primaveral
    const badge = document.querySelector('.badge');
    if (badge && !badge.textContent.includes('🌸')) {
      badge.setAttribute('data-original-text', badge.textContent);
      badge.textContent = '🌸 Fiestas de Primavera 🌸';
    }

    // AÃ±adir emoji al tÃtulo
    if (!document.title.includes('🌸')) {
      document.title = document.title + ' 🌸';
    }
    
    document.body.classList.add('spring-theme');

    console.log('🌸 Tema de Fiestas de Primavera en Murcia activado');
  }

  /**
   * Desactiva el tema
   */
  function disableSpringTheme() {
    const springCss = document.getElementById('spring-css');
    if (springCss) springCss.remove();
    
    const petalsScript = document.getElementById('spring-petals-script');
    if (petalsScript) petalsScript.remove();

    const petalsCanvas = document.getElementById('spring-petals');
    if (petalsCanvas) petalsCanvas.remove();

    const garland = document.querySelector('.spring-garland');
    if (garland) garland.remove();

    const badge = document.querySelector('.badge');
    if (badge && badge.hasAttribute('data-original-text')) {
      badge.textContent = badge.getAttribute('data-original-text');
      badge.removeAttribute('data-original-text');
    }

    document.title = document.title.replace(' 🌸', '');
    document.body.classList.remove('spring-theme');
  }

  function init() {
    if (isSpringSeason()) {
      enableSpringTheme();
    } else {
      disableSpringTheme();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


