/**
 * Preloader Controller for ATRM tu sindicato
 * Handles the loading animation and smooth transition to main content
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    FADE_OUT_DURATION: 800, // milliseconds (matches CSS transition)
    MAX_DISPLAY_TIME: 5000, // 5 seconds safety timeout
    MIN_DISPLAY_TIME: 500   // Minimum time to show preloader (for better UX)
  };

  let startTime = Date.now();
  let hasRemoved = false;
  
  /**
   * Remove the preloader from the DOM
   */
  function removePreloader() {
    if (hasRemoved) return;
    hasRemoved = true;
    
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Add fade-out class to trigger CSS animation
    preloader.classList.add('fade-out');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
      
      // Re-enable body scroll
      document.body.classList.remove('preloader-active');
    }, CONFIG.FADE_OUT_DURATION);
  }
  
  /**
   * Handle page load completion
   */
  function onPageLoad() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, CONFIG.MIN_DISPLAY_TIME - elapsedTime);
    
    // Ensure minimum display time for better UX
    setTimeout(removePreloader, remainingTime);
  }
  
  /**
   * Safety timeout to ensure preloader doesn't stay forever
   */
  function setSafetyTimeout() {
    setTimeout(() => {
      if (!hasRemoved) {
        console.warn('Preloader: Safety timeout triggered after 5 seconds');
        removePreloader();
      }
    }, CONFIG.MAX_DISPLAY_TIME);
  }
  
  /**
   * Initialize preloader behavior
   */
  // --- PARTICLE ANIMATION ---
  function randomBetween(a, b) { return a + Math.random() * (b - a); }
  function createParticles(ctx, w, h, count) {
    const colors = ['#fff', '#FFD580', '#FF8C42', '#FF6B35', '#FFA726'];
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: randomBetween(0, w),
        y: randomBetween(0, h),
        r: randomBetween(1.5, 4.5),
        dx: randomBetween(-0.5, 0.5),
        dy: randomBetween(-0.3, 0.3),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: randomBetween(0.5, 1)
      });
    }
    return arr;
  }

  function animateParticles(canvas, ctx, particles) {
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
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      p.alpha += randomBetween(-0.01, 0.01);
      if (p.alpha < 0.3) p.alpha = 0.3;
      if (p.alpha > 1) p.alpha = 1;
    }
    requestAnimationFrame(() => animateParticles(canvas, ctx, particles));
  }

  function setupParticles() {
    const canvas = document.getElementById('preloader-particles');
    if (!canvas) return;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    const ctx = canvas.getContext('2d');
    const particles = createParticles(ctx, canvas.width, canvas.height, 48);
    animateParticles(canvas, ctx, particles);
  }

  function init() {
    // Prevent body scroll while preloader is active
    document.body.classList.add('preloader-active');

    // Set up safety timeout
    setSafetyTimeout();

    // Setup particles
    setupParticles();

    // Listen for page load
    if (document.readyState === 'complete') {
      // Page already loaded
      onPageLoad();
    } else {
      // Wait for page to load
      window.addEventListener('load', onPageLoad);
    }

    // Also listen for DOMContentLoaded as a fallback
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // If window.onload doesn't fire quickly, use DOMContentLoaded + small delay
        setTimeout(() => {
          if (!hasRemoved && document.readyState === 'interactive') {
            onPageLoad();
          }
        }, 1000);
      });
    }
  }

  // Initialize when script loads
  init();
})();
