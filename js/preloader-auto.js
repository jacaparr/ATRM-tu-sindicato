/**
 * Preloader Controller con tema navideño automático
 * Cambia automáticamente entre tema normal y navideño según las fechas
 */

(function() {
  'use strict';
  
  // Configuración
  const CONFIG = {
    FADE_OUT_DURATION: 800,
    MAX_DISPLAY_TIME: 8000,
    MIN_DISPLAY_TIME: 2000
  };

  let startTime = Date.now();
  let hasRemoved = false;
  
  /**
   * Verifica si estamos en temporada navideña
   */
  function isChristmasSeason() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    if (month === 10 && day >= 20) return true; // Nov 20-30
    if (month === 11) return true; // Todo diciembre
    if (month === 0 && day <= 7) return true; // Ene 1-7
    
    return false;
  }
  
  /**
   * Remove the preloader from the DOM
   */
  function removePreloader() {
    if (hasRemoved) return;
    hasRemoved = true;
    
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    preloader.classList.add('fade-out');
    
    setTimeout(() => {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
      document.body.classList.remove('preloader-active');
    }, CONFIG.FADE_OUT_DURATION);
  }
  
  /**
   * Setup timing and triggers for preloader removal
   */
  function setupPreloaderRemoval() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, CONFIG.MIN_DISPLAY_TIME - elapsed);
    
    window.addEventListener('load', function() {
      setTimeout(removePreloader, remaining);
    });
    
    setTimeout(() => {
      if (!hasRemoved) {
        console.warn('Preloader: Safety timeout triggered after max display time');
        removePreloader();
      }
    }, CONFIG.MAX_DISPLAY_TIME);
  }
  
  /**
   * Particle animation helpers
   */
  function randomBetween(a, b) { 
    return a + Math.random() * (b - a); 
  }
  
  function createParticles(ctx, w, h, count, isChristmas) {
    // Colores según temporada
    const colors = isChristmas 
      ? ['#fff', '#f0f8ff', '#FFD700', '#fffacd', '#c41e3a', '#ff6b6b']
      : ['#fff', '#FFD580', '#FF8C42', '#FF6B35', '#FFA726'];
    
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: randomBetween(0, w),
        y: randomBetween(0, h),
        r: randomBetween(2, 5),
        dx: randomBetween(-0.3, 0.3),
        dy: isChristmas ? randomBetween(0.5, 1.5) : randomBetween(-0.3, 0.3),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: randomBetween(0.6, 1)
      });
    }
    return arr;
  }

  function animateParticles(canvas, ctx, particles, isChristmas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();
      
      p.x += p.dx;
      p.y += p.dy;
      
      if (isChristmas) {
        // Nieve cae y reaparece arriba
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = randomBetween(0, canvas.width);
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      } else {
        // Movimiento normal rebotando
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      
      p.alpha += randomBetween(-0.01, 0.01);
      if (p.alpha < 0.5) p.alpha = 0.5;
      if (p.alpha > 1) p.alpha = 1;
    }
    requestAnimationFrame(() => animateParticles(canvas, ctx, particles, isChristmas));
  }

  function setupParticles() {
    const canvas = document.getElementById('preloader-particles');
    if (!canvas) return;
    
    const isChristmas = isChristmasSeason();
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const ctx = canvas.getContext('2d');
    const particles = createParticles(ctx, canvas.width, canvas.height, 48, isChristmas);
    animateParticles(canvas, ctx, particles, isChristmas);
  }

  /**
   * Adaptar preloader según temporada
   */
  function adaptPreloaderTheme() {
    const isChristmas = isChristmasSeason();
    const preloader = document.getElementById('preloader');
    
    if (isChristmas) {
      // Aplicar estilos navideños al preloader
      preloader.style.background = 'linear-gradient(135deg, #c41e3a 0%, #d62839 30%, #165b33 70%, #0f7040 100%)';
      
      // Verificar si ya tiene elementos navideños
      if (!document.querySelector('.santa-hat')) {
        const logoWrapper = document.createElement('div');
        logoWrapper.className = 'preloader-logo-wrapper';
        
        const santaHat = document.createElement('div');
        santaHat.className = 'santa-hat';
        santaHat.textContent = '🎅';
        
        const logo = document.querySelector('.preloader-logo');
        const parent = logo.parentNode;
        parent.insertBefore(logoWrapper, logo);
        logoWrapper.appendChild(santaHat);
        logoWrapper.appendChild(logo);
      }
      
      // Actualizar textos
      const subtitle = document.querySelector('.preloader-subtitle');
      if (subtitle && !subtitle.textContent.includes('🎄')) {
        subtitle.textContent = '🎄 Tu Sindicato 🎄';
      }
      
      const loading = document.querySelector('.preloader-loading');
      if (loading && !loading.textContent.includes('🎁')) {
        loading.textContent = '🎁 Felices Fiestas 🎁';
      }
      
      const spinner = document.querySelector('.preloader-spinner');
      if (spinner) {
        spinner.classList.add('christmas-spinner');
      }
      
      console.log('🎄 Preloader navideño activado');
    } else {
      // Mantener tema normal (naranja)
      console.log('🟠 Preloader en modo normal');
    }
  }

  /**
   * Initialize preloader
   */
  document.body.classList.add('preloader-active');
  adaptPreloaderTheme();
  setupParticles();
  setupPreloaderRemoval();
  
})();
